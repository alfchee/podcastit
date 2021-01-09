import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Prisma, Category as CategoryModel } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.category({ id: Number(id) });
  }

  @Get()
  async getAllCategories(): Promise<CategoryModel[]> {
    return this.categoryService.categories({ skip: 0, take: 100 });
  }

  @Post()
  async createCategory(@Body() data: Prisma.CategoryCreateInput): Promise<CategoryModel> {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: Prisma.CategoryUpdateInput
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory({
      where: { id: Number(id) },
      data
    })
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.deleteCategory({ id: Number(id) })
  }
}
