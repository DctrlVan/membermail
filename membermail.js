#!/usr/bin/env node

var bcoin = require('bcoin');

function(tx) {
	var members = require('../members.json');

	for (i = 0; i < tx.outputs.length; i++) {
		output = tx.outputs[i];
		value = (output.value / 100000000).toFixed(8);
		address = output.getAddress().toBase58();
		email = Object.keys(members).find(key => members[key] === address)
		debugger

		if (email) {
			helper = require('sendgrid').mail;
			from_email = new helper.Email('webmaster@dctrl.ca');
			to_email = new helper.Email(email);
			cc_email = new helper.Email('info@dctrl.ca');
			subject = 'Received Payment';
			content = new helper.Content('text/html', 'We received payment of ' + value + ' BTC.  Thank you!');
			mail = new helper.Mail(from_email, subject, to_email, content);
			mail.getPersonalizations()[0].addTo(cc_email)
			sg = require('sendgrid')(require('../credentials.json').sendgrid_token);
			request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: mail.toJSON()
			});

			return sg.API(request, function(error, response) {
				console.log(response.statusCode);
				console.log(response.body);
				console.log(response.headers);
			});
		}
	}
};
