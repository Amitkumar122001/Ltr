import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VehicleCheckSheet,
  VehicleCheckSheetSchema,
} from './vehicle-check-sheet.model';
import { VehicleCheckSheetController } from './vehicle-check-sheet.controller';
import { VehicleCheckSheetService } from './vehicle-check-sheet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VehicleCheckSheet.name, schema: VehicleCheckSheetSchema },
    ]),
  ],
  controllers: [VehicleCheckSheetController],
  providers: [VehicleCheckSheetService],
  exports: [VehicleCheckSheetService],
})
export class VehicleCheckSheetModule {}
