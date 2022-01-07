import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TuitsModule } from './modules/tuits/tuits.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        TuitsModule,
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'admin',
            database: 'db_twitter',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
