import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelService extends TypeOrmCrudService<Label> {
    constructor(
        @InjectRepository(Label)
        private ticketRepository: Repository<Label>
    ) {
        super(ticketRepository);
    }
}
