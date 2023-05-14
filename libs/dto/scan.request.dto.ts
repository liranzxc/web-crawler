import {IsUrl} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ScanRequestDto
{
  @ApiProperty( { type : 'string',description: 'URL for scan' })
  @IsUrl()
  url:string;
}
