import {BaseModel, LinkBaseModel, ScreenshotsModel} from "../interfaces";
import {ScanRequestStatusEnum} from "../enums";
import {LinksEntity, OutgoingUrlsEntity, ScreenshotsEntity, ScriptsEntity, StylesheetsEntity} from "../entites";
import {ApiProperty} from "@nestjs/swagger";

export class ScanResultsDto implements BaseModel
{
  @ApiProperty( { type : 'string',description: 'Error on fail status' })
  error:string;

  @ApiProperty( { type : 'string',description: 'Creation date' })
  createdAt: Date;

  @ApiProperty( { type : 'string',description: 'Id of the scan' })
  id: string;

  @ApiProperty( { type : 'string',description: 'Update date' })
  updatedAt: Date;

  @ApiProperty( { type : [LinksEntity],description: 'Links' })
  links: LinksEntity[]

  @ApiProperty( { type : [OutgoingUrlsEntity],description: 'Outgoing urls' })
  outgoingUrls:OutgoingUrlsEntity[]

  @ApiProperty( { type : ScreenshotsEntity,description: 'Screenshot of the url page' })
  screenshot: ScreenshotsEntity;

  @ApiProperty( { type : [ScriptsEntity],description: 'Scripts' })
  scripts: ScriptsEntity[];

  @ApiProperty({ enum: [ScanRequestStatusEnum.SUCCESS, ScanRequestStatusEnum.FAIL, ScanRequestStatusEnum.QUEUED],description : "Status of the Scan Job"})
  status: ScanRequestStatusEnum;

  @ApiProperty( { type : [StylesheetsEntity],description: 'Stylesheets' })
  stylesheets: StylesheetsEntity[];

  @ApiProperty( { type : 'string',description: 'url of the scan' })
  url: string;

}
