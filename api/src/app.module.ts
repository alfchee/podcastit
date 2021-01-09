import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { PodcastService } from './podcast/podcast.service';
import { EpisodeService } from './episode/episode.service';
import { PodcastController } from './podcast/podcast.controller';
import { EpisodeController } from './episode/episode.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, CategoryController, PodcastController, EpisodeController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    CategoryService,
    PodcastService,
    EpisodeService,
  ],
})
export class AppModule {}
