import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game/entities/game.entity';
import { GameModule } from './game/game.module';
import { GeneroModule } from './genero/genero.module';
import { Genero } from './genero/entities/genero.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojadegames',
      entities: [Game, Genero],
      synchronize: true
    }),
    GameModule,
    GeneroModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
