import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginRequest } from './request/login.request';
import { LoginResponse } from './response/login.response';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequest } from './request/register.request';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) {}

    async login(request: LoginRequest): Promise<LoginResponse> {
        const foundUser: Users = await this.find(request.username);

        if (!foundUser) {
            throw new UnauthorizedException("Username or Password is not match");
        }

        const valid = await bcrypt.compare(request.password, foundUser.password);

        if (!valid) {
            throw new UnauthorizedException("Username or Password is not match");
        }

        const token = await this.signToken(foundUser.username);

        return {
            token
        };
    }

    async register(request: RegisterRequest): Promise<void> {
        const foundUser: Users = await this.usersRepository.findOneBy({
            username: request.username
        });

        if (foundUser != null) {
            throw new BadRequestException("User had been exist.");
        }

        const encryptedPassword = await bcrypt.hash(request.password, 10);

        const newUser = new Users();

        newUser.name = request.name;
        newUser.password = encryptedPassword;
        newUser.username = request.username;

        await this.usersRepository.insert(newUser);
    }

    async find(username: string): Promise<Users> | undefined {
        const foundUser: Users = await this.usersRepository.findOneBy({
            username: username
        });
        
        if (!foundUser) {
            return null;
        }

        return foundUser
    }

    private async signToken(username: string): Promise<string> {
        const token = await this.jwtService.signAsync({
            username: username
        });

        return token;
    }
}
