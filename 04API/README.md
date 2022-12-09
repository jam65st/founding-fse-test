# Instructions for API

Design and write REST API with express/nodejs to support CRUD operation to manage a list of users, Assume the user is
defined as following:
<pre><small>User = {
    Id: string
    Name: string
    Email: string
}</small></pre>
And we can manage the users in memory, if you can sketch the code to work with mongodb that would be a plus but not
required.<br> The operations we want to support are add/remove user, get user by id, query user by name or email.

## Notes:

1. I start using the Express.js template provided by *jetbrains* on the IDE (IntelliJ Idea)
2. Files were updated to be more readable:
	- app.js
	- ./bin/www
	- ./routes/index.js
	- ./routes/users.js
3. 