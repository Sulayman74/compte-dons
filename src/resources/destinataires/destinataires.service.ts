import { CreateDestinataireDto, UpdateDestinataireDto } from './dto';
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';

import { Destinataire } from './entities/destinataire.entity';
import { PrismaService } from '../../prisma/prisma.service';

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

  async findAll() {
    return await this._prisma.destinataire.findMany()
  }

  async findOne(id: string) {
    return await this._prisma.destinataire.findUnique({
      where: { id }
    })
  }

  async update(id: string, updateDestinataireDto: UpdateDestinataireDto): Promise<Destinataire> {


    try {
      const profil = await this._prisma.destinataire.update({
        where: { id },
        data: { ...updateDestinataireDto }
      })

      return profil
    } catch (error) {

      console.error(
        'Erreur lors de la mise à jour du destinataire :',
        error,
      );

      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à mettre à jour ce destinataire",
      );
    }
  }

  remove(id: string): Promise<Destinataire> {
    return this._prisma.destinataire.delete({
      where: { id }
    })
  }
}
