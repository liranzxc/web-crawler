import {ScreenshotsModel, ScriptBaseModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity} from "typeorm";


@Entity("Scripts")
export class ScriptsEntity extends BaseResourceEntity implements ScriptBaseModel
{
  @Column({type :"text"})
  name: string;

  @Column({type :"text"})
  content: string;
}
