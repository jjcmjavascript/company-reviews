import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { DislikeCreateRepository } from './repositories/dislike-create.repository';
import { DislikeFindRepository } from './repositories/dislike-find.repository';
import { DislikeDestroyRepository } from './repositories/dislike-destroy.repository';
import { LikeCreateRepository } from './repositories/like-create.repository';
import { LikeFindRepository } from './repositories/like-find.repository';
import { LikeDestroyRepository } from './repositories/like-destroy.repository';
import { LikeCreateService } from './services/like-create.service';
import { DislikeCreateService } from './services/dislike-create.service';
import { LikeDislikeController } from './like-dislike.controller';
import { LikeFindAllRepository } from './repositories/like-find-all.repository';
import { DislikeFindAllRepository } from './repositories/dislike-find-all.repository';

@Module({
  imports: [PrismaModule],
  controllers: [LikeDislikeController],
  providers: [
    DislikeCreateRepository,
    DislikeFindRepository,
    DislikeDestroyRepository,
    DislikeCreateService,
    DislikeFindAllRepository,
    LikeCreateRepository,
    LikeFindRepository,
    LikeDestroyRepository,
    LikeCreateService,
    LikeFindAllRepository,
  ],
  exports: [],
})
export class LikeDislikeModule {
  constructor() {}
}
