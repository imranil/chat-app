import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { GroupEntity, GroupMessageEntity, RoleEntity } from ".";


@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ select: false })
    @Exclude()
    password: string;

    @ManyToMany(() => RoleEntity, (role) => role.users)
    @JoinTable()
    roles: RoleEntity[];

    @OneToMany(() => GroupMessageEntity, (message) => message.author)
    @JoinColumn()
    messages: GroupMessageEntity[];

    @ManyToMany(() => GroupEntity, (group) => group.users)
    groups: GroupEntity[];
}