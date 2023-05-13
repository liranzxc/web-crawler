import { LinkBaseModel} from "../interfaces";
import {Column, Entity} from "typeorm";
import {BaseResourceEntity} from "./base.resource.entity";

@Entity('OutgoingUrls')
export class OutgoingUrlsEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;
}
