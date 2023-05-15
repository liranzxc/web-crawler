import {IsUrl, Matches} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ScanRequestDto
{
  @ApiProperty( { type : 'string',description: 'URL for scan' })
  @Matches(RegExp("^https?:\/\/",'g'))
  @IsUrl()
  url:string;
}
