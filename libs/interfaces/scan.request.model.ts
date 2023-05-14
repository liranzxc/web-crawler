import {BaseModel} from "./base.model";
import {CrawlerRequestStatusEnum} from "../enums";



export interface ScanRequestModel extends BaseModel
{
    url:string;
    status:CrawlerRequestStatusEnum
    error?: string;
}
