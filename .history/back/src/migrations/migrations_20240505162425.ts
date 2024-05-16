import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion011714154926514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<bo> {
        await queryRunner.query(
            'UPDATE "users" SET "admin" = true WHERE "id" = :userId',
            { userId: 'ID_DEL_USUARIO_A_MODIFICAR' }
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'UPDATE "users" SET "admin" = false WHERE "id" = :userId',
            { userId: 'ID_DEL_USUARIO_A_MODIFICAR' }
        );
    }

}
