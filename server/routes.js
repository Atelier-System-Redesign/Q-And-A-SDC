// create router
const router = require('express').Router();
// import controllers
const controller = require('./controllers');

// connect controller methods
// connect questions
router.get('/questions', controller.questions.get);
router.post('/questions', controller.questions.post);
router.put('/questions', controller.questions.put);

// connect answers
router.get('/answers', controller.answers.get);
router.post('/answers', controller.answers.post);
router.put('/answers', controller.answers.put);

// export file
module.exports = router;
