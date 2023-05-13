import {BaseModel, LinkBaseModel, ScreenshotsModel, ScriptBaseModel} from "../interfaces";
import {CrawlerRequestStatusEnum} from "../enums";

export class ResultsDto implements BaseModel
{
  createdAt: Date;
  id: string;
  updatedAt: Date;
  links: LinkBaseModel[];
  outgoingUrls: LinkBaseModel[];
  screenshot: ScreenshotsModel;
  scripts: ScriptBaseModel[];
  status: CrawlerRequestStatusEnum;
  stylesheets: ScriptBaseModel[];
  url: string;

}
