import { ScreenshotsModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {ScanRequestEntity} from "./scan.request.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity("Screenshots")
export class ScreenshotsEntity extends BaseResourceEntity implements ScreenshotsModel
{
  @ApiProperty( { type : 'string',description: 'Relative path of the screenshot' })
  @Column({type :"text"})
  relativePath: string;

  @JoinColumn()
  @OneToOne(type => ScanRequestEntity, crawlerRequest => crawlerRequest.screenshot)
  scanRequest: ScanRequestEntity
}
