/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tw_tuit' })
export class Tuit {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    message: string;
}
