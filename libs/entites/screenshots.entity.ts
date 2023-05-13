import { ScreenshotsModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity} from "typeorm";


@Entity("Screenshots")
export class ScreenshotsEntity extends BaseResourceEntity implements ScreenshotsModel
{
  @Column({type :"text"})
  relativePath: string;
}
