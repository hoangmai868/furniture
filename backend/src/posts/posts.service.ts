import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: ['author']
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true };
  }
}
