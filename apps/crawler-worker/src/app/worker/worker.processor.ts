import {Processor, Process, OnGlobalQueueCompleted,OnGlobalQueueFailed, InjectQueue} from '@nestjs/bull';
import {Job, Queue} from 'bull';
import {InjectRepository} from "@nestjs/typeorm";
import {ScanRequestEntity} from "../../../../../libs/entites";
import {Repository} from "typeorm";
import {CrawlerRequestStatusEnum} from "../../../../../libs/enums";
import {WorkerService} from "./worker.service";

@Processor(process.env.QUEUE_NAME)
export class CrawlerWorkerConsumer {

  constructor(@InjectQueue(process.env.QUEUE_NAME) private crawlingRequestQueue: Queue,
              private workerService:WorkerService,
              @InjectRepository(ScanRequestEntity) private crawlerRequestEntityRepository: Repository<ScanRequestEntity>,
              ) {
  }

  /**
   * process function scan and extraction  screenshot, links, scripts,
   * stylesheets, and outgoing URLs from given url and save on Database.
   * @param job
   */
  @Process()
  async process(job: Job<{url: string, id: string}>) {
    const results = await this.workerService.fetchAssets(job.data.id,job.data.url);
    await this.workerService.saveResultOnDatabase(job.data.id,results)

    return { ok : 200}
  }



  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: string , result: any) {

    console.log('(Global) on completed: job ', jobId, ' -> result: ', result);
    const job  = await this.crawlingRequestQueue.getJob(jobId);
    const scanRequestId = job.data.id;

    await this.crawlerRequestEntityRepository.update( {id : scanRequestId },
      { status : CrawlerRequestStatusEnum.SUCCESS})

  }

  @OnGlobalQueueFailed()
  async OnGlobalQueueFailed(jobId:string , error: Error) {
    console.log('(Global) on failed: job ', jobId, ' -> error: ', error);
    const job  = await this.crawlingRequestQueue.getJob(jobId);
    const scanRequestId = job.data.id;

    await this.crawlerRequestEntityRepository.update( {id : scanRequestId },
      { status : CrawlerRequestStatusEnum.FAIL , error : error.message})
  }
}
