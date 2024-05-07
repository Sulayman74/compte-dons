import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from "@prisma/client";

export class Archive implements Prisma.ArchiveCreateInput {
    id: number;

    @ApiProperty({ default: Date.now() })
    archivedAt: Date
    donations: any
}
