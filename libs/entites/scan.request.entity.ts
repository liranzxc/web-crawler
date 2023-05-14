import {ScanRequestStatusEnum} from "../enums/scan.request.status.enum";
import {ScanRequestModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, OneToMany, OneToOne} from "typeorm";
import {ScreenshotsEntity} from "./screenshots.entity";
import {LinksEntity} from "./links.entity";
import {ScriptsEntity} from "./scripts.entity";
import {StylesheetsEntity} from "./stylesheets.entity";
import {OutgoingUrlsEntity} from "./outgoing.urls.entity";


@Entity("ScanRequest")
export class ScanRequestEntity extends BaseResourceEntity implements ScanRequestModel
{
  @Column({ type : 'text'})
  url:string;

  @Column({ type : 'text'})
  status:ScanRequestStatusEnum

  @Column({ type : 'text',nullable:true})
  error?: string;

  @OneToOne(type => ScreenshotsEntity, screenshot => screenshot.scanRequest)
  screenshot: ScreenshotsEntity;

  @OneToMany(type => LinksEntity, link => link.scanRequest)
  links: LinksEntity[];

  @OneToMany(type => OutgoingUrlsEntity, outgoingUrl => outgoingUrl.scanRequest)
  outgoingUrls: OutgoingUrlsEntity[];

  @OneToMany(type => ScriptsEntity, script => script.scanRequest)
  scripts: ScriptsEntity[];

  @OneToMany(type => StylesheetsEntity, stylesheet => stylesheet.scanRequest)
  stylesheets: StylesheetsEntity[];
}
