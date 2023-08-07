import { GroupMessageEntity } from "./group-message.entity";
import { GroupEntity } from "./group.entity";
import { MessageEntity } from "./message.entity";
import { RoleEntity } from "./role.entity";
import { SessionEntity } from "./session.entity";
import { UserEntity } from "./user.entity";


const entities = [
    UserEntity,
    RoleEntity,
    SessionEntity,
    MessageEntity,
    GroupEntity,
    GroupMessageEntity,
];


export default entities;

export {
    UserEntity,
    RoleEntity,
    SessionEntity,
    MessageEntity,
    GroupEntity,
    GroupMessageEntity,
};