import Comment from './comment.model.js';

const addComment = async (req, res, next) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ message: 'Error adding comment' });
    }
};

const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().populate('user_id', 'name email').populate('post_id', 'title');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Get all comments error:', error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
};

const getCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('post_id', 'title');
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        console.error('Get comment by id error:', error);
        res.status(500).json({ message: 'Error fetching comment' });
    }
};

const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post_id: req.params.postId })
            .populate('user_id', 'name email')
            .populate('post_id', 'title');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Get post comments error:', error);
        res.status(500).json({ message: 'Error fetching post comments' });
    }
};

const getUserComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ user_id: req.params.userId })
            .populate('user_id', 'name email')
            .populate('post_id', 'title');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Get user comments error:', error);
        res.status(500).json({ message: 'Error fetching user comments' });
    }
};

const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        console.error('Update comment error:', error);
        res.status(500).json({ message: 'Error updating comment' });
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({ message: 'Error deleting comment' });
    }
};

export { 
    addComment, 
    getAllComments, 
    getCommentById, 
    getPostComments, 
    getUserComments, 
    updateComment, 
    deleteComment 
}; 