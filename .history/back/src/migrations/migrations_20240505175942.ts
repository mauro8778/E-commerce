
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion011714154926514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'UPDATE "users" SET "IsAdmin" = true WHERE "id" = $1',
            ['baaa8abe-25d9-4821-9d99-7b176cce1906'] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          'UPDATE "users" SET "IsAdmin" = false WHERE "id" = $1',
           ['baaa8abe-25d9-4821-9d99-7b176cce1906'] 
        );
    }

}
