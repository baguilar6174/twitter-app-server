import { Module } from '@nestjs/common';

import { TuitsModule } from './modules/tuits/tuits.module';

@Module({
    imports: [TuitsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
