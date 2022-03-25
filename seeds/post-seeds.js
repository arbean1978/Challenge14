const { Post } = require('../models');

const postData = [
    {
      id: 1,
      title: 'Express.js',
      post_text: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
      user_id: 1,
    },
    {
      id: 2,
      title: 'Sessions',
      post_text: 'an HTTP server-side framework used to create and manage a session middleware.',
      user_id: 2,
    }, 
    {
      id: 3,
      title: 'Hashing',
      post_text: 'Hashing performs a one-way transformation on a password, turning the password into another String, called the hashed password.',
      user_id: 3,
    },
    {
      id: 4,
      title: 'Sequelize Data Types',
      post_text: 'Sequelize has several built in data types that you can use when you define a model.  The most commonly used for simple databases are INTEGER and STRING.',
      user_id: 4,
    },
    {
      id: 5,
      title: 'Handlebars Template Engine',
      post_text: 'Handlebars is a simple templating language.It uses a template and an input object to generate HTML or other text formats. ',
      user_id: 5,
    },
    {
      id: 6,
      title: 'Handlebars Partials',
      post_text: 'Partials are normal Handlebars templates that may be called directly by other templates.',
      user_id: 1,
  },
   
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;