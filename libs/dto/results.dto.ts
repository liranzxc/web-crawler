import {BaseModel, LinkBaseModel, ScreenshotsModel} from "../interfaces";
import {CrawlerRequestStatusEnum} from "../enums";

export class ResultsDto implements BaseModel
{
  createdAt: Date;
  id: string;
  updatedAt: Date;
  links: { crawlerRequest: { id: any; }; }[]
  outgoingUrls:{ crawlerRequest: { id: any; }; }[]
  screenshots: { crawlerRequest: { id: any; }; }[];
  scripts: { crawlerRequest: { id: any; }; }[];
  status: CrawlerRequestStatusEnum;
  stylesheets: { crawlerRequest: { id: any; }; }[];
  url: string;

}
