const { assert } = require('chai');
const {buildVideoObject, parseTextFromHTML} = require('../test-utils');


describe('user visits create page', () => {
    describe('submits a new video', () => {
        it('should start blank', () => {
            browser.url('/');

            browser.click('#create-video-btn');

            const videoToCreate = buildVideoObject();

            browser.setValue('#title-input', videoToCreate.title);
            browser.setValue('#description-input', videoToCreate.description);
            browser.setValue('#url-input', videoToCreate.url);
            browser.click('#submit-button');

            assert.include(browser.getText('body'), videoToCreate.title);
        })
    })
})