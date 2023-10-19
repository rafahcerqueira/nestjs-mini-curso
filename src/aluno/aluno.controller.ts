import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':matricula')
  findOne(@Param('matricula') matricula: number) {
    return this.alunoService.findOne(+matricula);
  }

  @Patch(':matricula')
  update(
    @Param('matricula') matricula: number,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.update(+matricula, updateAlunoDto);
  }

  @Delete(':matricula')
  remove(@Param('matricula') matricula: number) {
    return this.alunoService.remove(+matricula);
  }
}
