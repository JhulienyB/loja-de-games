import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { GameService } from "../services/game.service";
import { Game } from "../entities/game.entity";

@Controller("/postagens")
export class GameController{

    constructor(private readonly gameService: GameService) {}
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Game[]>{
        return this.gameService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Game>{
        return this.gameService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Game[]>{
        return this.gameService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() game: Game): Promise<Game>{
        return this.gameService.create(game);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() game: Game): Promise<Game>{
        return this.gameService.update(game);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.gameService.delete(id);
    }
}
