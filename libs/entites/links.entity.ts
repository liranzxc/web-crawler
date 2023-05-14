import { LinkBaseModel} from "../interfaces";
import {Column, Entity, Index, ManyToOne, OneToOne} from "typeorm";
import {BaseResourceEntity} from "./base.resource.entity";
import {ScanRequestEntity} from "./scan.request.entity";

@Entity('Links')
export class LinksEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => ScanRequestEntity, crawlerRequest => crawlerRequest.links)
  crawlerRequest: ScanRequestEntity
}
