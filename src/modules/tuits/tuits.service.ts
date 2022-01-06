import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
    constructor(
        @InjectRepository(Tuit)
        private readonly tuitRepository: Repository<Tuit>,
    ) {}

    async getTuits(): Promise<Tuit[]> {
        return await this.tuitRepository.find();
    }

    async getTuit(id: number): Promise<Tuit> {
        const tuit: Tuit = await this.tuitRepository.findOne(id);
        if (!tuit) {
            throw new NotFoundException(`Resources not found`);
        }
        return tuit;
    }

    async createTuit({ message }: CreateTuitDto) {
        const tuit: Tuit = this.tuitRepository.create({ message });
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
