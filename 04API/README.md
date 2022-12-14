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

## DataBase

DataBase allows index data, it has 1 set and 2 collections, set *[__main]* contains DB parameters, in this case
firstIndex (time in hash64 of first usage).
The collections are:

- **appTokens**: contains bearer tokens allowed and grants (scope):

```json
{
	"appTokens": {
		"Wa45sRT67O0JHTY": {
			"scope": "all",
			"alias": "RT67O0"
		},
		"W4i5kRT66O0HTYJ": {
			"scope": "write",
			"alias": "RT66O0"
		},
		"Wn5p4RT65O0TYJH": {
			"scope": "update",
			"alias": "RT65O0"
		},
		"W2213RT6650YJHT": {
			"scope": "delete",
			"alias": "RT6650"
		},
		"WertsRT62O0JTHY": {
			"scope": "read",
			"alias": "RT62O0"
		}
	}
}
```

- **users**: list of users indexed on database according to the model:

```javascript
const userSchema = {
	Id: {
		type: "string",
		required: true,
		index: { unique: true },
		default: hash64.defaultEncoded()
	},
	Name: {
		type: "string",
		required: true,
		index: { unique: false }
	},
	Email: {
		type: "string",
		required: true,
		index: { unique: true },
		lowercase: true,
		validate: { type: 'regex', value: Validators.EMAIL }
	},
	ValidEmail: {
		type: "boolean",
		required: true
	}
}
```

Database includes documented methods to respond at middleware requests.

# Users API

## Add User to DataBase <small>(AddUserToDB)</small>

**[ POST ] /users**<br>
**HTTPie** `POST "http://localhost:3000/api/v1/users" Name='value' Email='value' "Authorization:
Bearer [[token]]"`

### <small>Parameters</small>

|                                     Key |   Type   | Description                        |
|----------------------------------------:|:--------:|------------------------------------|
|  **Name** <br><small>*required*</small> | *String* | User full name.                    |
| **Email** <br><small>*required*</small> | *String* | Valid e-mail (it must be verified) |

### <small>Responses</small>

| action     | value | success | message                                                       |
|------------|-------|:-------:|---------------------------------------------------------------|
| addUser100 | 100   | `true`  | 'Please verify your email at: `[URL]`                         |
| addUser102 | 102   | `false` | 'Invalid Bearer Token [value/scope]                           |
| addUser103 | 103   | `false` | 'Invalid User, email was registered yet                       |
| addUser104 | 104   | `false` | 'Invalid User, Do not complains DataSchema                    |
| addUser130 | 130   | `false` | 'Invalid UserID is registered yet, contact your administrator |
| addUser200 | 200   | `false` | 'Unknown ERROR, contact your administrator                    |

