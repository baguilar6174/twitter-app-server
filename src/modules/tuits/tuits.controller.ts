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
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
    constructor(private readonly tuitsService: TuitsService) {}

    // Si el decorador de la ruta esta en blanco toma la ruta del controller 'localhost:3000/tuits'
    @Get()
    getTuits(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
        return this.tuitsService.getTuits(pagination);
    }

    @Get(':id') // localhost:3000/tuits/1
    getTuit(@Param('id') id: number): Promise<Tuit> {
        return this.tuitsService.getTuit(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createTuit(@Body() body: CreateTuitDto): Promise<Tuit> {
        return this.tuitsService.createTuit(body);
    }

    @Patch(':id')
    updateTuit(
        @Param('id') id: number,
        @Body() body: UpdateTuitDto,
    ): Promise<Tuit> {
        return this.tuitsService.updateTuit(id, body);
    }

    @Delete(':id')
    deleteTuit(@Param('id') id: number): Promise<void> {
        // return `The tuit ${id} has been deleted`;
        return this.tuitsService.deleteTuit(id);
    }
}
