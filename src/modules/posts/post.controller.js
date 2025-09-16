import Post from './post.model.js';

const addPost = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json({ message: 'Post added successfully', post });
    } catch (error) {
        console.error('Add post error:', error);
        res.status(500).json({ message: 'Error adding post' });
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('user_id', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Get all posts error:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('user_id', 'name email');
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Get post by id error:', error);
        res.status(500).json({ message: 'Error fetching post' });
    }
};

const getUserPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ user_id: req.params.userId }).populate('user_id', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({ message: 'Error fetching user posts' });
    }
};

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Update post error:', error);
        res.status(500).json({ message: 'Error updating post' });
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
};

export { addPost, getAllPosts, getPostById, getUserPosts, updatePost, deletePost };

