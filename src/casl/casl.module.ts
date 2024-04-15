import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { Module } from '@nestjs/common';

@Module({
    exports:[CaslAbilityFactory],
    providers:[CaslAbilityFactory]
})
export class CaslModule {}
