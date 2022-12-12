# Instructions for API

Design and write REST API with express/nodejs to support CRUD operation to manage a list of users, Assume the user is
defined as following:
<pre><small>User = {
    Id: string
    Name: string
    Email: string
}</small></pre>
And we can manage the users in memory, if you can sketch the code to work with mongodb that would be a plus but not
required.<hr> The operations we want to support are add/remove user, get user by id, query user by name or email.

## Notes:

1. I start using the Express.js template provided by *jetbrains* on the IDE (IntelliJ Idea)
2. Files were updated to be more readable:
	- app.js
	- ./bin/www
	- ./routes/index.js
	- ./routes/users.js
3. Directories were moved in function of CLEAN
	- application
		- api
		- bin
		- routes
	- domain
		- models
		- utils
	- infrastructure
		- data
		- db
	- public
4. Sample data to populate database was created in *infrastructure/data/sample.data.json*
5. API requires Authorization headers using **Bearer TOKEN** *(NonRFC)*, also each allowed token are registered in
   DataBase such as: **appTokens** and each one has their own grants scope.
	- ONLY Email confirmation doesn't requires token authorization.
6. 