import { Entity, ManyToOne } from 'typeorm';
import { GroupEntity } from './group.entity';
import { MessageEntity } from './message.entity';


@Entity({ name: 'group_messages' })
export class GroupMessageEntity extends MessageEntity {
  @ManyToOne(() => GroupEntity, (group) => group.messages)
  group: GroupEntity;
}