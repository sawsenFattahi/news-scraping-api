import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('articles')
@Index(['title', 'source']) // Index composite pour des performances optimales
export default class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Index() // Index individuel sur le titre
  title: string;

  @Column('text', { nullable: true })
  link: string;

  @Column({ length: 100, nullable: true })
  @Index() // Index individuel sur la source
  source: string;

  @Column('date', { nullable: true })
  @Index() // Index sur la date
  publishedAt: Date;

  @CreateDateColumn()
  created_at: Date;
}
