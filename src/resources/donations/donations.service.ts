import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Injectable()
export class DonationsService {
  constructor(private _prismaService: PrismaService) {}

  async create(
    createDonationDto: CreateDonationDto,
    userId: string,
  ): Promise<Donation> {
    try {
      const addDon = await this._prismaService.donation.create({
        data: {
          ...createDonationDto,
          user: { connect: { id: userId } },
        },
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
        orderBy: { createdAt: 'asc' },
      });
      if (AllDons.length == 0) throw new NotFoundException('Aucun don trouvé');
      return AllDons;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Donation> {
    try {
      const findDon = await this._prismaService.donation.findUniqueOrThrow({
        where: { id },
      });

      return findDon;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(
    id: string,
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {
    try {
      const updateDon = await this._prismaService.donation.update({
        where: { id },
        data: updateDonationDto,
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
