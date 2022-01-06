import { IsString } from 'class-validator';

/**
 * Este fichero define los campos necesarios para crear un objeto de tipo Tuit
 */
export class CreateTuitDto {
    @IsString()
    readonly message: string;
}
