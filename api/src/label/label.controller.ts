import { Controller, Get, Param } from '@nestjs/common';
import { LabelService } from './label.service';
import { Label } from './entities/label.entity';
import { Crud, CrudRequest } from '@nestjsx/crud';
import { resolve } from 'path';

@Crud({
    model: {
        type: Label,
    },
    query: {
        join: {
            createdBy: {
                eager: true
            },
            'createdBy.user': {
                eager: true,
                required: false,
                exclude: ['password'],

            },
        },
    },
    routes: {
    },
})

@Controller('label')
export class LabelController {
    constructor(public service: LabelService) { }

    @Get(':label')
    getByLabel(@Param('label') label: string) {
        return new Promise<Label>((resolve, reject) => {
            this.service.findOne(
                null, 
                {
                    where: {
                        labelName: label
                    }
                }).then((res: Label) => {
                    console.log(res);
                    resolve(res);
            })
        })
    }
}