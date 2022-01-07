import { IsObject, IsString } from 'class-validator';

import { User } from 'src/modules/users/entities';

/**
 * Este fichero define los campos necesarios para crear un objeto de tipo Tuit
 */
export class CreateTuitDto {
    @IsString()
    readonly message: string;

    // La clase genérica Partial permite la inserción o manipulación de elementos
    // de manera parcial (no necesariamente se necesitan todas las propiedades)
    // @IsObject valida que el valor enviado sea exactamente un objeto.
    @IsObject()
    readonly user: Partial<User>;
}
