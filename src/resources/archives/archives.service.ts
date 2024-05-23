import { Cron, CronExpression } from '@nestjs/schedule';

import { CreateArchiveDto } from './dto/create-archive.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateArchiveDto } from './dto/update-archive.dto';

@Injectable()
export class ArchivesService {

  constructor(private _prisma: PrismaService) { }

  async archiveDonations(): Promise<void> {
    try {

      // Obtenez la date actuelle moins un an
      const dateLimite = new Date();
      dateLimite.setFullYear(dateLimite.getFullYear() - 1);

      // Récupérer les donations à archiver
      const donationsAarchiver = await this._prisma.donation.findMany({
        where: {
          createdAt: { lte: dateLimite },
          // Vous pouvez ajouter d'autres conditions si nécessaire
        },
      });

      // Archiver les donations et créer les entrées dans la table Archives
      const archivePromises = donationsAarchiver.map(async (donation) => {
        // Archiver la donation
        await this._prisma.donation.update({
          where: { id: donation.id },
          data: { archived: true },
        });

        // Créer une entrée dans la table Archives
        return this._prisma.archive.create({
          data: {
            archivedAt: new Date(), // Utilisez la date actuelle comme archivedAt dans la table Archives
            donations: { connect: { id: donation.id } }, // Liez la donation à la table Archives
          },
        });
      });

      // Attendre que toutes les opérations d'archivage et de création dans la table Archives soient terminées
      await Promise.all(archivePromises);



      // Archiver les donations
      // for (const donation of donationsAarchiver) {
      //   await this._prisma.donation.update({
      //     where: { id: donation.id },
      //     data: { archived: true },
      //   });
      // }

      console.log(`${donationsAarchiver.length} donations ont été archivées.`);

    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'archivage des donations :', error);
    }
  }

  // ? Ceci est une tâche cron executer sur mon backend directement ** //

  @Cron(CronExpression.EVERY_WEEKEND)
  async handleDonationArchiving(): Promise<void> {
    try {
      this.archiveDonations()
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'archivage des donations :', error);
    }
  }

// TODO je vais créer un fichier séparé pour la tâche cron afin de permettre de planifier cette tâche via le serveur (infomaniak en l'occurence) dans utils sous le nom archive-donation-task.js *** //

  create(createArchiveDto: CreateArchiveDto) {
    return 'This action adds a new archive';
  }

  findAll() {
    return `This action returns all archives`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archive`;
  }

  update(id: number, updateArchiveDto: UpdateArchiveDto) {
    return `This action updates a #${id} archive`;
  }

  remove(id: number) {
    return `This action removes a #${id} archive`;
  }
}
