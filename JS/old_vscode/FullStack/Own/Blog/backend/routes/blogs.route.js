const router = require('express').Router();
const Blog = require('../models/blog.model')



router.get('/', async (req, res) => {

    // const blogs = await Blog.find();
    // if (blogs.length < 1) {
    //     return res.send('No blogs available...')
    // }

    const BLOGS = new Array(100).fill({
        writer: {
            username: 'Richard',
            id: 1
        },
        title: 'Test Title',
        body: 'Test Body',
        comments: ['this is amazing!'],
        likes: 12,
        createdDate: new Date()
    })


    res.send(BLOGS)

});

router.get('/:id', getBlogById, (req, res) => {

    res.send(req.middleware.blog)
})

router.post('/add', async (req, res) => {
    const { writer, title, body } = req.body;


    const newBlog = new Blog({ writer, title, body })

    newBlog.save()
        .then(() => res.send('Blog Saved!'))
        .catch(err => console.log(err))
})

router.delete('/:id', getBlogById, async (req, res) => {
    try {
        await req.middleware.blog.remove();
        res.send('Blog Deleted!')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})



async function getBlogById(req, res, next) {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(400).send('Cannot find Blog')
    }
    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send('Cannot find Blog')
        }
        req.middleware = { blog };
        next();

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }

}


module.exports = router;