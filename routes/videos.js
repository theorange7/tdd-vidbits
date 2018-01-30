const router = require('express').Router();

// import model
const Video = require('../models/video');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/videos/create', async (req, res, next) => {
    res.render('create');
});

router.post('/videos', async (req, res, next) => {
    const {title, description} = req.body;
    const newVideo = new Video({ title, description });
    const video = await newVideo.save(); 
    
    res.status(201).render('show', {video});
});

module.exports = router;