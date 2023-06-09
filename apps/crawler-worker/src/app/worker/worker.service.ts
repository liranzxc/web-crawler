import {Injectable} from "@nestjs/common";
import puppeteer from 'puppeteer';
import * as fs from "fs";
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";
import isUrlValidator from 'validator/lib/isURL';
import {
  LinksEntity,
  OutgoingUrlsEntity, ScanRequestEntity,
  ScreenshotsEntity,
  ScriptsEntity,
  StylesheetsEntity
} from "../../../../../libs/entites";
import {ScanRequestStatusEnum} from "../../../../../libs/enums";

@Injectable()
export class WorkerService
{
  private SAVE_DIR: string = process.env.SAVE_DIR ?? "/tmp";
  constructor(
    @InjectEntityManager()  private em : EntityManager,

  ) {}

  isURL(value: string) {
      return typeof value === 'string' && isUrlValidator(value);
  }


  async fetchAssets(jobId: string, url: string) {

    const prefixPath =  `${this.SAVE_DIR}/${jobId}`

    // if exists , delete the folder and create again the dir
    if(fs.existsSync(`${prefixPath}`))
    {
      fs.unlinkSync(`${prefixPath}`)
    }
    fs.mkdirSync(`${prefixPath}`)

    const relativePathScreenshot = `${prefixPath}/screenshot.png`

    const browser = await puppeteer.launch({headless:"new",
      executablePath: '/usr/bin/chromium-browser',
      args: [
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--no-zygote',
        '--disable-gpu',
        '--disable-audio-output',
        '--headless',
        '--single-process',
        '--ignore-certificate-errors',
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*',
      ]
    });

    console.log("go to url :",url);
    const page = await browser.newPage();
    // setup user agent ,some website must have user agent,if not they will block the request
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 12000,
    });

    console.log("start fetch information from page");

    // get assets
    // save screenshot
    await page.screenshot({path: `${relativePathScreenshot}`, fullPage: true});

    // get all links by selector <a> tag
    let outgoingLinks :string[]= await page.$$eval('a', outgoingLink => outgoingLink.filter(a => a?.href).map(a => a.href));
    // validation on the urls
    outgoingLinks = outgoingLinks.filter(a => this.isURL(a))

    // get links that are not stylesheet
    const links :string[]= await page.$$eval('link', links => links.filter(a => a.rel !== 'stylesheet' && a?.href).map(a => a.href));
    const stylesheets :string[]= await page.$$eval('link', links => links.filter(a => a.rel === 'stylesheet' && a?.href).map(a => a.href));
    const scripts :string[]= await page.$$eval('script', script => script.filter(script => script?.src).map(script =>  script.src));

    // close
    await page.close()
    await browser.close();

    return { links,stylesheets,scripts,outgoingLinks,relativePathScreenshot};
  }

  async saveResultOnDatabase(jobId:string,url:string,results: { stylesheets: string[]; links: string[]; outgoingLinks: string[]; scripts: string[]; relativePathScreenshot: string }) {

    const linksEntities : LinksEntity[] =  results.links.map( (link) => {
      return {
        href : link,
        scanRequest : { id : jobId}
      } as LinksEntity
    })

    const outgoingLinksEntities : OutgoingUrlsEntity[] =  results.outgoingLinks.map( (outgoingLink) => {
      return {
        href : outgoingLink,
        scanRequest : { id : jobId}
      } as OutgoingUrlsEntity
    })

    const stylesheetsEntities : StylesheetsEntity[] =  results.stylesheets.map( (stylesheet) => {
      return {
        href : stylesheet,
        scanRequest : { id : jobId}
      } as StylesheetsEntity
    })

    const scriptsEntities : ScriptsEntity[] =  results.scripts.map( (script) => {
      return {
        href : script,
        scanRequest : { id : jobId}
      } as ScriptsEntity
    })

    const screenshotEntity :ScreenshotsEntity = { scanRequest : { id : jobId} , relativePath : results.relativePathScreenshot} as ScreenshotsEntity

    const queryRunner = this.em.connection.createQueryRunner();

    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save(LinksEntity,linksEntities)
      await queryRunner.manager.save(OutgoingUrlsEntity,outgoingLinksEntities)
      await queryRunner.manager.save(StylesheetsEntity,stylesheetsEntities)
      await queryRunner.manager.save(ScriptsEntity,scriptsEntities)
      await queryRunner.manager.save(ScreenshotsEntity,screenshotEntity)

      await queryRunner.manager.update( ScanRequestEntity,{id : jobId },
        { status : ScanRequestStatusEnum.SUCCESS})

      await queryRunner.commitTransaction()
      console.log("Job success ",jobId,url)

    }
    catch (err)
    {
      console.log(err);
      await queryRunner.rollbackTransaction()
      console.log("Rolling back");

      // update the status to fail
      await this.em.update( ScanRequestEntity,{id : jobId },
        { status : ScanRequestStatusEnum.FAIL})

    }
    finally {
      await queryRunner.release()
    }

  }
}
