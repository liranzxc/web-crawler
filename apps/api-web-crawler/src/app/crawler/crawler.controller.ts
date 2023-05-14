import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CrawlerService} from "./crawler.service";
import {ScanRequestDto} from "../../../../../libs/dto";
import {ScanResultsDto} from "../../../../../libs/dto";
import {ApiExcludeEndpoint, ApiOkResponse} from "@nestjs/swagger";

@Controller()
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('/crawl')
  async createCrawlRequest(@Body() requestDto : ScanRequestDto)
  {
    return this.crawlerService.createRequest(requestDto);
  }

  @ApiExcludeEndpoint()
  @Get("/health")
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
