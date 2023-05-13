import {IsUrl} from "class-validator";

export class RequestDto
{
  @IsUrl()
  url:string;
}
