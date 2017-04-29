const Comment = require('mongoose').model('Comment');
const Article = require('mongoose').model('Article');

module.exports = {
    createGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article => {
            res.render('comment/create', article)
        });
    },

    createPost: (req, res) => {
        let commentArgs = req.body;

        let errorMsg = '';
        if (!commentArgs.fullName){
            errorMsg = 'Invalid full name!';
        } else if (!commentArgs.content){
            errorMsg = 'Invalid content!';
        }

        if (errorMsg) {
            res.render('comment/create', {error: errorMsg});
            return;
        }

        commentArgs.article = req.params.id;
        let articleId = req.params.id;

        Comment.create(commentArgs).then(comment => {
            Article.findById(articleId).then(article => {
                article.comments.push(comment.id);
                article.save(err => {
                    if (err) {
                        res.redirect('/', {error: err.message});
                    } else {
                        res.redirect(`/article/details/${article.id}`);
                    }
                })
            })
        });
    },
};