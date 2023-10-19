import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AlunoModule } from './aluno/aluno.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AlunoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
