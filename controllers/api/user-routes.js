
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes


router.get('/', (req, res) => {
    // Access the User model and run .findAll() method to get all users
    User.findAll({
        // when the data is sent back, exclude the password property
        attributes: { exclude: ['password'] }
    })
      // return the data as JSON formatted
      .then(dbUserData => res.json(dbUserData))
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.get('/:id', (req, res) => {

    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
   
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        // otherwise, return the data for the requested user
        res.json(dbUserData);
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
  });



router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      // send the user data back to the client as confirmation and save the session
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json(dbUserData);
        });
      })
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/login',  (req, res) => {
  
    User.findOne({
        where: {
        email: req.body.email
        }
    }).then(dbUserData => {
        // if the email is not found, return an error
        if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
        }
        
        const validPassword = dbUserData.checkPassword(req.body.password);
        // if the password is invalid (method returns false), return an error
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
     
        req.session.save(() => {
          // declare session variables
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });  
});

router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
     
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

router.put('/:id', withAuth, (req, res) => {
    // update method
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    User.update(req.body, {
        individualHooks: true,
   
        where: {
            id: req.params.id
        }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })


router.delete('/:id', withAuth, (req, res) => {
    // destroy method
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;