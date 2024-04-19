import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Genero } from "../entities/genero.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class GeneroService{
    constructor(
        @InjectRepository(Genero)
        private generoRepository: Repository<Genero>
    ){}

    async findAll(): Promise<Genero[]>{
        return await this.generoRepository.find({
            relations: {
                game: true
            }
        });
    }

    async  findById(id: number): Promise<Genero> {
        let genero = await this.generoRepository.findOne({
            where:{
                id
            },
            relations: {
                game: true
            }
        })
        if (!genero)
            throw new HttpException('Genero não encontrado!', HttpStatus.NOT_FOUND);
        return genero;
    }

    async findByTipo(tipo: string): Promise<Genero[]>{
        return await this.generoRepository.find({
            where:{
                tipo: ILike(`%${tipo}%`)
            },
            relations: {
                game: true
            }
        })
    }

    async create(genero: Genero): Promise<Genero>{
        return await this.generoRepository.save(genero);
    }

    async update(genero: Genero): Promise<Genero>{

        let buscaGenero: Genero = await this.findById(genero.id)

        if (!buscaGenero || !genero.id)
            throw new HttpException('Genero não foi encontrado!', HttpStatus.NOT_FOUND)    
        
        return await this.generoRepository.save(genero);
    }

    async delete(id: number): Promise<DeleteResult>{
        let buscaGenero: Genero = await this.findById(id)

        if (!buscaGenero)
            throw new HttpException('Genero não foi encontrado!', HttpStatus.NOT_FOUND)
        
        return await this.generoRepository.delete(id);
    }

}
