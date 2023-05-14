import {LinkBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {ScanRequestEntity} from "./scan.request.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity("Stylesheets")
export class StylesheetsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @ApiProperty( { type : 'string',description: 'link' })
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => ScanRequestEntity, crawlerRequest => crawlerRequest.stylesheets)
  scanRequest: ScanRequestEntity
}
