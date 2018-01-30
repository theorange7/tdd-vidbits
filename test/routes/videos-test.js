const {assert} = require('chai');
const request = require('supertest');
const { parseTextFromHTML, buildVideoObject } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-utils');

// import model
const Video = require('../../models/video');

const app = require('../../app');

// POST to create video

describe('Server path: /videos', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe('POST', () => {
        it('returns status code 201, video is created', async () => {
            const videoToCreate = buildVideoObject();

            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(videoToCreate);

            assert.equal(response.status, 201);
        });
        
        it('creates and stores a new video', async () => {
            const videoToCreate = buildVideoObject();
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(videoToCreate);

            const videoSaved = await Video.findOne({});

            assert.isOk(videoSaved, 'Video was not saved in the database');
            assert.include(response.text, videoToCreate.title);
            assert.include(response.text, videoToCreate.description);
        })
    });
})