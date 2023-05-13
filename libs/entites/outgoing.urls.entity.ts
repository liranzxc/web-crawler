import { LinkBaseModel} from "../interfaces";
import {Column, Entity, ManyToOne} from "typeorm";
import {BaseResourceEntity} from "./base.resource.entity";
import {CrawlerRequestEntity} from "./crawler.request.entity";

@Entity('OutgoingUrls')
export class OutgoingUrlsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => CrawlerRequestEntity, crawlerRequest => crawlerRequest.outgoingUrls)
  crawlerRequest: CrawlerRequestEntity
}
