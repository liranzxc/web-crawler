import {BaseModel, LinkBaseModel, ScreenshotsModel} from "../interfaces";
import {CrawlerRequestStatusEnum} from "../enums";
import {LinksEntity, OutgoingUrlsEntity, ScreenshotsEntity, ScriptsEntity, StylesheetsEntity} from "../entites";

export class ScanResultsDto implements BaseModel
{
  createdAt: Date;
  id: string;
  updatedAt: Date;
  links: LinksEntity[]
  outgoingUrls:OutgoingUrlsEntity[]
  screenshots: ScreenshotsEntity[];
  scripts: ScriptsEntity[];
  status: CrawlerRequestStatusEnum;
  stylesheets: StylesheetsEntity[];
  url: string;

}
