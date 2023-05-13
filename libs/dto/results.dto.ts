import {BaseModel, LinkBaseModel, ScreenshotsModel} from "../interfaces";
import {CrawlerRequestStatusEnum} from "../enums";

export class ResultsDto implements BaseModel
{
  createdAt: Date;
  id: string;
  updatedAt: Date;
  links: LinkBaseModel[];
  outgoingUrls: LinkBaseModel[];
  screenshot: ScreenshotsModel;
  scripts: LinkBaseModel[];
  status: CrawlerRequestStatusEnum;
  stylesheets: LinkBaseModel[];
  url: string;

}
