const {assert} = require('chai');
const request = require('supertest');
const { parseTextFromHTML, buildVideoObject, seedDatabase } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-utils');

// import model
const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe('GET', () => {
        it('renders existing videos', async () => {
            // setup : add model to db.
            const newVideo = buildVideoObject();
            const createVideo = await request(app)
                .post('/videos')
                .type('form')
                .send(newVideo);

            // exercise, req '/'
            const response = await request(app)
                .get('/');

            // verify renders video.
            assert.include(parseTextFromHTML(response.text, 'div#videos-container'), newVideo.title);
        });
    });
});

describe('Server path: /videos', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe('POST', () => {
        it('redirects to new video page after creation', async () => {
            const videoToCreate = buildVideoObject();

            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(videoToCreate);

            assert.equal(response.status, 302);
        });
        
        it('renders newly created video', async () => {
            const videoToCreate = buildVideoObject();
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(videoToCreate);

            const videoSaved = await Video.findOne({});

            assert.isOk(videoSaved, 'Video was not saved in the database');
            assert.include(response.text, videoToCreate.title);
            assert.include(response.text, videoToCreate.description);
        });

        it('does not save video when title is missing', async () => {
            const invalidVideoToCreate = {
                title: '',
                description: 'test'
            };

            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(invalidVideoToCreate);

            const videoSaved = await Video.findOne({}); // nothing in db = null.

            assert.isNotOk(videoSaved, 'Video was saved in the database');
        })
        
        it('returns 400 when title is missing', async () => {
            const invalidVideoToCreate = {
                title: '',
                description: 'test'
            };
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(invalidVideoToCreate);
            
            assert.equal(response.status, 400);
        });
        
        /* it('renders video form when title is missing', async () => {
            const invalidVideoToCreate = {
                title: '',
                description: 'test'
            };

            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(invalidVideoToCreate);

            const allVideos = await Video.find({});

            assert.equal(allVideos.length, 0);
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'body'), 'Path `title` is required');
        }); */

        it('preserves other field values when title is missing', async () => {
            const invalidVideoToCreate = {
                title: '',
                description: 'Just the most awesome video on earth'
            };

            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(invalidVideoToCreate);

            const allVideos = await Video.find({});

            assert.equal(allVideos.length, 0);
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'body'), 'Path `title` is required');
            assert.include(parseTextFromHTML(response.text, 'body'), invalidVideoToCreate.description);
        });

        it('video document has a URL field', async ()=> {
            const title = 'My favorite video';
            const description = 'Just the best vid on earth';
            const url = 'https://www.youtube.com/watch?v=4VzuOWy6-Jc';
            const video = await Video.create({ title, description, url });

            assert.equal(video.title, title);
            assert.equal(video.description, description);
            assert.equal(video.url, url);
        });
    });
});

describe('Server path: /videos/:id', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);
    describe('GET', () => {
        it('renders requested video by id', async () => {
            // Setup
            const video = await seedDatabase();
            
            // Exercise
            const response = await request(app)
                .get('/videos/' + video.id)

            // Verify
            assert.equal(response.status, 200);
            assert.include(response.text, video.title);
            assert.include(response.text, video.url)
        })
    })
});