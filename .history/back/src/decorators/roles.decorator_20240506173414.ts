import { SetMetadata } from "@nestjs/common";
import { Role } from "../Users/user.enum";

export const Roles =(...Rol: Role[])=>SetMetadata('roles',Rol);