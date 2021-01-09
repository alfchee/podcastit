import { Controller,Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { Prisma, Episode as EpisodeModel } from '@prisma/client';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get(':id')
  async getEpisodeById(@Param('id') id: string): Promise<EpisodeModel> {
    return this.episodeService.episode({ id: Number(id) });
  }

  @Post()
  async createEpisode(
    @Body() data: Prisma.EpisodeCreateInput
  ): Promise<EpisodeModel> {
    return this.episodeService.createEpisode(data);
  }

  @Put(':id')
  async updateEpisode(
    @Param('id') id: string,
    @Body() data: Prisma.EpisodeUpdateInput
  ): Promise<EpisodeModel> {
    return this.episodeService.updateEpisode({
      where: { id: Number(id) },
      data
    });
  }

  @Delete('id')
  async deleteEpisode(@Param('id') id: string): Promise<EpisodeModel> {
    return this.episodeService.deleteEpisode({ id: Number(id) });
  }
}
