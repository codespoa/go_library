# Go Library

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/codespoa/go_library)

### Tech

- [Node.js]
- [MongoDB]
- [Docker]
- [Express]
- [Jest]
- [Husky]
- [Commit-Lint]

### Installation

Install all dependencies

```sh
$ git clone https://github.com/codespoa/go_library.git
$ cd go_library
$ yarn || npm install
```

Start the application container

```sh
$ yarn docker
```

with your container running, now go to <a href="http://localhost:3333" target="_blank">http://localhost:3333</a>


# Documentation

## Routes
### Create User

(POST) <a href="http://localhost:3333/user" target="_blank">/user</a>
###### Data in body


| Field | Info |
| --- | --- |
| email | Required - String |
| password | Required - String |
| phone | Required - Number |
{
"name": "jubileu",
"email": "jubileu@teste.com",
"password": "123456"
}

### Login User

(POST) <a href="http://localhost:3333/session" target="_blank">/session</a>

###### Data in body

name - Required | String
password - Required | String

{
"email": "jubileu@teste.com",
"password": "123456"
}
return user and user token
### Create Book

(POST) <a href="http://localhost:3333/book" target="_blank">/book</a>
###### Data in body
name    - Required | String
bio     - String
author  - Required | String
price   - Required | Number
release - Required | Date
sbnCode - Required | String

{
	"name": "Aventura Z",
	"bio": "Mais de 8 mil",
	"author": "Vegeta",
	"price": 9000,
	"release": "2020-11-22T03:00:00.000Z",
	"sbnCode": "12sds2"
}
### List all Books

(GET) <a href="http://localhost:3333/book" target="_blank">/book</a>
return array of books
### List a book by code

(GET) <a href="http://localhost:3333/book/sbnCode" target="_blank">/book/:sbnCode</a>
return one book
### List books by search

(GET) <a href="http://localhost:3333/book/search" target="_blank">/book/search</a>
###### Data in query params

name | author
return array of books

### Delete Book

(DELETE) <a href="http://localhost:3333/book/sbnCode" target="_blank">/book/:sbnCode</a>

### Rent a Book

(PATCH) <a href="http://localhost:3333/book/sbnCode/rent/userId" target="_blank">book/:sbnCode/rent/:userId</a>
###### Data in body

status - Required | String
accepts three parameters in the body

{
	"status": "rented" || "not rented" || "lack"
}
