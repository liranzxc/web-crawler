import {
  Processor,
  Process,
  OnGlobalQueueCompleted,
  OnGlobalQueueFailed,
  InjectQueue,
  OnQueueFailed, OnQueueCompleted
} from '@nestjs/bull';
import {Job, Queue} from 'bull';
import {InjectRepository} from "@nestjs/typeorm";
import {ScanRequestEntity} from "../../../../../libs/entites";
import {Repository} from "typeorm";
import {ScanRequestStatusEnum} from "../../../../../libs/enums";
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

    console.log("Start processing job id ",job.data.id)
    try {
      const results = await this.workerService.fetchAssets(job.data.id,job.data.url);
      await this.workerService.saveResultOnDatabase(job.data.id,job.data.url,results)
    }
    catch (err)
    {
      console.log(err);
      await this.crawlerRequestEntityRepository.update( {id : job.data.id },
        { status : ScanRequestStatusEnum.FAIL , error : err.message.toString() })
      console.log("Job failed ",job.data.id,job.data.url)
    }
  }

}
