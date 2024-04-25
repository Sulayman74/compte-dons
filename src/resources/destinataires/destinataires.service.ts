import { CreateDestinataireDto, UpdateDestinataireDto } from './dto';
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';

import { Destinataire } from './entities/destinataire.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinatairesService {

  constructor(private _prisma: PrismaService) { }
  async create(createDestinataireDto: CreateDestinataireDto): Promise<Destinataire> {

    try {
      const addDestinataire = await this._prisma.destinataire.create({
        data: { ...createDestinataireDto }
      })
      console.log("destinataire", addDestinataire);
      return addDestinataire
    } catch (error) {
      console.log(error);
      if (
        error.error === 'Forbidden') {

        throw new ForbiddenException("Vous n'avez pas les droits nécessaires pour accéder à cette route")
      } else {
        throw new Error(error)
      }
    }

  }

  findAll() {
    return `This action returns all destinataires`;
  }

  findOne(id: number) {
    return `This action returns a #${id} destinataire`;
  }

  update(id: number, updateDestinataireDto: UpdateDestinataireDto) {
    return `This action updates a #${id} destinataire`;
  }

  remove(id: number) {
    return `This action removes a #${id} destinataire`;
  }
}
