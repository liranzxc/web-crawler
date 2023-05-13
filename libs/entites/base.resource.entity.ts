import {BaseModel} from "../interfaces";
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseResourceEntity implements BaseModel
{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}
