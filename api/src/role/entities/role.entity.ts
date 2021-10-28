import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @ManyToMany(() => User, (user) => user)
    @JoinColumn()
    createdBy: number;

    @Column({ nullable: true, default: null })
    updatedDate: Date;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    updatedBy: number;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable()
    user: User[];
}
