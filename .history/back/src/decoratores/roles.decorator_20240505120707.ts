import { SetMetadata } from "@nestjs/common";
import { Role } from "src/Users/user.enum";

export const Roles =(...Rol: Role[])=>SetMetadata('roles',Rol);