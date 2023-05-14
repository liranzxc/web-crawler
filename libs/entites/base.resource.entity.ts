import {BaseModel} from "../interfaces";
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

export abstract class BaseResourceEntity implements BaseModel {
  @ApiProperty({type: 'string'})
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty( { type : 'string',description: 'creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty( { type : 'string',description: 'update date' })
  @UpdateDateColumn()
  updatedAt: Date;
}
