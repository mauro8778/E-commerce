"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../Users/user.repository");
const bcrypt = require("bcrypt");
const user_services_1 = require("../Users/user.services");
const jwt_1 = require("@nestjs/jwt");
let authServices = class authServices {
    constructor(userRepository, userservices, jwtservice) {
        this.userRepository = userRepository;
        this.userservices = userservices;
        this.jwtservice = jwtservice;
    }
    async SingUp(credential) {
        const { email, password } = credential;
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            throw new common_1.NotFoundException(`el mail ${email} ya existe`);
        }
        const hashedPassword = await bcrypt.hash(credential.password, 10);
        if (hashedPassword === credential.password) {
            throw new common_1.NotFoundException(`no se pudo hashear el password`);
        }
        const newUser = this.userRepository.createRepository({ ...credential, password: hashedPassword });
        return newUser;
    }
    async SingIn(credential) {
        const { email, password } = credential;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`el mail ${email} no existe`);
        }
        const ValidPassword = await bcrypt.compare(password, user.password);
        
        if (!ValidPassword) {
            throw new common_1.BadRequestException('credenciales incorrectas');
        }
        const userPayload = {
            id: user.id,
            email: user.email,
            isAdmin: user.IsAdmin
        };
        const token = this.jwtservice.sign(userPayload);
        return { message: 'usuario logueado', token };
    }
};
exports.authServices = authServices;
exports.authServices = authServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_services_1.userServices,
        jwt_1.JwtService])
], authServices);
//# sourceMappingURL=auth.services.js.map