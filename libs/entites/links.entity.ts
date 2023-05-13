import { LinkBaseModel} from "../interfaces";
import {Column, Entity, ManyToOne, OneToOne} from "typeorm";
import {BaseResourceEntity} from "./base.resource.entity";
import {CrawlerRequestEntity} from "./crawler.request.entity";

@Entity('Links')
export class LinksEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => CrawlerRequestEntity, crawlerRequest => crawlerRequest.links)
  crawlerRequest: CrawlerRequestEntity
}
