import { Controller, Injectable } from "@nestjs/common";

@Controller('auth')
export class authController{
    constructor(private readonly authServices:authServices);

}