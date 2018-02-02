const { assert } = require('chai');
const { buildVideoObject, seedDatabase } = require('../test-utils');

// helper func
function submitNewVideo(title = "", description = "", randomUrl = "") {
    browser.setValue('#title-input', title);
    browser.setValue('#description-input', description);
    browser.setValue('#url-input', randomUrl);

    browser.click('#submit-button');
}

describe('user updates video', () => {
    it('changes the title value', () => {
        // setup
        const newDescription = "This is a new description";

        browser.url('/videos/create');
        const videoToCreate = buildVideoObject();
        submitNewVideo(videoToCreate.title, videoToCreate.description, videoToCreate.url);

        // exercise
        browser.click('#edit-button');
        //assert.include(browser.getUrl(), '/edit');
        browser.setValue('#description-input', newDescription);
        browser.click('#submit-button');
        
        // verify
        assert.include(browser.getText('body'), newDescription);
    });

    it('updates existing video', () => {
        // setup
        const newTitle = "This is a new title";

        browser.url('/videos/create');
        const videoToCreate = buildVideoObject();
        submitNewVideo(videoToCreate.title, videoToCreate.description, videoToCreate.url);

        // exercise
        browser.click('#edit-button');
        
        browser.setValue('#title-input', newTitle);
        browser.click('#submit-button');

        // verify
        assert.include(browser.getText('body'), newTitle); // include new title
        assert.notInclude(browser.getText('body'), videoToCreate.title); // does not include old title
    });
});