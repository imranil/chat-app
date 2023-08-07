import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message: 'The field must not be empty'})
    @IsString({ message: 'The value field must be a string' })
    readonly value: string;

    @IsNotEmpty({message: 'The field must not be empty'})
    @IsString({ message: 'The description field must be a string' })
    readonly description: string;
}