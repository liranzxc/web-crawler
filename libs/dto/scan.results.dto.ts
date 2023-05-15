import {BaseModel, LinkBaseModel, ScreenshotsModel} from "../interfaces";
import {ScanRequestStatusEnum} from "../enums";
import {LinksEntity, OutgoingUrlsEntity, ScreenshotsEntity, ScriptsEntity, StylesheetsEntity} from "../entites";
import {ApiProperty} from "@nestjs/swagger";

export class ScanResultsDto implements BaseModel
{
  @ApiProperty( { type : 'string',description: 'error on fail status' })
  error:string;

  @ApiProperty( { type : 'string',description: 'creation date' })
  createdAt: Date;

  @ApiProperty( { type : 'string',description: 'Id of the scan' })
  id: string;

  @ApiProperty( { type : 'string',description: 'update date' })
  updatedAt: Date;

  @ApiProperty( { type : [LinksEntity],description: 'Links' })
  links: LinksEntity[]

  @ApiProperty( { type : [OutgoingUrlsEntity],description: 'outgoing urls' })
  outgoingUrls:OutgoingUrlsEntity[]

  @ApiProperty( { type : [ScreenshotsEntity],description: 'screenshots' })
  screenshots: ScreenshotsEntity[];

  @ApiProperty( { type : [ScriptsEntity],description: 'scripts' })
  scripts: ScriptsEntity[];

  @ApiProperty({ enum: [ScanRequestStatusEnum.SUCCESS, ScanRequestStatusEnum.FAIL, ScanRequestStatusEnum.QUEUED]})
  status: ScanRequestStatusEnum;

  @ApiProperty( { type : [StylesheetsEntity],description: 'stylesheets' })
  stylesheets: StylesheetsEntity[];

  @ApiProperty( { type : 'string',description: 'url of the scan' })
  url: string;

}
