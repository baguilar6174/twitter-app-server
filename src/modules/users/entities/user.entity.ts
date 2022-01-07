/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Tuit } from 'src/modules/tuits/tuit.entity';

@Entity({ name: 'tw_user' })
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    // nullable: false indica que el campo es requerido a nivel de BD
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    // Un usuario puede tener varios tuits
    @OneToMany((type) => Tuit, (tuit) => tuit.user)
    tuits: Tuit[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
