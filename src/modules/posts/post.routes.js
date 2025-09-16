import express from 'express';
import {
  addPost,
  getAllPosts,
  getPostById,
  getUserPosts,
  updatePost,
  deletePost
} from './post.controller.js';
import { authenticateToken } from '../../middleware/auth.js';

let postRouter = express.Router();

postRouter.post('/', authenticateToken, addPost); // Add post (protected)
postRouter.get('/', getAllPosts); // Get all posts
postRouter.get('/:id', getPostById); // Get single post by id
postRouter.get('/user/:userId', getUserPosts); // Get all posts by user
postRouter.put('/:id', authenticateToken, updatePost); // Update post (protected)
postRouter.delete('/:id', authenticateToken, deletePost); // Delete post (protected)

export { postRouter };

