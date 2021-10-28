import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TicketModule } from './ticket/ticket.module';
import { LabelModule } from './label/label.module';
import OrmConfig from './ormconfig';

@Module({
    imports: [
        TypeOrmModule.forRoot(OrmConfig),
        AppService,
        UserModule,
        RoleModule,
        TicketModule,
        LabelModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
