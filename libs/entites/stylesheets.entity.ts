import {ScreenshotsModel, ScriptBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {CrawlerRequestEntity} from "./crawler.request.entity";


@Entity("Stylesheets")
export class StylesheetsEntity extends BaseResourceEntity implements ScriptBaseModel
{
  @Column({type :"text"})
  name: string;

  @Column({type :"text"})
  content: string;

  @ManyToOne(type => CrawlerRequestEntity, crawlerRequest => crawlerRequest.stylesheets)
  crawlerRequest: CrawlerRequestEntity
}
