'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
      .post((req,res)=>{
        (!req.body.text && !req.body.locale) ? res.json({error:'Required field(s) missing'}):
                          (req.body.text==='') ? res.json({error:'No text to translate'}):
                          (!req.body.text) ? res.json({error:'Required field(s) missing'}):
                          (!req.body.locale) ? res.json({error:'Required field(s) missing'}) :
                          res.json({text:req.body.text,translation:translator.translate(req.body.text,req.body.locale)});
      })

   /* .post((req, res) => {
     (req.body.text && req.body.locale) ? res.json({text:req.body.text,translation:translator.translate(req.body.text,req.body.locale)}) :

     res.json({error:'Required field(s) missing!'});
 });*/
};
