import {LinkBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {CrawlerRequestEntity} from "./crawler.request.entity";


@Entity("Stylesheets")
export class StylesheetsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => CrawlerRequestEntity, crawlerRequest => crawlerRequest.stylesheets)
  crawlerRequest: CrawlerRequestEntity
}
