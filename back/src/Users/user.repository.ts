import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './user.enum';



@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async getUserRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    if (!page || !limit) {
      page = 1;
      limit = 5;
    }

    const users = await this.userRepository.find({
      skip: start,
      take: limit,
      select: ['id', 'name', 'email', 'address', 'phone', 'country', 'city', 'role'],
      relations: ['order']
    });
    if (users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios');
    }
    return users;
  }

  async getUserRepositoryById(id: string, relations: string[] = []) {

    const user = await this.userRepository.findOne(
      {
        where: { id },
        relations: [...relations, 'order'],
        select: ['id', 'name', 'email', 'address', 'phone', 'country', 'city']
      });

    if (!user) {
      throw new NotFoundException('no se encontro el usuario')
    }
    return user;
  };
  async createRepository(userRepository: Partial<UserEntity>) {
    const newUser = this.userRepository.create(userRepository);
    return await this.userRepository.save(newUser);
  }
  async updateUsersRepository(id: string, update: Partial<UserEntity>) {
    const updateUser = await this.userRepository.findOne({ where: { id } });
    if (!updateUser) {

      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    await this.userRepository.merge(updateUser, update);
    await this.userRepository.save(updateUser);

    return ` el usuario con id ${id}  y nombre ${updateUser.name} se ah actualizado con exito`;
  }
  async deleteUsersRepository(id: string) {
    const deleteUser = await this.userRepository.findOne({ where: { id } })
    if (!deleteUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    await this.userRepository.delete(id);
    return `usuario con id ${id} y nombre ${deleteUser.name} se ah eliminado con exito`;
  }
  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
  async Admin(id: string) {

    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }


    if (user.role === Role.user) {

      user.role = Role.admin;

      await this.userRepository.save(user);
    }

    return user;
  }
}
