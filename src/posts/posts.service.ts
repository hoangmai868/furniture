import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({
      where: { slug: createPostDto.slug }
    });

    if (existingPost) {
      throw new ConflictException('Slug bài viết đã tồn tại');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      stats: createPostDto.stats || { views: 0, likes: 0, shares: 0 }
    });
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author']
    });
    if (!post) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    if (updatePostDto.slug && updatePostDto.slug !== post.slug) {
      const existingPost = await this.postsRepository.findOne({
        where: { slug: updatePostDto.slug }
      });
      if (existingPost) {
        throw new ConflictException('Slug bài viết đã tồn tại');
      }
    }

    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}
