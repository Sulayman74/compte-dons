import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateArchiveDto } from './../archives/dto/update-archive.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Injectable()
export class DonationsService {
  constructor(private _prismaService: PrismaService) { }

  async create(
    createDonationDto: CreateDonationDto
  ): Promise<Donation> {

    try {
      console.log('Jalo je suis la nouvelle donation', createDonationDto);


      const addDon = await this._prismaService.donation.create({
        data: {
          ...createDonationDto,
        }

      });
      return addDon;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Une erreur est survenue lors de la création du don',
      );
    }
  }

  async findAll(): Promise<Donation[]> {
    try {
      const AllDons = await this._prismaService.donation.findMany({
        orderBy: { createdAt: 'asc' }, include: { user: true, destinataire: true }
      });
      if (AllDons.length == 0) {
        return []
      }
      return AllDons;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async findOne(id: string): Promise<Donation> {
    try {
      const findDon = await this._prismaService.donation.findUnique({
        where: { id },
      });

      return findDon;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByUserID(userId: string): Promise<Donation[]> {


    try {
      const findDonationByUser = await this._prismaService.donation.findMany({
        where: {
          userId,
        },
        include: { user: true, destinataire: true },

      });
      console.log(findDonationByUser);
      return findDonationByUser;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Une erreur est survenue lors de la recherche des dons par ID utilisateur.',
      );
    }
  }

  async update(
    id: string,
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {

    try {

      const destinataire = updateDonationDto.destinataire

      const updateDon = await this._prismaService.donation.update({
        where: { id },
        data: {
          ...updateDonationDto,
          destinataire: { connect: { id: destinataire.id } }

        },

      });

      return updateDon;
    } catch (error) {
      console.log(error);
      throw new NotFoundException("le don recherché n'a pas été trouvé");
    }
  }

  async remove(id: string): Promise<Donation> {
    try {
      const deleteDon = await this._prismaService.donation.delete({
        where: { id },
      });
      return deleteDon;
    } catch (error) {
      console.log(error);
      throw new NotFoundException("le don recherché n'a pas été trouvé");
    }
  }
}
