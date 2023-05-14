import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";
import {
  ScanRequestEntity,
  LinksEntity,
  OutgoingUrlsEntity,
  ScreenshotsEntity, ScriptsEntity,
  StylesheetsEntity
} from "../../../../../libs/entites";
import {EntityManager, Repository} from "typeorm";
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {ScanRequestStatusEnum} from "../../../../../libs/enums";
import {ScanRequestDto} from "../../../../../libs/dto";
import {ScanResultsDto} from "../../../../../libs/dto";
import {isUUID} from "class-validator";

@Injectable()
export class CrawlerService {

  constructor(@InjectRepository(ScanRequestEntity) private crawlerRequestEntityRepository: Repository<ScanRequestEntity>,
              @InjectEntityManager()  private em : EntityManager,
              @InjectQueue(process.env.QUEUE_NAME) private crawlingRequestQueue: Queue) {
  }

  /***
   * create a request for crawling an url
   * we save a request on database and add it to the queue to processing
   * @param requestScanDto
   */
  async createRequest(requestScanDto: ScanRequestDto) {
    if (requestScanDto?.url) {
      const scanRequestEntity = await this.crawlerRequestEntityRepository.save({
        url: requestScanDto.url,
        status: ScanRequestStatusEnum.QUEUED
      })

      await this.crawlingRequestQueue.add({url: requestScanDto.url, id: scanRequestEntity.id})
      return {id: scanRequestEntity.id}
    } else {
      throw new BadRequestException("invalid url")
    }
  }


  /**
   * getting information about the scan by id
   * @param scanId
   */
  async getScanInformationById(scanId: string) {

    if(isUUID(scanId))
    {
      const crawlerRequestEntity = await this.crawlerRequestEntityRepository.findOne(
        {where: {id: scanId}})

      if (crawlerRequestEntity) {

        const outgoingUrls = await this.em.find(OutgoingUrlsEntity, { where : { scanRequest :  { id : scanId }}});
        const links = await this.em.find(LinksEntity, { where : { scanRequest :  { id : scanId }}});
        const screenshots = await this.em.find(ScreenshotsEntity, { where : { scanRequest :  { id : scanId }}});
        const stylesheets = await this.em.find(StylesheetsEntity, { where : { scanRequest :  { id : scanId }}});
        const scripts = await this.em.find(ScriptsEntity, { where : { scanRequest :  { id : scanId }}});

        //making sure the dto is defined structure
        const resultsDto: ScanResultsDto = {
          status: crawlerRequestEntity.status,
          id: crawlerRequestEntity.id,
          url: crawlerRequestEntity.url,
          createdAt: crawlerRequestEntity.createdAt,
          updatedAt: crawlerRequestEntity.updatedAt,
          outgoingUrls: outgoingUrls,
          links: links,
          screenshots: screenshots,
          scripts: scripts,
          stylesheets: stylesheets,
        }
        return resultsDto;
      } else {
        throw new NotFoundException()
      }
    }
    else
    {
      throw new BadRequestException("invalid uuid")
    }


  }

  /**
   * get all scans information
   */
  async getAllScans() {
    const crawlerRequestEntities:ScanRequestEntity[] = await this.crawlerRequestEntityRepository.find()
    const dtoResults = [];
    for await(let result of crawlerRequestEntities)
    {
      const resultsDto = await this.getScanInformationById(result.id);
      dtoResults.push(resultsDto)
    }

    return dtoResults;
  }
}

