import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService extends TypeOrmCrudService<Role> {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) {
        super(roleRepository);
    }
}