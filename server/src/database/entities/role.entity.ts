import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from ".";


@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    value: string;

    @Column()
    description: string;

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];
}