import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Podcast } from '@prisma/client';

@Injectable()
export class PodcastService {
  constructor(private prisma: PrismaService) {}

  async podcast(
    podcastWhereUniqueInput: Prisma.PodcastWhereUniqueInput,
  ): Promise<Podcast | null> {
    return this.prisma.podcast.findUnique({
      where: podcastWhereUniqueInput,
    });
  }

  async podcasts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PodcastWhereUniqueInput;
    where?: Prisma.PodcastWhereInput;
    orderBy?: Prisma.PodcastOrderByInput;
  }): Promise<Podcast[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.podcast.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPodcast(data: Prisma.PodcastCreateInput): Promise<Podcast> {
    return this.prisma.podcast.create({ data });
  }

  async updatePodcast(params: {
    where: Prisma.PodcastWhereUniqueInput;
    data: Prisma.PodcastUpdateInput;
  }): Promise<Podcast> {
    const { where, data } = params;

    return this.prisma.podcast.update({ data, where });
  }

  async deletePodcast(where: Prisma.PodcastWhereUniqueInput): Promise<Podcast> {
    return this.prisma.podcast.delete({ where });
  }
}
