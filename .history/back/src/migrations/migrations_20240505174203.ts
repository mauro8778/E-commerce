
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion011714154926514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'UPDATE "users" SET "Isadmin" = true WHERE "id" = $1',
            ['fe890b25-e6bd-4285-8dbb-5a6e5459cf0d'] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          'UPDATE "users" SET "Isadmin" = true WHERE "id" = $1',
           ['fe890b25-e6bd-4285-8dbb-5a6e5459cf0d'] 
        );
    }

}
