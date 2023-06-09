import {LinkBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {ScanRequestEntity} from "./scan.request.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity("Scripts")
export class ScriptsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @ApiProperty( { type : 'string',description: 'Link source of the script' })
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => ScanRequestEntity, crawlerRequest => crawlerRequest.scripts)
  scanRequest: ScanRequestEntity
}
