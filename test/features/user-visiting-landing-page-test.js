const {assert} = require('chai');
const { buildVideoObject, seedDatabase } = require('../test-utils');

// helper func
const generateRandomUrl = (domain) => {
    return `http://${domain}/${Math.random()}`;
};

function submitNewVideo(title = "", description = "", randomUrl = "") {
    browser.setValue('#title-input', title);
    browser.setValue('#description-input', description);
    browser.setValue('#url-input', randomUrl);

    browser.click('#submit-button');
}

describe('user visits root', () => {
    describe('without existing items', () => {
        it('should start blank', () => {
            browser.url('/');

            assert.equal(browser.getText('#videos-container'), '');
        })
    });

    describe('can navigate', () => {
        it('to the create page ', () => {
            browser.url('/videos/create');

            assert.include(browser.getText('body'), 'Save a video');
        })
    });

    describe('can create video', () => {
        it('renders existing video on index page', () => {
            browser.url('/videos/create');

            const videoToCreate = buildVideoObject();

            submitNewVideo(videoToCreate.title, videoToCreate.description, videoToCreate.url);

            browser.url('/');

            assert.include(browser.getText('body'), videoToCreate.title);
        })
    });

    describe('with existing items', () => {
        it('renders it in the list', () => {
            // setup
            browser.url('/videos/create');

            // const videoToCreate = buildVideoObject();
            const title = 'My favorite video';
            const description = 'Just the best vid on earth';
            const randomUrl = generateRandomUrl('localhost');

            submitNewVideo(title, description, randomUrl);

            assert.equal(browser.getAttribute('.video-player', 'src'), randomUrl);
        });

        it('can navigate to a video', async () => {
            // setup
            browser.url('/videos/create');

            // const videoToCreate = buildVideoObject();
            const title = 'My favorite video';
            const description = 'Just the best vid on earth';
            const randomUrl = generateRandomUrl('localhost');

            submitNewVideo(title, description, randomUrl);

            browser.url('/');
            
            // exercise
            browser.click('#videos-container a');

            assert.include(browser.getText('body'), title);
            assert.include(browser.getText('body'), description);
        });
    });
});