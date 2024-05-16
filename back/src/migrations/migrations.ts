
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion011714154926514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'UPDATE "users" SET "role" = \'sadmin\' WHERE "id" = $1',
            ['235abd81-069d-4dd8-97cd-3c907a3a202f'] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          'UPDATE "users" SET "role" =  \'user\' WHERE "id" = $1',
           ['235abd81-069d-4dd8-97cd-3c907a3a202f'] 
        );
    }

}
