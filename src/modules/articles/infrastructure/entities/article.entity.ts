import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
@Index(['title', 'source'])
export default class Article {
  @ApiProperty({ description: 'Unique ID of the article' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Title of the article' })
  @Column({ length: 255 })
  @Index()
  title: string;

  @ApiProperty({ description: 'Link to the article' })
  @Column('text', { nullable: true })
  link: string;

  @ApiProperty({ description: 'Source of the article' })
  @Column({ length: 100, nullable: true })
  @Index()
  source: string;

  @ApiProperty({ description: 'Date when the article was published' })
  @Column('date', { nullable: true })
  @Index()
  publishedAt: Date;

  @ApiProperty({ description: 'Date when the article was created' })
  @CreateDateColumn()
  createdAt: Date;
}
