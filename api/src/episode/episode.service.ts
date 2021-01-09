import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Episode } from '@prisma/client';

@Injectable()
export class EpisodeService {
  constructor(private prisma: PrismaService) {}

  async episode(
    episodeWhereUniqueInput: Prisma.EpisodeWhereUniqueInput,
  ): Promise<Episode | null> {
    return this.prisma.episode.findUnique({
      where: episodeWhereUniqueInput,
    });
  }

  async episodes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EpisodeWhereUniqueInput;
    where?: Prisma.EpisodeWhereInput;
    orderBy?: Prisma.EpisodeOrderByInput;
  }): Promise<Episode[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.episode.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createEpisode(data: Prisma.EpisodeCreateInput): Promise<Episode> {
    return this.prisma.episode.create({ data });
  }

  async updateEpisode(params: {
    where: Prisma.EpisodeWhereUniqueInput;
    data: Prisma.EpisodeUpdateInput;
  }): Promise<Episode> {
    const { where, data } = params;

    return this.prisma.episode.update({
      data,
      where,
    });
  }

  async deleteEpisode(where: Prisma.EpisodeWhereUniqueInput): Promise<Episode> {
    return this.prisma.episode.delete({ where });
  }
}
