import { ScreenshotsModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, OneToMany, OneToOne} from "typeorm";
import {CrawlerRequestEntity} from "./crawler.request.entity";


@Entity("Screenshots")
export class ScreenshotsEntity extends BaseResourceEntity implements ScreenshotsModel
{
  @Column({type :"text"})
  relativePath: string;

  @OneToOne(type => CrawlerRequestEntity, crawlerRequest => crawlerRequest.screenshot)
  crawlerRequest: CrawlerRequestEntity
}
