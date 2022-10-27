import {MigrationInterface, QueryRunner} from "typeorm";

export class addTokensTable1666802795544 implements MigrationInterface {
    name = 'addTokensTable1666802795544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tokens" ("id" character varying NOT NULL DEFAULT '7ebe02d1-6578-4f2f-a644-bf9e3be762a8', "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "created_at" bigint NOT NULL DEFAULT '1666802798411', CONSTRAINT "PK_47b543436b0189860e4e01c7e14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UNIQUE_ACCESS" ON "Tokens" ("access_token") `);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT '3339d1da-5c91-4f54-a836-42ee3806a586'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT 'f3de3b11-7780-4ac8-a981-8744441b0340'`);
        await queryRunner.query(`DROP INDEX "public"."UNIQUE_ACCESS"`);
        await queryRunner.query(`DROP TABLE "Tokens"`);
    }

}
