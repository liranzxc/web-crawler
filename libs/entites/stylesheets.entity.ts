import {ScreenshotsModel, ScriptBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity} from "typeorm";


@Entity("Stylesheets")
export class StylesheetsEntity extends BaseResourceEntity implements ScriptBaseModel
{
  @Column({type :"text"})
  name: string;

  @Column({type :"text"})
  content: string;
}
