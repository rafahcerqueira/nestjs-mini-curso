import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(createAlunoDto: CreateAlunoDto) {
    const alunoExiste = await this.prisma.aluno.findFirst({
      where: {
        email: createAlunoDto.email,
      },
    });

    if (alunoExiste) throw new BadRequestException('Aluno já existe!');

    return await this.prisma.aluno.create({
      data: createAlunoDto,
    });
  }

  findAll() {
    return this.prisma.aluno.findMany();
  }

  async findOne(matricula: number) {
    const buscaAluno = await this.prisma.aluno.findFirst({
      where: {
        matricula: matricula,
      },
    });

    if (!buscaAluno) throw new BadRequestException('Aluno não encontrado!');

    return buscaAluno;
  }

  async update(matricula: number, updateAlunoDto: UpdateAlunoDto) {
    const alunoExiste = await this.prisma.aluno.findFirst({
      where: {
        matricula: matricula,
      },
    });

    if (!alunoExiste) throw new BadRequestException('Aluno não existe');

    return await this.prisma.aluno.update({
      where: {
        email: updateAlunoDto.email,
      },
      data: updateAlunoDto,
    });
  }

  async remove(matricula: number) {
    const alunoExiste = await this.prisma.aluno.findFirst({
      where: {
        matricula: matricula,
      },
    });

    if (!alunoExiste) throw new BadRequestException('Aluno não existe');

    const alunoDeletado = await this.prisma.aluno.delete({
      where: {
        matricula: matricula,
      },
    });

    return alunoDeletado.nome + ' foi deletado com sucesso!';
  }
}
