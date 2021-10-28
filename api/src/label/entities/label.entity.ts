import { Ticket } from "src/ticket/entities/ticket.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Label {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    labelName: string;

    @Column()
    labelColor: string;

    // reverse nav
    @ManyToMany(type => Ticket, (ticketEntity: Ticket) => {ticketEntity.labels})
    @JoinTable()
    tickets: Ticket[];
}
