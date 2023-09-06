import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1693962677709 implements MigrationInterface {
    name = 'InitialSchema1693962677709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`events\` DROP COLUMN \`start_time\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`events\`
            ADD \`start_time\` timestamp NOT NULL COMMENT '開始日時'
        `);
        await queryRunner.query(`
            ALTER TABLE \`events\` DROP COLUMN \`end_time\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`events\`
            ADD \`end_time\` timestamp NOT NULL COMMENT '終了日時'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`events\` DROP COLUMN \`end_time\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`events\`
            ADD \`end_time\` datetime NOT NULL COMMENT '終了日時'
        `);
        await queryRunner.query(`
            ALTER TABLE \`events\` DROP COLUMN \`start_time\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`events\`
            ADD \`start_time\` datetime NOT NULL COMMENT '開始日時'
        `);
    }

}
