import { LinkBaseModel} from "../interfaces";
import {Column, Entity} from "typeorm";
import {BaseResourceEntity} from "./base.resource.entity";

@Entity('Links')
export class LinksEntity extends BaseResourceEntity implements LinkBaseModel
{
  @Column({type :"text"})
  href: string;
}
