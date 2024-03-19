const models = require('../models');

module.exports = {
  get(req, res) {
    models.questions.getAll((err, results) => {
      if (err) {
        res.status(500).send('Error retrieving questions');
        return;
      }
      res.status(200).send(results);
    });
  },

  // post(req, res) {
  //   // TODO: create function
  // },

  // put(req, res) {
  //   // TODO: create function
  // },
};