**Example:**
Sample form in: *[./public/index.html](http://localhost:3000/)*<br>
`POST "http://localhost:3000/api/v1/users" Name='Fabrice Marcea' Email='fmarcea@trustmail.net' "Authorization: Bearer Wa45sRT67O0JHTY"`

```json
{
	"success": true,
	"info":    {
		"status":  100,
		"action":  "addUser",
		"message": "Please verify your email at: http://localhost:3000/api/v1/users/verify/YUPpdkU?Email=jam65st@gmail.com"
	}
}
```

## Confirm User Email to DataBase <small>ConfirmUserEmailToDB</small>

**[ GET ] /users/verify/:Id**<br>
**HTTPie** `GET "http://localhost:3000/api/v1/users/verify/[:Id]" Email='value'`

### <small>Parameters</small>

|                                     Key |   Type   | Description                                 |
|----------------------------------------:|:--------:|---------------------------------------------|
| **Email** <br><small>*required*</small> | *String* | Valid e-mail (it must be verified)          |

### <small>Responses</small>

| action   | value | success | message                   |
|----------|-------|:-------:|---------------------------|
| Email100 | 100   | `true`  | Email has been Validated  |
| Email101 | 101   | `false` | Email was be verified yet |
| Email103 | 103   | `false` | Email Inconsistent        |
| Email102 | 102   | `false` | User Inconsistent         |
| Email105 | 105   | `false` | Data provided is Invalid  |

**Example:** `http://localhost:3000/api/v1/users/verify/YUIfKL+?Email=your.user@anymail.com`
Link must be send by email to the end user as result of `AddUserToDB`
`GET "http://localhost:3000/api/v1/users/verify/YUIfKL" Email='fmarcea@trustmail.net'`

```json
{
	"success": false,
	"info":    {
		"status":  101,
		"action":  "confirmUserEmail",
		"message": "Email was be verified yet"
	}
}
```

## Remove User from DataBase <small>RemoveUserFromDB</small>

**[ DELETE ] /users**<br>
**HTTPie** `POST "http://localhost:3000/api/v1/users" Name='value' Email='value' "Authorization:
Bearer [[token]]"`

### <small>Parameters</small>

|                                  Key |   Type   | Description                                 |
|-------------------------------------:|:--------:|---------------------------------------------|
| **Id** <br><small>*required*</small> | *String* | User Identifier (assigned by DB previously) |

### <small>Responses</small>

| action    | value | success | message                                   |
|-----------|-------|:-------:|-------------------------------------------|
| RMUser100 | 100   | `true`  | User has been removed                     |
| RMUser102 | 102   | `false` | Invalid Bearer Token [value/scope]        |
| RMUser103 | 103   | `false` | Do not exist user with the provided ID    |    
| RMUser200 | 200   | `false` | Unknown ERROR, contact your administrator |

**Example:** `http://localhost:3000/api/v1/users/Id=YUIfKL`
The identifier is a unique value created by DB when `AddUserToDB`.
`DELETE "http://localhost:3000/api/v1/users" Id='YUIfKL' "Authorization: Bearer Wa45sRT67O0JHTY"`

```json
{
	"success": true,
	"info":    {
		"status":  100,
		"action":  "removeUser",
		"message": "User has been removed"
	}
}
```

## Get User from DataBase <small>GetUserFromDB</small>

**[ GET ] /users**<br>
**HTTPie** `POST "http://localhost:3000/api/v1/users" 'key'='value'  "Authorization:
Bearer [[token]]"`

### <small>Parameters</small>

The request only process one of the following parameters (key) and their value.

|                                     Key |   Type   | Description                                 |
|----------------------------------------:|:--------:|---------------------------------------------|
|    **Id** <br><small>*required*</small> | *String* | User Identifier (assigned by DB previously) |
|  **Name** <br><small>*required*</small> | *String* | User full name.                             |
| **Email** <br><small>*required*</small> | *String* | Valid e-mail (it must be verified)          |
|             **any** <br><small></small> | *String* | NO key but any value of the latest          |

### <small>Responses</small>

| action     | value | success | message                                          |
|------------|-------|:-------:|--------------------------------------------------|
| GetUser100 | 100   | `true`  | User has been recovered                          |
| GetUser102 | 102   | `false` | Invalid Bearer Token [value/scope]               |
| GetUser103 | 103   | `false` | Invalid Arguments, expected **1** and got: **N** |
| GetUser104 | 104   | `false` | Invalid Key, got: **?**                          |
| GetUser110 | 110   | `false` | No one has registered wit the provided data      |

**Example(s):**

- `http://localhost:3000/api/v1/users/?Id=YUIfKL`
- `http://localhost:3000/api/v1/users/?YUIfKL`
- `http://localhost:3000/api/v1/users/?Name=Fabrice%20Marcea`
- `http://localhost:3000/api/v1/users/?Name=Fabrice`
- `http://localhost:3000/api/v1/users/?Name=Marcea`
- `http://localhost:3000/api/v1/users/?Fabrice`
- `http://localhost:3000/api/v1/users/?Marcea`
- `http://localhost:3000/api/v1/users/?Email=your.user@anymail.com`
- `http://localhost:3000/api/v1/users/your.user@anymail.com`
- `http://localhost:3000/api/v1/users/?anymail.com`

As well get makes search, the valid answer will be received such as array / list

`GET "http://localhost:3000/api/v1/users" Name='Fabrice Marcea' "Authorization: Bearer Wa45sRT67O0JHTY"`
<hr>
For: `http://localhost:3000/api/v1/users?Name=Francis`

```json
{
	"success": true,
	"info":    {
		"status":  100,
		"action":  "getUser",
		"message": "User has been recovered"
	},
	"data":    [
		{
			"Id":         "YTgUQpj",
			"Name":       "Francis Morris",
			"Email":      "f.morris@fake.drill.org",
			"ValidEmail": true
		},
		{
			"Id":         "YThGJ5K",
			"Name":       "Francis Cott",
			"Email":      "f.cott@fakestarmedia.com",
			"ValidEmail": true
		}
	]
}
```

For: `http://localhost:3000/api/v1/users?e.mowedo@fakebarton.us`

```json
{
	"success": true,
	"info":    {
		"status":  100,
		"action":  "getUser",
		"message": "User has been recovered"
	},
	"data":    [
		{
			"Id":         "YTkijY5",
			"Name":       "Enu Mowedo",
			"Email":      "e.mowedo@fakebarton.us",
			"ValidEmail": true
		}
	]
}
```