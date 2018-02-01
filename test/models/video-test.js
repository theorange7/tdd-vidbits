const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

const {buildVideoObject} = require('../test-utils');

const Video = require('../../models/video');


async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
}

describe('Model: Video', () => {
  describe('#Title', () => {
    it('Should be a String', () => {
      const titleAsInt = 123;
      const video = new Video({ title: titleAsInt });

      assert.strictEqual(video.title, titleAsInt.toString());
    });

    it('is required', () => {
      const videoToCreate = buildVideoObject();
      videoToCreate.title = null;
      const video = new Video(videoToCreate);

      video.validateSync();

      assert.equal(video.errors.title.message, 'Path `title` is required.');
    });
  }); 

  describe('#url', () => {
    it('Should be a String', () => {
      const urlAsInt = 123;
      const titleAsInt = 123;
      const video = new Video({ title: titleAsInt, url: urlAsInt });

      assert.strictEqual(video.title, titleAsInt.toString());
      assert.strictEqual(video.url, urlAsInt.toString());
    });
    
    it('is required', () => {
      const videoToCreate = buildVideoObject();
      videoToCreate.url = null;

      const video = new Video(videoToCreate);
      video.validateSync();

      assert.equal(video.errors.url.message, 'Path `url` is required.');
    });
  })
})