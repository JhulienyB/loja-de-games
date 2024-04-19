import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genero } from "./entities/genero.entity";
import { GeneroService } from "./services/genero.service";
import { GeneroController } from "./controllers/genero.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Genero])],
    providers: [GeneroService],
    controllers: [GeneroController],
    exports: [TypeOrmModule]
})

export class GeneroModule { }
