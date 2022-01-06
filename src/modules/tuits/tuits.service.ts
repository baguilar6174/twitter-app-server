import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
    private tuits: Tuit[] = [
        {
            id: '1',
            message: 'Hello from NestJS 😎',
        },
    ];

    getTuits(): Tuit[] {
        return this.tuits;
    }

    getTuit(id: string): Tuit {
        const tuit = this.tuits.find((t) => t.id === id);
        if (!tuit) {
            throw new NotFoundException(`Resources not found`);
        }
        return tuit;
    }

    createTuit({ message }: CreateTuitDto) {
        this.tuits.push({
            id: new Date().getMilliseconds().toString(),
            message,
        });
    }

    updateTuit(id: string, { message }: UpdateTuitDto): Tuit {
        const tuit: Tuit = this.getTuit(id);
        tuit.message = message;
        return tuit;
    }

    deleteTuit(id: string): void {
        const index = this.tuits.findIndex((t) => t.id === id);
        if (index >= 0) {
            this.tuits.splice(index, 1);
        }
    }
}
