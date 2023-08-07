import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


export abstract class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    text: string;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: number;

    @ManyToOne(() => UserEntity, (user) => user.messages)
    author: UserEntity;
}