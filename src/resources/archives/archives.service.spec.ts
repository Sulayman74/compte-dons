import { Test, TestingModule } from '@nestjs/testing';

import { ArchivesService } from './archives.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

describe('ArchivesService', () => {
  let service: ArchivesService;
  let _prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [ArchivesService, PrismaService],
    }).compile();

    service = module.get<ArchivesService>(ArchivesService);
    _prisma = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should archive donations', async () => {
    // Mock PrismaService
    const mockPrismaService = {
      getDonationsToArchive: jest.fn().mockResolvedValue([
        // Mockez des données de donations à archiver
        { id: 1, amount: 100, created_at: new Date('2023-01-01') },
        { id: 2, amount: 150, created_at: new Date('2023-02-01') },
        // Ajoutez d'autres donations à archiver selon vos besoins
      ]),

      updateArchivedDonations: jest.fn().mockImplementation(async (donations) => {
        try {
          // Parcourez chaque donation
          for (const donation of donations) {
            // Supposons que `prisma` est votre service Prisma
            // Mettez à jour la donation pour la marquer comme archivée
            await _prisma.donation.update({
              where: { id: donation.id },
              data: { archived: true },
            });
          }

          // Retournez une promesse résolue
          return Promise.resolve();
        } catch (error) {
          // En cas d'erreur, lancez une exception ou retournez une promesse rejetée
          throw new Error('Une erreur est survenue lors de la mise à jour des donations archivées');
        }
      }),


    }

    // Injectez le service mock de PrismaService dans DonationArchivingService
    service['prisma'] = mockPrismaService as any;

    // Mock des données de donations à archiver
    const donationsToArchive = [
      { id: 1, amount: 100, created_at: new Date('2023-01-01') },
      { id: 2, amount: 150, created_at: new Date('2023-02-01') },
    ];

    // Mockez la méthode de PrismaService pour récupérer les donations à archiver
    jest.spyOn(mockPrismaService, 'getDonationsToArchive').mockResolvedValue(donationsToArchive);

    // Mockez la méthode de PrismaService pour mettre à jour les donations archivées
    jest.spyOn(mockPrismaService, 'updateArchivedDonations').mockResolvedValue(donationsToArchive);

    // Appelez la méthode archiveDonations() du service
    await service.archiveDonations();

    // Vérifiez que les méthodes de PrismaService ont été appelées avec les bonnes données
    expect(mockPrismaService.getDonationsToArchive).toHaveBeenCalled();
    expect(mockPrismaService.updateArchivedDonations).toHaveBeenCalledWith(donationsToArchive);
  });



});
