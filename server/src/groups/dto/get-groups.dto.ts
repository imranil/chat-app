import { IsEnum, IsOptional } from "class-validator";


export class GetGroupsDto {
    @IsOptional()
    readonly search?: string = '';
}