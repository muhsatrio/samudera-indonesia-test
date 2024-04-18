import { IsNotEmpty } from "class-validator";

export class RegisterRequest {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    name: string;
}