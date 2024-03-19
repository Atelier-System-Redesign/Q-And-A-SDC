// create router
const router = require('express').Router();
// import controllers
const controller = require('./controllers');

// connect controller methods
// connect questions
router.get('/questions', controller.getQuestions);
router.post('/questions', controller.postQuestion);
router.put('/questions/:question_id/helpful', controller.markQuestionHelpful);
router.put('/questions/:question_id/report', controller.markQuestionReported);

// connect answers
router.get('/questions/:question_id/answers', controller.getAnswers);
router.post('/questions/:question_id/answers', controller.postAnswer);
router.put('/answers/:answer_id/helpful', controller.markAnswerHelpful);
router.put('/answers/:answer_id/report', controller.markAnswerReported);

// export file
module.exports = router;
