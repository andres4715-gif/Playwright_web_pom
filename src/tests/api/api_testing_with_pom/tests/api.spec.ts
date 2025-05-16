import { test, expect } from '@playwright/test';
import { JsonPlaceholderPage } from '../pages/jsonPlaceholderPage';
import { Post, User, Comment } from '../types/api.types';

let apiPage: JsonPlaceholderPage;

// Data test
const testPost: Post = {
  userId: 1,
  title: 'Test post title',
  body: 'This is a test post body created by Playwright',
};

const testUser: User = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  address: {
    street: 'Test Street',
    suite: 'Apt 123',
    city: 'Test City',
    zipcode: '12345-6789',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-234-567-8900',
  website: 'johndoe.example.com',
  company: {
    name: 'Test Company',
    catchPhrase: 'Testing is our business',
    bs: 'harness real-time e-markets',
  },
};

const testComment: Comment = {
  postId: 1,
  name: 'Test Comment',
  email: 'test@example.com',
  body: 'This is a test comment created by Playwright',
};

test.describe('JSONPlaceholder API Tests @API_Tests', () => {
  test.beforeAll(async () => {
    apiPage = new JsonPlaceholderPage();
    await apiPage.initialize();
  });

  test.describe('GET Endpoints', () => {
    test('should get all posts', async () => {
      const posts = await apiPage.getAllPosts();
      expect(posts).toBeInstanceOf(Array);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty('id');
      expect(posts[0]).toHaveProperty('title');
    });

    test('should get a single post by ID', async () => {
      const post = await apiPage.getPostById(1);
      expect(post).toHaveProperty('id', 1);
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
      expect(post).toHaveProperty('userId');
    });

    test('should get posts with full response details', async () => {
      const response = await apiPage.getPostsWithFullResponse();
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.headers).toHaveProperty('content-type');
    });

    test('should get all users', async () => {
      const users = await apiPage.getAllUsers();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
    });

    test('should get comments for a post', async () => {
      const comments = await apiPage.getCommentsByPostId(1);
      expect(comments).toBeInstanceOf(Array);
      expect(comments.length).toBeGreaterThan(0);
      expect(comments[0]).toHaveProperty('postId', 1);
      expect(comments[0]).toHaveProperty('email');
    });
  });

  test.describe('POST Endpoints', () => {
    test('should create a new post', async () => {
      const createdPost = await apiPage.createPost(testPost);
      expect(createdPost).toHaveProperty('id'); // JSONPlaceholder assign the id
      expect(createdPost.title).toBe(testPost.title);
      expect(createdPost.body).toBe(testPost.body);
      expect(createdPost.userId).toBe(testPost.userId);
    });

    test('should create a new user', async () => {
      const createdUser = await apiPage.createUser(testUser);
      expect(createdUser).toHaveProperty('id'); // JSONPlaceholder assign the id
      expect(createdUser.name).toBe(testUser.name);
      expect(createdUser.email).toBe(testUser.email);
    });

    test('should create a new comment', async () => {
      const createdComment = await apiPage.createComment(testComment);
      expect(createdComment).toHaveProperty('id'); // JSONPlaceholder assign the id
      expect(createdComment.name).toBe(testComment.name);
      expect(createdComment.email).toBe(testComment.email);
      expect(createdComment.body).toBe(testComment.body);
    });
  });

  test.describe('PUT Endpoints', () => {
    test('should update a post completely', async () => {
      const updatedPost: Post = {
        ...testPost,
        title: 'Updated title',
        body: 'This post has been updated',
      };

      const result = await apiPage.updatePost(1, updatedPost);
      expect(result.title).toBe(updatedPost.title);
      expect(result.body).toBe(updatedPost.body);
    });

    test('should update a user completely', async () => {
      const updatedUser: User = {
        ...testUser,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      };

      const result = await apiPage.updateUser(1, updatedUser);
      expect(result.name).toBe(updatedUser.name);
      expect(result.email).toBe(updatedUser.email);
    });
  });

  test.describe('PATCH Endpoints', () => {
    test('should partially update a post', async () => {
      const partialUpdate = {
        title: 'Partially updated title',
      };

      const result = await apiPage.partialUpdatePost(1, partialUpdate);
      expect(result.title).toBe(partialUpdate.title);
      // Map the rest of the fields
      expect(result).toHaveProperty('body');
      expect(result).toHaveProperty('userId');
    });

    test('should partially update a user', async () => {
      const partialUpdate = {
        email: 'newemail@example.com',
      };

      const result = await apiPage.partialUpdateUser(1, partialUpdate);
      expect(result.email).toBe(partialUpdate.email);
      expect(result).toHaveProperty('name');
    });
  });

  test.describe('DELETE Endpoints', () => {
    test('should delete a post', async () => {
      const result = await apiPage.deletePost(1);
      // JSONPlaceholder returns an object empty for deletion
      expect(result).toEqual({});
    });

    test('should delete a user', async () => {
      const result = await apiPage.deleteUser(1);
      // JSONPlaceholder returns an object empty for deletion
      expect(result).toEqual({});
    });
  });
});
