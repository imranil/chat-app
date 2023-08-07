import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'The field must not be empty'})
    @IsEmail({}, { message: 'The field must be a email' })
    readonly email: string;

    @IsNotEmpty({message: 'The field must not be empty'})
    @IsString({ message: 'The firstname field must be a string' })
    readonly firstname: string;

    @IsNotEmpty({message: 'The field must not be empty'})
    @IsString({ message: 'The lastname field must be a string' })
    readonly lastname: string;

    @IsNotEmpty({message: 'The field must not be empty'})
    @IsString({ message: 'The password field must be a string' })
    @Length(4, 32, { message: 'The field must contain from 4 to 32 characters'})
    readonly password: string;
}