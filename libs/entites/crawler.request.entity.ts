import {CrawlerRequestStatusEnum} from "../enums/crawler.request.status.enum";
import {CrawlerRequestModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, OneToMany, OneToOne} from "typeorm";
import {ScreenshotsEntity} from "./screenshots.entity";
import {LinksEntity} from "./links.entity";
import {ScriptsEntity} from "./scripts.entity";
import {StylesheetsEntity} from "./stylesheets.entity";
import {OutgoingUrlsEntity} from "./outgoing.urls.entity";


@Entity("CrawlerRequest")
export class CrawlerRequestEntity extends BaseResourceEntity implements CrawlerRequestModel
{
  @Column({ type : 'text'})
  url:string;

  @Column({ type : 'text'})
  status:CrawlerRequestStatusEnum

  @OneToOne(type => ScreenshotsEntity, screenshot => screenshot.crawlerRequest)
  screenshot: ScreenshotsEntity;

  @OneToMany(type => LinksEntity, link => link.crawlerRequest)
  links: LinksEntity[];

  @OneToMany(type => OutgoingUrlsEntity, outgoingUrl => outgoingUrl.crawlerRequest)
  outgoingUrls: OutgoingUrlsEntity[];

  @OneToMany(type => ScriptsEntity, script => script.crawlerRequest)
  scripts: ScriptsEntity[];

  @OneToMany(type => StylesheetsEntity, stylesheet => stylesheet.crawlerRequest)
  stylesheets: StylesheetsEntity[];
}
