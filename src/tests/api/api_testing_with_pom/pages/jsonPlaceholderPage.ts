import { Post, User, Comment, ApiResponse } from '../types/api.types';
import { BasePage } from './basePage';

export class JsonPlaceholderPage extends BasePage {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  // Posts Endpoints
  async getAllPosts(): Promise<Post[]> {
    return this.get<Post[]>('/posts');
  }

  async getPostById(id: number): Promise<Post> {
    return this.get<Post>(`/posts/${id}`);
  }

  async getPostsWithFullResponse(): Promise<ApiResponse<Post[]>> {
    return this.getWithFullResponse<Post[]>('/posts');
  }

  async createPost(post: Post): Promise<Post> {
    return this.post<Post, Post>('/posts', post);
  }

  async updatePost(id: number, post: Post): Promise<Post> {
    return this.put<Post, Post>(`/posts/${id}`, post);
  }

  async partialUpdatePost(
    id: number,
    partialPost: Partial<Post>
  ): Promise<Post> {
    return this.patch<Post, Post>(`/posts/${id}`, partialPost);
  }

  async deletePost(id: number): Promise<{}> {
    return this.delete<{}>(`/posts/${id}`);
  }

  // Users Endpoints
  async getAllUsers(): Promise<User[]> {
    return this.get<User[]>('/users');
  }

  async getUserById(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }

  async createUser(user: User): Promise<User> {
    return this.post<User, User>('/users', user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    return this.put<User, User>(`/users/${id}`, user);
  }

  async partialUpdateUser(
    id: number,
    partialUser: Partial<User>
  ): Promise<User> {
    return this.patch<User, User>(`/users/${id}`, partialUser);
  }

  async deleteUser(id: number): Promise<{}> {
    return this.delete<{}>(`/users/${id}`);
  }

  // Comments Endpoints
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.get<Comment[]>(`/posts/${postId}/comments`);
  }

  async getAllComments(): Promise<Comment[]> {
    return this.get<Comment[]>('/comments');
  }

  async createComment(comment: Comment): Promise<Comment> {
    return this.post<Comment, Comment>('/comments', comment);
  }
}
