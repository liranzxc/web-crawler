import {LinkBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {ScanRequestEntity} from "./scan.request.entity";


@Entity("Scripts")
export class ScriptsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;

  @ManyToOne(type => ScanRequestEntity, crawlerRequest => crawlerRequest.scripts)
  crawlerRequest: ScanRequestEntity
}
