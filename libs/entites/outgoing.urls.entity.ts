import { LinkBaseModel} from "../interfaces";
import {Column, Entity, Index, ManyToOne} from "typeorm";
import {BaseResourceEntity} from "./base.resource.entity";
import {ScanRequestEntity} from "./scan.request.entity";

@Entity('OutgoingUrls')
export class OutgoingUrlsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => ScanRequestEntity, crawlerRequest => crawlerRequest.outgoingUrls)
  scanRequest: ScanRequestEntity
}
