import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import type { InspectionList } from './vehicle-check-sheet.types';

export type VehicleCheckSheetDocument = HydratedDocument<VehicleCheckSheet>;

@Schema({ timestamps: true })
export class VehicleCheckSheet {
    @Prop({ type: Date, default: Date.now, required: true })
    checkDate!: Date;

    @Prop({ type: String, required: true })
    vehicleNumber!: string;

    @Prop({ type: String, required: true })
    vehicleMake!: string | null;

    @Prop({ type: String, required: true })
    vehicleModel!: string;

    @Prop({ type: String, required: true })
    driverName!: string;

    @Prop({ type: Number, required: true })
    km!: number;

    @Prop({ type: String, default: null })
    gatePassNo!: string | null;

    @Prop({ type: String, default: null })
    department!: string | null;

    @Prop({ type: String, default: null })
    user!: string | null;

    @Prop({
        type: [
            {
                id: { type: Number, required: true },
                name: { type: String, required: true },
                status: { type: MongooseSchema.Types.Mixed, required: false },
                value: { type: MongooseSchema.Types.Mixed, required: false },
                _id: false,
            },
        ],
        required: true,
    })
    inspection!: InspectionList;

    @Prop({ type: Date, required: true })
    lastServiceDate!: Date | null;

    @Prop({ type: Number, required: true })
    lastServiceKm!: number;

    @Prop({ type: Date, required: true })
    odometerDate!: Date | null;

    @Prop({ type: Number, required: true })
    odometerKm!: number;

    @Prop({ type: String, default: "" })
    otherRemarks!: string;

    @Prop({ type: String, default: "" })
    suggestions!: string;

    @Prop({ type: String, required: true })
    checkedBySignature!: string;

    @Prop({ type: String, required: true })
    driverSignature!: string;

    @Prop({ type: String, required: true })
    managerSignature!: string;
}

export const VehicleCheckSheetSchema = SchemaFactory.createForClass(VehicleCheckSheet);
