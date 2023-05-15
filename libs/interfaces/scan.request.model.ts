import {BaseModel} from "./base.model";
import {ScanRequestStatusEnum} from "../enums";



export interface ScanRequestModel extends BaseModel
{
    url:string;
    status:ScanRequestStatusEnum
    error?: string;
}
