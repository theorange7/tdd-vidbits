const router = require('express').Router();

// import model
const Video = require('../models/video');

router.get(['/videos', '/'], async(req, res, next) => {
    const videos = await Video.find({});
    res.render('videos/index', { videos });
})

router.get('/videos/create', (req, res, next) => {
    res.render('create');
});

router.get('/videos/:id', async (req, res, next) => {
    const video = await Video.findById(req.params.id);
    res.render('videos/show', { video });
})

router.get('/videos/:id/edit', async (req, res, next) => {
    const video = await Video.findById(req.params.id);
    res.render('videos/edit', { video });
})

router.post('/videos', async (req, res, next) => {
    const {title, description, url} = req.body;
    const video = new Video({ title, description, url});

    video.validateSync();
    if (video.errors) {
        res.status(400).render('create', { video });
    } else {
        await video.save();
        // res.redirect('/videos/' + video.id); this doesn't work... why?
        res.status(302).render('videos/show', { video });
    }
});

router.post('/videos/:id/updates', async (req, res, next) => {
    const { title, description, url } = req.body;
    let videoId = req.params.id;
    
    const video = await Video.findById(videoId);
    // copy - maintain original model data for edit form to render
    const copyVideo = JSON.parse(JSON.stringify(video)); // NOT a mongoose model!
    
    video.title = title;
    video.description = description;
    video.url = url;

    video.validateSync();
    if (video != null && !video.errors) {
        await video.save();
        res.redirect('/videos/' + videoId);
        //res.status(302).render('videos/show', { video: newVideo });
    } else {
        res.status(400).render('videos/edit', {video: copyVideo});
    }
});

router.post('/videos/:id/deletions', async (req, res, next) => {
    await Video.findByIdAndRemove(req.params.id);
    res.redirect('/');
})


module.exports = router;