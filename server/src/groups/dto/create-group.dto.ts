import { ArrayNotEmpty, IsNotEmpty, IsString } from "class-validator";


export class CreateGroupDto {
    @IsNotEmpty({message: 'The field must not be empty'})
    @IsString({ message: 'The name field must be a string' })
    readonly name: string;

    @IsNotEmpty({message: 'The field must not be empty'})
    @ArrayNotEmpty()
    readonly users: string[];
}