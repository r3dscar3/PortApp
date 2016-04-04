module.exports = function (app, express, nodemailer) {
    
app.get('/', function (req, res) {
  res.render("index",
  { title : "Home" }
  )});

app.post('/', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "username",
          pass: "password" 
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'nolanpanther@yahoo.com',
      subject: 'Website contact form Submission',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('index', { title: 'PGD Bend - Contact', msg: 'Error occured, message not sent.', err: true, page: 'index' })
      }
      //Yay!! Email sent
      else {
          res.render('index', { title: 'PGD Bend - Contact', msg: 'Message sent! Thank you.', err: false, page: 'index' })
      }
  });
});
    
}
