//Dependencies
const core = require("@actions/core");
const nodemailer = require("nodemailer");

//Email settings
const email_sender = core.getInput("email_sender");
const password = core.getInput("password");
const email_to_send = core.getInput("email_to_send");

//Jobs
const syntax_check_job = core.getInput("syntax_check_job");
const test_execution_job = core.getInput("test_execution_job");
const build_statics_job = core.getInput("build_statics_job");
const deploy_job = core.getInput("deploy_job");

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport(
//   "smtps://" + email_sender + "%40gmail.com:pass@smtp.gmail.com"
// );

var transporter = nodemailer.createTransport({
  transport: "ses", // loads nodemailer-ses-transport
  auth: {
    user: email_sender,
    pass: password,
  },
  // accessKeyId: "AWSACCESSKEY",
  // secretAccessKey: "AWS/Secret/key",
});

//Contenido del email
var mailContent = {
  from: email_sender, // sender address
  to: email_to_send, // list of receivers
  subject: "Resultado del workflow ejecutado", // Resultado del workflow creado
  // text: "Hello world ?", // plaintext body
  html:
    "<h2>Se ha realizado un push en la rama githubActions_improvement que ha provocado la ejecución del workflow Bingo_Workflow con los siguientes resultados</h2>" +
    "<ul>" +
    "<li>syntax_check_job: " +
    syntax_check_job +
    "</li>" +
    "<li>- test_execution_job: " +
    test_execution_job +
    "</li>" +
    "<li>build_statics_job: " +
    build_statics_job +
    "</li>" +
    "<li>- deploy_job: " +
    deploy_job +
    "</li>" +
    "</ul>",
};

//Enviar email
transporter.sendMail(mailContent, function (error, info) {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: " + info.response);
});
