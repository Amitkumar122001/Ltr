import { Body, Controller, Get, Post } from '@nestjs/common';
import type {
  VehicleCheckSheetDto,
  VehicleCheckSheetPayload,
} from './vehicle-check-sheet.types';
import { VehicleCheckSheetService } from './vehicle-check-sheet.service';

@Controller('vehicle-check-sheet')
export class VehicleCheckSheetController {
  constructor(
    private readonly vehicleCheckSheetService: VehicleCheckSheetService,
  ) {}

  @Get('/getAllVehicleCheckSheet')
  async findAll(): Promise<VehicleCheckSheetPayload[]> {
    return this.vehicleCheckSheetService.findAll();
  }

  @Post('/add')
  async create(
    @Body() payload: any,
  ): Promise<VehicleCheckSheetPayload> {
    console.log(payload, "payload")
    return this.vehicleCheckSheetService.create(payload);
  }
}
