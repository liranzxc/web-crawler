import {IsUrl} from "class-validator";

export class RequestScanDto
{
  @IsUrl()
  url:string;
}
