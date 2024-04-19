import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { GeneroService } from "../services/genero.service";
import { Genero } from "../entities/genero.entity";

@Controller("/generos")
export class GeneroController{

    constructor(private readonly generoService: GeneroService) {}
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Genero[]>{
        return this.generoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Genero>{
        return this.generoService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param('titulo') titulo: string): Promise<Genero[]>{
        return this.generoService.findByTipo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() genero: Genero): Promise<Genero>{
        return this.generoService.create(genero);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() genero: Genero): Promise<Genero>{
        return this.generoService.update(genero);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.generoService.delete(id);
    }
}
