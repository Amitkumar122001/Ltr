import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import type {
  VehicleCheckSheetDto,
  VehicleCheckSheetPayload,
  ApiResponse,
} from './vehicle-check-sheet.types';
import { VehicleCheckSheetService } from './vehicle-check-sheet.service';

@Controller('api/v1/vehicle-check-sheet')
export class VehicleCheckSheetController {
  constructor(
    private readonly vehicleCheckSheetService: VehicleCheckSheetService,
  ) {}

  @Get('/getAllVehicleCheckSheet')
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const data = await this.vehicleCheckSheetService.findAll();
      res.status(200).json({
        status: true,
        message: 'Vehicle check sheets retrieved successfully',
        result: data,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve vehicle check sheets';
      res.status(500).json({
        status: false,
        message: errorMessage,
        result: null,
      });
    }
  }

  @Post('/add')
  async create(
    @Body() payload: any,
    @Res() res: Response,
  ): Promise<void> {
    try {
      console.log(payload, "payload")
      const data = await this.vehicleCheckSheetService.create(payload);
      res.status(201).json({
        status: true,
        message: 'Vehicle check sheet created successfully',
        result: data,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create vehicle check sheet';
      res.status(500).json({
        status: false,
        message: errorMessage,
        result: null,
      });
    }
  }
}
