import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const result = await this.postRepository.update(id, updatePostDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
