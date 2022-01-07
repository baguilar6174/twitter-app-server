import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
    constructor(
        @InjectRepository(Tuit)
        private readonly tuitRepository: Repository<Tuit>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getTuits({ limit, offset }: PaginationQueryDto): Promise<Tuit[]> {
        return await this.tuitRepository.find({
            relations: ['user'],
            skip: offset,
            take: limit,
        });
    }

    async getTuit(id: number): Promise<Tuit> {
        const tuit: Tuit = await this.tuitRepository.findOne(id, {
            relations: ['user'],
        });
        if (!tuit) {
            throw new NotFoundException(`Resources not found`);
        }
        return tuit;
    }

    async createTuit({ message, user }: CreateTuitDto) {
        const tuit: Tuit = this.tuitRepository.create({ message, user });
        return this.tuitRepository.save(tuit);
    }

    async updateTuit(id: number, { message }: UpdateTuitDto): Promise<Tuit> {
        // Hace un merge entre el objeto que queremos crear con sus propiedades
        // busca un tuit en la BD y lo actualiza, si no existe, retorna un null
        const tuit: Tuit = await this.tuitRepository.preload({ id, message });
        if (!tuit) {
            throw new NotFoundException(`Resources not found`);
        }
        return tuit;
    }

    async deleteTuit(id: number): Promise<void> {
        const tuit: Tuit = await this.tuitRepository.findOne(id);
        if (!tuit) {
            throw new NotFoundException(`Resources not found`);
        }
        this.tuitRepository.remove(tuit);
    }
}
