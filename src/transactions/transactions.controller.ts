import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionVO } from './vo/transaction.vo';
import { CheckoutRequest } from './request/checkout.request';
import { Request } from 'express';
import { TransactionsPath } from './const/path';

@Controller(TransactionsPath.TRANSACTIONS)
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService
    ) {}

    @Post("checkout")
    @HttpCode(200)
    async checkout(@Req() req: Request, @Body() request: CheckoutRequest): Promise<TransactionVO> {
        const result: TransactionVO = await this.transactionsService.checkout(request, req.cookies["username"])

        return result;
    }
}
