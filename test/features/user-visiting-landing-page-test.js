const {assert} = require('chai');
const {buildVideoObject } = require('../test-utils');

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

            browser.setValue('#title-input', videoToCreate.title);
            browser.setValue('#description-input', videoToCreate.description);
            browser.click('#submit-button');

            browser.url('/');

            assert.include(browser.getText('body'), videoToCreate.title);
        })
    });

    describe('with existing items', () => {
        it('renders it in the list', () => {
            // setup
            browser.url('/videos/create');

            const videoToCreate = buildVideoObject();

            browser.setValue('#title-input', videoToCreate.title);
            browser.setValue('#description-input', videoToCreate.description);
            browser.setValue('#videoUrl-input', videoToCreate.videoUrl);
            
            browser.click('#submit-button');

            assert.equal(browser.getText('#videos-container'), '');
        })
    })
});