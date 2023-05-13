import {LinkBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {CrawlerRequestEntity} from "./crawler.request.entity";


@Entity("Scripts")
export class ScriptsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => CrawlerRequestEntity, crawlerRequest => crawlerRequest.scripts)
  crawlerRequest: CrawlerRequestEntity
}
