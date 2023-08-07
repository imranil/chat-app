import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupMessageEntity, UserEntity } from ".";


@Entity({ name: 'groups' })
export class GroupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    avatar?: string;

    @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
    @JoinColumn()
    owner: UserEntity;

    @ManyToMany(() => UserEntity, (user) => user.groups)
    @JoinTable()
    users: UserEntity[];

    @OneToMany(() => GroupMessageEntity, (message) => message.group, {
        cascade: ['insert', 'remove', 'update'],
    })
    @JoinColumn()
    messages: GroupMessageEntity[];

    @OneToOne(() => GroupMessageEntity)
    @JoinColumn({ name: 'lastMessageSent' })
    lastMessageSent: GroupMessageEntity;

    @UpdateDateColumn({
        name: 'updatedAt'
    })
    lastMessageSentAt: Date;

    @CreateDateColumn({
        name: 'createdAt'
    })
    createdAt: number;
}