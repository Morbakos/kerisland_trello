import { Role } from "src/role/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";
import { ApiHideProperty } from "@nestjs/swagger";
import { Ticket } from "src/ticket/entities/ticket.entity";

@Entity({
    orderBy: {
        id: "ASC"
    }
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @ManyToOne(type => User, user => user)
    createdBy: User;

    @Column({ nullable: true, default: null })
    updatedDate: Date;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    updatedBy: User;

    @ManyToMany(() => Role, (r) => r.user)
    roles: Role[];

    @ManyToMany(() => Ticket, (ticket) => ticket.assignedTo)
    tickets: Ticket[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
