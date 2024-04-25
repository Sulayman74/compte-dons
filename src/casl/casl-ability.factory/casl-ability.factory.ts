import {
  AbilityBuilder,
  InferSubjects,
  PureAbility,
  createMongoAbility,
} from '@casl/ability';

import { Action } from '@prisma/client';
import { Archive } from 'src/resources/archives/entities/archive.entity';
import { Destinataire } from 'src/resources/destinataires/entities/destinataire.entity';
import { Donation } from 'src/resources/donations/entities/donation.entity';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { User } from '../../resources/users/entities/user.entity';

type Subjects =
  | InferSubjects<typeof User | typeof Donation | typeof Archive>
  | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.role === Role.ADMIN) {
      can(Action.MANAGE, 'all', 'all');
    } else {
      can(Action.READ, Donation, 'all');
      can(Action.UPDATE, User, { id: user.id });
    }

    cannot(Action.DELETE, Donation, { archived: true });
    cannot(Action.DELETE, Destinataire);
    return build();
  }
}

