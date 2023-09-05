import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1693923555496 implements MigrationInterface {
    name = 'InitialSchema1693923555496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`event_speaker\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ユーザー得意技術ID',
                \`created_at\` datetime(6) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(6),
                \`edit_at\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`event_id\` int UNSIGNED NULL COMMENT 'イベントID',
                \`user_id\` int UNSIGNED NULL COMMENT 'ユーザーID',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`reservations\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'イベント参加予約ID',
                \`created_at\` datetime(6) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(6),
                \`edit_at\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`user_id\` int UNSIGNED NULL COMMENT 'ユーザーID',
                \`event_id\` int UNSIGNED NULL COMMENT 'イベントID',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`events\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'イベントID',
                \`name\` varchar(256) NOT NULL COMMENT 'イベント名',
                \`start_time\` timestamp NOT NULL COMMENT '開始日時',
                \`end_time\` timestamp NOT NULL COMMENT '終了日時',
                \`location\` varchar(256) NOT NULL COMMENT '開催場所',
                \`description\` varchar(1024) NULL COMMENT 'イベント詳細',
                \`limitation\` int NULL COMMENT 'イベント詳細',
                \`record_url\` varchar(256) NULL COMMENT '資料URL',
                \`google_calender_event_id\` varchar(1024) NOT NULL COMMENT 'GoogleCalenderEventId',
                \`created_at\` datetime(6) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(6),
                \`edit_at\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`create_user_id\` int UNSIGNED NULL COMMENT 'ユーザーID',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`event_technology\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ユーザー得意技術ID',
                \`created_at\` datetime(6) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(6),
                \`edit_at\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`event_id\` int UNSIGNED NULL COMMENT 'イベントID',
                \`technology_id\` int UNSIGNED NULL COMMENT '技術ID',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`technologies\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '技術ID',
                \`name\` varchar(256) NOT NULL COMMENT '技術名',
                \`created_at\` datetime(6) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(6),
                \`edit_at\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_technology\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ユーザー得意技術ID',
                \`created_at\` datetime(6) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(6),
                \`edit_at\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`user_id\` int UNSIGNED NULL COMMENT 'ユーザーID',
                \`technology_id\` int UNSIGNED NULL COMMENT '技術ID',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ユーザーID',
                \`name\` varchar(256) NOT NULL COMMENT 'ユーザー名',
                \`email\` varchar(256) NOT NULL COMMENT 'メールアドレス',
                \`department\` varchar(256) NOT NULL COMMENT '部署',
                \`created_at\` datetime(6) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(6),
                \`edit_at\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_technology\`
        `);
        await queryRunner.query(`
            DROP TABLE \`technologies\`
        `);
        await queryRunner.query(`
            DROP TABLE \`event_technology\`
        `);
        await queryRunner.query(`
            DROP TABLE \`events\`
        `);
        await queryRunner.query(`
            DROP TABLE \`reservations\`
        `);
        await queryRunner.query(`
            DROP TABLE \`event_speaker\`
        `);
    }

}
