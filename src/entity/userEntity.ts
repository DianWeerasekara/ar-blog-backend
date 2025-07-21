import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userid !: number;

    @Column()
    name !: string;

    @Column()
    email !: string
}