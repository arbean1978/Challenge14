const { Comment } = require('../models');

const commentData = [
  {
    id: 1,
    comment_text: "How do you install express.js?",
    post_id: 1,
    user_id: 1
  },
  {
    id: 2,
    comment_text: "TEXT is another useful data type for entering long form text data.",
    post_id: 4,
    user_id: 2
  },
  {
    id: 3,
    comment_text: "It makes it so much easier than strict HTML",
    post_id: 5,
    user_id: 3
  },
  {
    id: 4,
    comment_text: "Also, you can create a partial for just about anything.",
    post_id: 6,
    user_id: 4
  },
  {
    id: 5,
    comment_text: "A great way to encrypt passwords",
    post_id: 3,
    user_id: 5
  },
  {
    id: 6,
    comment_text: "Sometimes I forget to use middleware!",
    post_id: 2,
    user_id: 1
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;