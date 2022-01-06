import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
    constructor(private readonly tuitsService: TuitsService) {}

    // Si el decorador de la ruta esta en blanco toma la ruta del controller 'localhost:3000/tuits'
    @Get()
    getTuits(@Query() filter): Tuit[] {
        const { search, order } = filter;
        // return `All ${search} tuits order by ${order}`;
        return this.tuitsService.getTuits();
    }

    @Get(':id') // localhost:3000/tuits/1
    getTuit(@Param('id') id: string): Tuit {
        // return `Your tuit id is ${id}`;
        return this.tuitsService.getTuit(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createTuit(@Body() body: CreateTuitDto): void {
        // return `Your tuit was ${body.message}`;
        return this.tuitsService.createTuit(body);
    }

    @Patch(':id')
    updateTuit(@Param('id') id: string, @Body() body: UpdateTuitDto): Tuit {
        // return `The tuit ${id} has been updated`;
        return this.tuitsService.updateTuit(id, body);
    }

    @Delete(':id')
    deleteTuit(@Param('id') id: string): void {
        // return `The tuit ${id} has been deleted`;
        return this.tuitsService.deleteTuit(id);
    }
}
