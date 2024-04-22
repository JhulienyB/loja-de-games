import { IsNotEmpty, IsNumber } from "class-validator";
import { Genero } from "src/genero/entities/genero.entity";
import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";

@Entity({name: "tb_postagens"})
export class Game{

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: "decimal", precision: 10, scale: 2})
    preco: number;
    
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    foto: string;

    @ManyToOne(() => Genero, (genero) => genero.game, {
        onDelete: "CASCADE"
    })
    genero: Genero;
};