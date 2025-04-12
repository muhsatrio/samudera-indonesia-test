import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ItemsPath } from './const/path';
import { ItemsService } from './items.service';

@Controller(ItemsPath.ITEMS)
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService
    ) {}

    @Post("seed")
    @HttpCode(201)
    async seed() {
        await this.itemsService.seed();

        return null;
    }

    @Get()
    @HttpCode(200)
    async get() {
        return this.itemsService.get();
    }
}
