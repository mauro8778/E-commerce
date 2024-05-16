
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion011714154926514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'UPDATE "users" SET "IsAdmin" = true WHERE "id" = $1',
            ['2f0ceb4b-d03b-4d5b-9c44-f5c6ac0bfcc8'] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          'UPDATE "users" SET "IsAdmin" = false WHERE "id" = $1',
           ['2f0ceb4b-d03b-4d5b-9c44-f5c6ac0bfcc8'] 
        );
    }

}
