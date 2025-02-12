import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticlesTable1739352010456 implements MigrationInterface {
    name = 'CreateArticlesTable1739352010456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`link\` text NULL, \`source\` varchar(100) NULL, \`publishedAt\` date NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_3c28437db9b5137136e1f6d609\` (\`title\`), INDEX \`IDX_cefee0e30c1d698be60cb693da\` (\`source\`), INDEX \`IDX_3ea038c4c5fe92c259f97356f7\` (\`publishedAt\`), INDEX \`IDX_68a0344882124db8a030cfd1f5\` (\`title\`, \`source\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_68a0344882124db8a030cfd1f5\` ON \`articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_3ea038c4c5fe92c259f97356f7\` ON \`articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_cefee0e30c1d698be60cb693da\` ON \`articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c28437db9b5137136e1f6d609\` ON \`articles\``);
        await queryRunner.query(`DROP TABLE \`articles\``);
    }

}
