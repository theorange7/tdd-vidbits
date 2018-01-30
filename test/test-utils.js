const {jsdom} = require('jsdom');

// Create and return a sample video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const description = options.description || 'Just the best vid on earth';
  const imageUrl = options.imageUrl || '';
  return {title, imageUrl, description};
};

// Add a sample Item object to mongodb
/* const seedItemToDatabase = async (options = {}) => {
  const item = await Item.create(buildItemObject(options));
  return item;
}; */

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
  /*seedItemToDatabase,*/
  parseTextFromHTML
};
