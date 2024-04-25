import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "../entities/game.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { GeneroService } from "src/genero/services/genero.service";

@Injectable()
export class GameService{
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        private generoService: GeneroService
    ){}

    async findAll(): Promise<Game[]>{
        return await this.gameRepository.find({
            relations: {
                genero: true
            }
        });
    }

    async  findById(id: number): Promise<Game> {
        let game = await this.gameRepository.findOne({
            where:{
                id
            },
            relations: {
                genero: true
            }
        })
        if (!game)
            throw new HttpException('Game não encontrado!', HttpStatus.NOT_FOUND);
        return game;
    }

    // Se na pesquisa colocar game/maior_preco/200, mostrar jogos com precos maiores que 200 
    // async searchHigh (preco: number): Promise<Game>{
    //     let game = await this.gameRepository.findOne({
    //         where:{
    //             preco
    //         },
    //         relations: {
    //             genero: true
    //         }
    //     })
    //     const user = await this.gameRepository
    //     .createQueryBuilder(Game, "game")
    //     .where("user.preco = :preco", { preco: 200 })
    //     return game;
    // }

    async findByNome(nome: string): Promise<Game[]>{
        return await this.gameRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations: {
                genero: true
            }
        })
    }

    async create(game: Game): Promise<Game>{
    
        if (game.genero){

            let genero = await this.generoService.findById(game.genero.id)
        
            if(!genero)
                throw new HttpException('Genero não foi encontrado!', HttpStatus.NOT_FOUND)
        
            return await this.gameRepository.save(game);
        }
        return await this.gameRepository.save(game);
    }

    async update(game: Game): Promise<Game>{

        let buscaGame: Game = await this.findById(game.id)

        if (!buscaGame || !game.id)
            throw new HttpException('Game não foi encontrado!', HttpStatus.NOT_FOUND)    
        
        if (game.genero){

            let genero = await this.generoService.findById(game.genero.id)
        
            if(!genero)
                throw new HttpException('Genero não foi encontrado!', HttpStatus.NOT_FOUND)
        
            return await this.gameRepository.save(game);
        }
        return await this.gameRepository.save(game);
    }

    async delete(id: number): Promise<DeleteResult>{
        let buscaGame: Game = await this.findById(id)

        if (!buscaGame)
            throw new HttpException('Game não foi encontrado!', HttpStatus.NOT_FOUND)
        
        return await this.gameRepository.delete(id);
    }

}
