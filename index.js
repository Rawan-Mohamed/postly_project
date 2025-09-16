import dotenv from 'dotenv';
import express from 'express';
import dbConnection from './database/dbConnecation.js';
import { userRouter } from './src/modules/users/user.routes.js';
import { postRouter } from './src/modules/posts/post.routes.js';
import { commentRouter } from './src/modules/comments/comment.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Connect to database
dbConnection();

// Routes
app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});