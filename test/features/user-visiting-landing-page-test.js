const {assert} = require('chai');


describe('user visits root', () => {
    describe('without existing items', () => {
        it('should start blank', () => {
            browser.url('/');

            assert.equal(browser.getText('#videos-container'), '');
        })
    })
    describe('can navigate', () => {
        it('to the create page ', () => {
            browser.url('/videos/create');

            assert.include(browser.getText('body'), 'Save a video');
        })
    })
})