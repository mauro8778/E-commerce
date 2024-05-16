
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion011714154926514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'UPDATE "users" SET "IsAdmin" = true WHERE "id" = $1',
            ['36fa8d4d-4a2c-4f89-af99-31f67668acff'] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          'UPDATE "users" SET "IsAdmin" = false WHERE "id" = $1',
           ['36fa8d4d-4a2c-4f89-af99-31f67668acff'] 
        );
    }

}
