import {Module} from "@nestjs/common";
import {CrawlerController} from "./crawler.controller";
import {CrawlerService} from "./crawler.service";
import {BullModule} from "@nestjs/bull";
import {TypeOrmModule} from "@nestjs/typeorm";
import {
  ScanRequestEntity,
  LinksEntity,
  OutgoingUrlsEntity,
  ScreenshotsEntity,
  ScriptsEntity, StylesheetsEntity
} from "../../../../../libs/entites";

const entities = [ ScanRequestEntity,ScreenshotsEntity,LinksEntity,OutgoingUrlsEntity,ScriptsEntity,StylesheetsEntity]

@Module({
  imports: [TypeOrmModule.forFeature(entities),BullModule.registerQueue({
    name: process.env.QUEUE_NAME
  })
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
