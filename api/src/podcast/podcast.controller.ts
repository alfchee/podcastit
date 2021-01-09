import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { Prisma, Podcast as PodcastModel } from '@prisma/client';

@Controller('podcast')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Get(':id')
  async getPodcastById(@Param('id') id: string): Promise<PodcastModel> {
    return this.podcastService.podcast({ id: Number(id) });
  }

  @Post()
  async createPodcast(
    @Body() data: Prisma.PodcastCreateInput
  ): Promise<PodcastModel> {
    return this.podcastService.createPodcast(data);
  }

  @Put(':id')
  async updatePodcast(
    @Param('id') id: string,
    @Body() data: Prisma.PodcastUpdateInput
  ): Promise<PodcastModel> {
    return this.podcastService.updatePodcast({
      where: { id: Number(id) },
      data
    });
  }
}
