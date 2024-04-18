import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { UsersPath } from './const/users.path';
import { LoginRequest } from './request/login.request';
import { UsersService } from './users.service';
import { RegisterRequest } from './request/register.request';
import { LoginResponse } from './response/login.response';
import { Request, Response } from 'express';

@Controller(UsersPath.USERS)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Post("login")
    @HttpCode(200)
    async login(@Body() request: LoginRequest, @Res({passthrough: true}) response: Response): Promise<LoginResponse> {
        const result: LoginResponse = await this.usersService.login(request);

        response.cookie("token", result.token);
        response.cookie("username", request.username);

        return result;
    }

    @Post("register")
    @HttpCode(201)
    async register(@Body() request: RegisterRequest) {
        await this.usersService.register(request);

        return null;
    }
}
