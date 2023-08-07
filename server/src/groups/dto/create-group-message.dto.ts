import { ArrayNotEmpty, IsNotEmpty, IsString } from "class-validator";


export class CreateGroupMessageDto {
    @IsNotEmpty({message: 'The field must not be empty'})
    @IsString({ message: 'The text field must be a string' })
    readonly text: string;
}