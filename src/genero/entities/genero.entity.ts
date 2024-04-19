import { IsNotEmpty } from "class-validator";
import { Game } from "src/game/entities/game.entity";
import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";

@Entity({name: "tb_generos"})
export class Genero{

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    tipo: string;

    @OneToMany(() => Game, (game) => game.genero)
    game: Game[]
};