var fs = require('fs');

var keysService = require('../services/keysService.js');

exports.index = function (req, res) {
  var confClient = fs.readFileSync(global.scriptFolder + "/conf_client", 'utf8');

  if (typeof(req.session.email) != "undefined"){
      res.render('user.ejs', { session: req.session, conf: confClient });
  }else{
      res.redirect('/#connection');
  }
}

exports.keys = function (req, res) {
  if (req.session.account != "premium") {
    res.redirect('/me');
    return;
  }

  var accountNoMail = req.session.pseudo;

  res.download(global.staticFolder + "/members/" + req.session.email + "/keys/" + accountNoMail + ".zip");
}

exports.generate = function (req, res) {
  if (req.session.account != "premium") {
    res.redirect('/me');
    return;
  }

  keysService.generateKeys(req.session.pseudo, req.session.email, () => {
    res.redirect('/me/keys');
  });
}
