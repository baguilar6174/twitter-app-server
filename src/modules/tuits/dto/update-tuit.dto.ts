import { IsString } from 'class-validator';

/**
 * Este fichero define los campos necesarios para actualizar un objeto de tipo Tuit
 */
export class UpdateTuitDto {
    @IsString()
    readonly message: string;
}
