import {
  ScanRequestEntity,
  LinksEntity,
  OutgoingUrlsEntity,
  ScreenshotsEntity,
  ScriptsEntity, StylesheetsEntity
} from "../../../../../libs/entites";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BullModule} from "@nestjs/bull";
import {CrawlerWorkerConsumer} from "./worker.processor";
import {WorkerService} from "./worker.service";

const entities = [ ScanRequestEntity,ScreenshotsEntity,LinksEntity,OutgoingUrlsEntity,ScriptsEntity,StylesheetsEntity]

@Module({
  imports: [TypeOrmModule.forFeature(entities),BullModule.registerQueue({
    name: process.env.QUEUE_NAME
  }),
    BullModule.registerQueue({
      name: process.env.QUEUE_NAME
    })
  ],
  controllers: [],
  providers: [CrawlerWorkerConsumer,WorkerService],
})
export class WorkerModule {}
