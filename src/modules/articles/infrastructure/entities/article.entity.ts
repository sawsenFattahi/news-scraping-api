import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
@Index(['title', 'source'])
export default class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Index()
  title: string;

  @Column('text', { nullable: true })
  link: string;

  @Column({ length: 100, nullable: true })
  @Index()
  source: string;

  @Column('date', { nullable: true })
  @Index()
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
