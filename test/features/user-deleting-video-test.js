const { assert } = require('chai');
const { buildVideoObject, seedDatabase } = require('../test-utils');

function submitNewVideo(title = "", description = "", randomUrl = "") {
    browser.setValue('#title-input', title);
    browser.setValue('#description-input', description);
    browser.setValue('#url-input', randomUrl);

    browser.click('#submit-button');
}

describe('User deletes video', () => {
    describe('removes the video on show page', () => {
        it('deletes video from db', () => {
            // setup
            browser.url('/videos/create');
            const videoToCreate = buildVideoObject();
            submitNewVideo(videoToCreate.title, videoToCreate.description, videoToCreate.url);

            browser.click('#delete');

            assert.notInclude(browser.getText('body'), videoToCreate.title);
            assert.notInclude(browser.getText('body'), videoToCreate.description);
            assert.notInclude(browser.getText('body'), videoToCreate.url);
        })
    })
})