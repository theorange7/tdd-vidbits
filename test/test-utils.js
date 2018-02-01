const {jsdom} = require('jsdom');
const Video = require('../models/video');

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};

// Create and return a sample video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const description = options.description || 'Just the best vid on earth';
  const url = options.url || generateRandomUrl('localhost')
  return {title, url, description};
};

// Add a sample video object to mongodb
const seedDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  buildVideoObject,
  seedDatabase,
  parseTextFromHTML
};
