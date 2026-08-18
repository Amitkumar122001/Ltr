import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

export type InspectionType = 'yesNo' | 'working' | 'okBroken';
export type CaptureType = 'date' | 'remark';
export type InspectionStatus = boolean | number | string | null;

export interface InspectionItem {
    id: number;
    label: string;
    type: InspectionType;
    captureType: CaptureType;
}

export interface InspectionEntry {
    id: number;
    name: string;
    status: InspectionStatus;
    value: string | Date | null;
}

export type InspectionList = InspectionEntry[];

export interface VehicleCheckSheetPayload {
    checkDate: Date | string | null;
    vehicleNumber: string;
    vehicleMake: string | null;
    vehicleModel: string;
    driverName: string;
    km: number;
    gatePassNo: string | null;
    department: string | null;
    user: string | null;
    inspection: InspectionList;
    lastServiceDate: Date | string | null;
    lastServiceKm: number;
    odometerDate: Date | string | null;
    odometerKm: number;
    otherRemarks: string;
    suggestions: string;
    checkedBySignature: string;
    driverSignature: string;
    managerSignature: string;
}

export class InspectionEntryDto {
    @IsNumber()
    id!: number;

    @IsString()
    name!: string;

    @IsNotEmpty()
    @Transform(({ value }) => {
        if (value === true || value === 'true' || value === 1 || value === '1') return true;
        if (value === false || value === 'false' || value === 0 || value === '0') return false;
        return value;
    })
    @IsIn([true, false, 1, 0, 'working', 'not-working', 'ok', 'broken', null])
    status!: InspectionStatus;

    @IsNotEmpty()
    @IsString()
    value!: string | null;
}

export interface ApiResponse<T> {
    status: boolean;
    message: string;
    result: T | null;
}

export class VehicleCheckSheetDto implements VehicleCheckSheetPayload {
    @IsNotEmpty()
    checkDate!: Date | string | null;

    @IsNotEmpty()
    @IsString()
    vehicleNumber!: string;

    @IsOptional()
    @IsString()
    vehicleMake!: string | null;

    @IsNotEmpty()
    @IsString()
    vehicleModel!: string;

    @IsNotEmpty()
    @IsString()
    driverName!: string;

    @IsNotEmpty()
    @IsNumber()
    km!: number;

    @IsOptional()
    @IsString()
    gatePassNo!: string | null;

    @IsOptional()
    @IsString()
    department!: string | null;

    @IsOptional()
    user!: string;

    @IsNotEmpty()
    @IsArray()
    @Type(() => InspectionEntryDto)
    @ValidateNested({ each: true })
    inspection!: InspectionList;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lastServiceDate!: Date | string | null;

    @IsNotEmpty()
    @IsNumber()
    lastServiceKm!: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    odometerDate!: Date | string | null;

    @IsNotEmpty()
    @IsNumber()
    odometerKm!: number;

    @IsNotEmpty()
    @IsString()
    otherRemarks!: string;

    @IsNotEmpty()
    @IsString()
    suggestions!: string;

    @IsNotEmpty()
    @IsString()
    checkedBySignature!: string;

    @IsNotEmpty()
    @IsString()
    driverSignature!: string;

    @IsNotEmpty()
    @IsString()
    managerSignature!: string;
}
