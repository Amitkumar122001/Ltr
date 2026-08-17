import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleCheckSheetModule } from './features/vehicle-check-sheet/vehicle-check-sheet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        return {
          uri: mongoUri,
        };
      },
    }),
    VehicleCheckSheetModule,
  ],
})
export class AppModule {}