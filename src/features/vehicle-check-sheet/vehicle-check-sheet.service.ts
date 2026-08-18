import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    VehicleCheckSheet,
    type VehicleCheckSheetDocument,
} from './vehicle-check-sheet.model';
import {
    type VehicleCheckSheetDto,
    type VehicleCheckSheetPayload,
} from './vehicle-check-sheet.types';

@Injectable()
export class VehicleCheckSheetService {
    constructor(
        @InjectModel(VehicleCheckSheet.name)
        private readonly vehicleCheckSheetModel: Model<VehicleCheckSheetDocument>,
    ) { }

    async create(payload: VehicleCheckSheetDto): Promise<VehicleCheckSheetPayload> {
        const sanitizedPayload = Object.fromEntries(
            Object.entries(payload).map(([key, value]) => [key, value === null ? undefined : value]),
        ) as VehicleCheckSheetDto;

        const document = await this.vehicleCheckSheetModel.create({
            ...sanitizedPayload,
            checkDate: payload.checkDate ?? new Date(),
        });

        return document.toObject() as VehicleCheckSheetPayload;
    }

    async findAll(): Promise<VehicleCheckSheetPayload[]> {
        const documents = await this.vehicleCheckSheetModel.find().lean().exec();
        return documents as VehicleCheckSheetPayload[];
    }
}
