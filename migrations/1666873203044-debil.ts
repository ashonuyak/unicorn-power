import {MigrationInterface, QueryRunner} from "typeorm";

export class debil1666873203044 implements MigrationInterface {
    name = 'debil1666873203044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT 'debb3e44-34f8-4770-bc76-dcddc6199abf'`);
        await queryRunner.query(`ALTER TABLE "Tokens" ALTER COLUMN "id" SET DEFAULT '1e164459-cef0-43a2-8862-02543e63870b'`);
        await queryRunner.query(`ALTER TABLE "Tokens" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "Tokens" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tokens" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "Tokens" ADD "created_at" bigint NOT NULL DEFAULT '1666802798411'`);
        await queryRunner.query(`ALTER TABLE "Tokens" ALTER COLUMN "id" SET DEFAULT '7ebe02d1-6578-4f2f-a644-bf9e3be762a8'`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT '3339d1da-5c91-4f54-a836-42ee3806a586'`);
    }

}
