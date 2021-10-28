import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Crud } from '@nestjsx/crud';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from './entities/ticket.entity';

@Crud({
    model: {
        type: Ticket,
    },
    query: {
        join: {
            createdBy: {
                eager: true
            },
            'createdBy.user': {
                eager: true,
                required: true,
                allow: ['id', 'name']
            },
            'updatedBy.user': {
                eager: true,
                required: false,
                exclude: ['password'],
            },
            'assignedTo': {
                eager: true,
                required: false,
                exclude: ['password'],
            },
            labels: {
                eager: true
            }
        },
    },
    routes: {
    },
})

@Controller('ticket')
export class TicketController {
    constructor(public service: TicketService) { }
}
