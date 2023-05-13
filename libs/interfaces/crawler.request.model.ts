import {BaseModel} from "./base.model";
import {CrawlerRequestStatusEnum} from "../enums/crawler.request.status.enum";



export interface CrawlerRequestModel extends BaseModel
{
    url:string;
    status:CrawlerRequestStatusEnum
}