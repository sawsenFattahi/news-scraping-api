import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticlesTable1739321392350 implements MigrationInterface {
    name = 'CreateArticlesTable1739321392350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`link\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`link\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`source\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`source\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`publishedAt\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`publishedAt\` date NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_3c28437db9b5137136e1f6d609\` ON \`articles\` (\`title\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_cefee0e30c1d698be60cb693da\` ON \`articles\` (\`source\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_3ea038c4c5fe92c259f97356f7\` ON \`articles\` (\`publishedAt\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_68a0344882124db8a030cfd1f5\` ON \`articles\` (\`title\`, \`source\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_68a0344882124db8a030cfd1f5\` ON \`articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_3ea038c4c5fe92c259f97356f7\` ON \`articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_cefee0e30c1d698be60cb693da\` ON \`articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c28437db9b5137136e1f6d609\` ON \`articles\``);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`publishedAt\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`publishedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`source\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`source\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`link\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`link\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`created_at\``);
    }

}
