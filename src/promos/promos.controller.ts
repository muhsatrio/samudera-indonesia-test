import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PromosPath } from './const/path';
import { PromosService } from './promos.service';

@Controller(PromosPath.PROMOS)
export class PromosController {
    constructor(
        private readonly promosService: PromosService
    ) {}

    @Post("seed")
    @HttpCode(201)
    async seed() {
        await this.promosService.seed();

        return null;
    }

    @Get()
    @HttpCode(200)
    async get() {
        return this.promosService.get();
    }
}
