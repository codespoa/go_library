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


#Functionalities
### Users
[x] Listar os usuários da biblioteca.
[x] Retornar dados de um usuário
[x] Salvar, Editar e Excluir.
[x] Autenticar usuário  

### Books
[x] Listar todos livros disponíveis
[x] Retornar dados de um livro
[x] Alugar um livro
[x] Salvar, Editar e Excluir.
[x] Salvar livro na lista de favoritos de um usuário  
# Documentation

## Routes
### Create User

#####(POST) <a href="http://localhost:3333/user" target="_blank">/user</a>
return user create
###### Data in body

| Field | Info |
| --- | --- |
| email | Required - String |
| password | Required - String |
| phone | Required - Number |
| date_birth | Required - Date - iso-8601 |
```
{
	"name": "jonh",
	"email": "jonh@teste.com",
	"password": "123456",
	"phone": 51984503888,
	"date_birth": "{% now 'iso-8601', '' %}"
}
```
---

### Login User

#####(POST) <a href="http://localhost:3333/session" target="_blank">/session</a>
return user and token

###### Data in body

| Field | Info |
| --- | --- |
| name | Required - String |
| password | Required - String |

```
{
	"email": "jonh@teste.com",
	"password": "123456",
}
```


---

### List all User
#####(GET) <a href="http://localhost:3333/user" target="_blank">/user</a>
return all user 

###### No body

---

### Show User
#####(GET) <a href="http://localhost:3333/user/:id" target="_blank">/user/:id</a>
return one user 

###### No body

---

### Delete User
#####(DELETE) <a href="http://localhost:3333/user/:id" target="_blank">/user/:id</a>
return status code and no content

###### No body

---

### Favorite book in user
#####(POST) <a href="http://localhost:3333/user/:userId/favorite-book/:bookId" target="_blank">/user/:userId/favorite-book/:bookId</a>
return one user and list favorite books

###### No body

---

### UnFavorite book in user
#####(DELETE) <a href="http://localhost:3333/user/:userId/favorite-book/:bookId" target="_blank">/user/:userId/favorite-book/:bookId</a>
return no body and status 204

###### No body

---

### Create Book

#####(POST) <a href="http://localhost:3333/book" target="_blank">/book</a>
return an book create
###### Data in body

| Field | Info |
| --- | --- |
| title | Required - String |
| bio |  String |
| author | Required - String |
| price | Required - Number |
| category | Required - String |
| release | Required - Date - iso-8601 |
| isbn | Required - String |

```
{
	"title": "Aventura Z",
	"bio": "Mais de 8 mil",
	"author": "Vegeta",
	"price": 9000,
	"category": "Horror",
	"release": "{% now 'iso-8601', '' %}",
	"isbn": "loptf"
}
```
---

### List all Books
#####(GET) <a href="http://localhost:3333/book" target="_blank">/book</a>
return all book
###### No body

---

### List all Books
#####(GET) <a href="http://localhost:3333/book/:isbn" target="_blank">/book/:isbn</a>
show one book
###### No body

---

### Rent a Book
#####(PATCH) <a href="http://localhost:3333/book/:isbn/rent/:userId" target="_blank">/book/:isbn/rent/:userId</a>
change status book
###### Data in body

| Field | Info |
| --- | --- |
| status | Required - String (rented, not rented, lack) |

```
{
	"status": "rented",
}
```

---

### Delete Book
#####(DELETE) <a href="http://localhost:3333/book/:isbn" target="_blank">/book/:isbn</a>
delete one book and return status 204 no content
###### No body

---

### Search a Book
#####(GET) <a href="http://localhost:3333/book/search" target="_blank">/book/search</a>
search one or more books and return book
###### Data in Query

| Query | Info |
| --- | --- |
| title | Title book |
| author | Author book |

---
