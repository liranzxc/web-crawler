import { Module } from '@nestjs/common';
import {CrawlerModule} from "./crawler/crawler.module";
import {BullModule} from "@nestjs/bull";
import {TypeOrmModule} from "@nestjs/typeorm";
import {
  ScanRequestEntity,
  LinksEntity,
  OutgoingUrlsEntity,
  ScreenshotsEntity,
  ScriptsEntity, StylesheetsEntity
} from "../../../../libs/entites";


const entities = [ ScanRequestEntity,ScreenshotsEntity,LinksEntity,OutgoingUrlsEntity,ScriptsEntity,StylesheetsEntity]

@Module({
  imports: [
    TypeOrmModule.forRoot({entities : entities ,
      synchronize:true,
      port : Number(process.env.POSTGRES_PORT) ,
      type : "postgres",
      database : process.env.POSTGRES_DB,
      host : process.env.POSTGRES_HOST,username : process.env.POSTGRES_USER , password : process.env.POSTGRES_PASSWORD,
      logging:false
    }),
    BullModule.forRoot({
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  }), CrawlerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
