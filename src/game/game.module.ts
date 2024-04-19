import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";
import { GameService } from "./services/game.service";
import { GameController } from "./controllers/game.controller";
import { GeneroModule } from "src/genero/genero.module";
import { GeneroService } from "src/genero/services/genero.service";

@Module({
    imports: [TypeOrmModule.forFeature([Game]), GeneroModule],
    providers: [GameService, GeneroService],
    controllers: [GameController],
    exports: [TypeOrmModule]
})

export class GameModule { }
