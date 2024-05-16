import { Controller, Get, Injectable } from "@nestjs/common";
import { authServices } from "./auth.services";

@Controller('auth')
export class authController {
    constructor(private readonly authServices: authServices) { }

    @Get()
    getServices(): string {

        return this.authServices.getServices();
    }

}