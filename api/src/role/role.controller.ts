import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';

@Crud({
    model: {
        type: Role,
    },
    query: {
        join: {
            user: {
                eager: true,
                exclude: ['password']
            },
            'user.roles': {
                eager: false
            }
        }
    },
    routes: {
    },
})

@Controller('role')
export class RoleController {
    constructor(public service: RoleService) { }

    get base(): CrudController<Role> {
        return this;
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Get("full")
    getManyFull(
        @ParsedRequest() req: CrudRequest
    ) {
        req.options.query.join = {
            user: {
                eager: true
            },
            "user.tickets": {
                eager: true
            }
        };
        return this.base.getManyBase(req);
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Get("full/:id")
    getOneFull(
        @ParsedRequest() req: CrudRequest
    ) {
        req.options.query.join = {
            user: {
                eager: true
            },
            "user.tickets": {
                eager: true
            }
        };
        return this.base.getManyBase(req);
    }
}
