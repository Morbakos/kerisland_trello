import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Crud } from '@nestjsx/crud';
import { User } from './entities/user.entity';

@Crud({
    model: {
        type: User,
    },
    query: {
        exclude: ['password'],
        join: {
            roles: {
                eager: true
            },
            createdBy: {
                eager: true
            },
            'createdBy.user': {
                eager: true,
                required: true,
                exclude: ['password']
            }, 
            updatedBy: {
                eager: true
            },
            'updatedBy.user': {
                eager: true,
                required: true,
                exclude: ['password']
            },
            tickets: {
                eager: true
            },
            'tickets.assignedTo': {
                allow: [''],
                eager: true
            }
        },
    },
    routes: {
    },
})

@Controller('user')
export class UserController {
    constructor(public service: UserService) { }
}
