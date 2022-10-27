import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1666785735530 implements MigrationInterface {
    name = 'initial1666785735530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" character varying NOT NULL DEFAULT 'f3de3b11-7780-4ac8-a981-8744441b0340', "account_id" character varying NOT NULL, "password" character varying NOT NULL, "id_type" character varying NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UNIQUE_ID" ON "User" ("account_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."UNIQUE_ID"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
