import {IsUrl} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RequestScanDto
{
  @ApiProperty( { type : 'string',description: 'URL for scan' })
  @IsUrl()
  url:string;
}
