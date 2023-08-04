import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardDataDTO } from './app.dto';

@Controller()
@UseGuards(JwtGuard)
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/dashboard')
  @ApiResponse({ type: DashboardDataDTO })
  getDashboardData() {
    return this.appService.getDashboardData() as unknown as DashboardDataDTO;
  }
}
