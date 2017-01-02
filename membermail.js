var dotenv = require('dotenv');
dotenv.load();
var readYaml = require('read-yaml');
var members = readYaml.sync('members_test.yml').members;

var metadata = require('./metadata.json');

var sg   = require('sendgrid')(process.env.SENDGRID_TOKEN);
var template = require('./template');
var emailBody = template.templateReader("template.html");

for (i = 0; i < members.length; i++) {
  member = members[i];

  helper = require('sendgrid').mail;
  mail = new helper.Mail();

  from_email = new helper.Email(metadata.from);
  mail.setFrom(from_email);

  mail.setSubject(metadata.subject);

  personalization = new helper.Personalization();

  to_email = new helper.Email(member.Email);
  personalization.addTo(to_email);

  substitution = new helper.Substitution("%firstName%", member.First);
  personalization.addSubstitution(substitution);

  substitution = new helper.Substitution("%amount%", metadata.amount);
  personalization.addSubstitution(substitution);

  substitution = new helper.Substitution("%addr%", member.BTCAddr);
  personalization.addSubstitution(substitution);

  mail.addPersonalization(personalization);

  content = new helper.Content('text/html', emailBody);
  mail.addContent(content);

  request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}
