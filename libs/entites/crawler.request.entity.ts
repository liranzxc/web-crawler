import {CrawlerRequestStatusEnum} from "../enums/crawler.request.status.enum";
import {CrawlerRequestModel} from "../interfaces";
import {BaseResourceEntity} from "./base.resource.entity";
import {Column, Entity} from "typeorm";


@Entity("CrawlerRequest")
export class CrawlerRequestEntity extends BaseResourceEntity implements CrawlerRequestModel
{
    @Column({ type : 'text'})
    url:string;

    @Column({ type : 'text'})
    status:CrawlerRequestStatusEnum
}
