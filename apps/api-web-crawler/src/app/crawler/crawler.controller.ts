import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CrawlerService} from "./crawler.service";
import {RequestScanDto} from "../../../../../libs/dto/request.scan.dto";

@Controller()
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}


  @Post('/crawl')
  async createCrawlRequest(@Body() requestDto : RequestScanDto)
  {
    return this.crawlerService.createRequest(requestDto);
  }

  @Get('/scans')
  async getAllScans()
  {
    return this.crawlerService.getAllScans();
  }

  @Get('/scans/:id')
  async getCrawlDetails(@Param('id') scanId : string)
  {
    return this.crawlerService.getScanInformationById(scanId);
  }




}
