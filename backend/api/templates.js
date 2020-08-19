/*
Default URL: /api/templates
*/
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true, useUnifiedTopology: true});

// Since we are never saving to the database, the schema definition is not required
const templateSchema = new mongoose.Schema({}, {strict: true});
const Template = mongoose.model('templates', templateSchema);

router.get('/', (req, res) => {
    // Return the templates that are store in db
    Template.find({}, "-_id", (err, templates) => {
      res.header("Access-Control-Allow-Origin", "*");

      // TODO(jackson): Figure out a way to not use this call back return, perhaps use promise? Or async await
      res.json(templates);
    });
});

module.exports = router;
