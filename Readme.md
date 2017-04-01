Send simple template emails via sendgrid api, pulling data from a simple YAML database.

Note: This doesn't do anything a free mailchimp account doesn't do. It's just simpler and allows you to quickly work with your database in text form. It's probably not good for large databases either.

## Install.

`git clone https://github.com/DecentralVan/membermail.git`
`cd membermail`

## Configure and Run.

NB: The app is designed to search for the template and database based on the given command line argument, hence the files must be named accordingly. For example if the programe is invoked with `node membermail.js test` then it will expect a database at the path `./db/members_test.yml` and a template at `./templates/template_test.html`)

Copy & edit the `cp .env.example .env`, inserting your personal sendgrid API token.
Copy & edit the database file in the 'db' folder.
Copy & edit the html email template in the templates folder.
Invoke the program with the chosen campaign name eg. `node membermail.js test`
