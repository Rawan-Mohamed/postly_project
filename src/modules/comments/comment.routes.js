import express from 'express';
import { 
    addComment, 
    getAllComments, 
    getCommentById, 
    getPostComments, 
    getUserComments, 
    updateComment, 
    deleteComment 
} from './comment.controller.js';

const commentRouter = express.Router();

// Add a new comment
commentRouter.post('/', addComment);

// Get all comments
commentRouter.get('/', getAllComments);

// Get comment by ID
commentRouter.get('/:id', getCommentById);

// Get comments by post ID
commentRouter.get('/post/:postId', getPostComments);

// Get comments by user ID
commentRouter.get('/user/:userId', getUserComments);

// Update comment
commentRouter.put('/:id', updateComment);

// Delete comment
commentRouter.delete('/:id', deleteComment);

export { commentRouter }; 