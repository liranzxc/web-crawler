import {BaseModel} from "./base.model";
import {CrawlerRequestStatusEnum} from "../enums";



export interface CrawlerRequestModel extends BaseModel
{
    url:string;
    status:CrawlerRequestStatusEnum
    error?: string;
}
