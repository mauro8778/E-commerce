
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion011714154926514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'UPDATE "users" SET "IsAdmin" = true WHERE "id" = $1',
            ['e3261fcd-d4a6-4065-883a-0f3b6c709b12'] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          'UPDATE "users" SET "IsAdmin" = false WHERE "id" = $1',
           ['e3261fcd-d4a6-4065-883a-0f3b6c709b12'] 
        );
    }

}
