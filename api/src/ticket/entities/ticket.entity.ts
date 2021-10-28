import { Label } from "src/label/entities/label.entity";
import { User } from "src/user/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketStatusEnum } from "./ticket-status.enum";
import { TicketTypeEnum } from "./ticket-type.enum";

@Entity()
export class Ticket {
    @PrimaryColumn({length: 10})
    @Index({unique: true})
    id: string;

    @Column()
    title: string;

    @Column({
        type: "enum",
        enum: TicketTypeEnum,
        default: TicketTypeEnum.Bug
    })
    type: TicketTypeEnum;

    @Column({
        type: "enum",
        enum: TicketStatusEnum,
        default: TicketStatusEnum.TODO
    })
    status: TicketStatusEnum

    @Column({
        type: "text",
        nullable: false
    })
    content: string;

    @ManyToMany(type => Label, (label) => label.tickets, {nullable: true})
    labels: Label[];

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @ManyToOne(type => User, user => user, {nullable: false})
    createdBy: User;

    @Column({ nullable: true, default: null })
    updatedDate: Date;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    updatedBy: User;

    @ManyToMany(() => User, (user) => user.tickets)
    @JoinTable()
    assignedTo: User[];

    @BeforeInsert()
    async randomId() {
        this.id = Math.random().toString(36).substring(2,12); // Random 10 chars, excluding the starting "x."
    }

    @BeforeUpdate()
    async currentTimestamp() {
        this.updatedDate = new Date();
    }
}
