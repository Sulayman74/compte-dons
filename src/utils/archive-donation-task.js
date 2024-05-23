// archive-donations.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../app.module'); // Adjust the path as necessary
const { DonationsService } = require('../resources/donations/donations.service'); // Adjust the path as necessary

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const donationsService = app.get(DonationsService);

  try {
    await donationsService.archiveDonations();
    console.log('Donations have been successfully archived.');
  } catch (error) {
    console.error('An error occurred while archiving donations:', error);
  } finally {
    await app.close();
  }
}

bootstrap().catch(err => console.error('Error running task:', err));
