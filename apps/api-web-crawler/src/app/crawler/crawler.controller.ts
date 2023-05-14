import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CrawlerService} from "./crawler.service";
import {RequestScanDto} from "../../../../../libs/dto/request.scan.dto";
import {ScanResultsDto} from "../../../../../libs/dto/scan.results.dto";
import {ApiOkResponse} from "@nestjs/swagger";

@Controller()
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}



  @Post('/crawl')
  async createCrawlRequest(@Body() requestDto : RequestScanDto)
  {
    return this.crawlerService.createRequest(requestDto);
  }

  @Get()
  async health()
  {
    return { health : 200 }
  }

  @ApiOkResponse({
    description: 'Scans result',
    type: ScanResultsDto,
    isArray: true
  })
  @Get('/scans')
  async getAllScans()
  {
    return this.crawlerService.getAllScans();
  }

  @ApiOkResponse({
    description: 'Scan result',
    type: ScanResultsDto,
  })
  @Get('/scans/:id')
  async getCrawlDetails(@Param('id') scanId : string):Promise<ScanResultsDto>
  {
    return this.crawlerService.getScanInformationById(scanId);
  }




}
