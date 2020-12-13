const FakesUserRepository = require('../repositories/fakes/UsersRepositoryFake')
const FavoriteBookService = require('../services/FavoriteBookService')
const CreateUserService = require('../services/CreateUserService')
const CreateBookService = require('../../Books/services/CreateBookService')
const FakesBookRepository = require('../../Books/repositories/fakes/FakesBookRepository')

describe("FavoriteBook", () => {
  it("should be able responsible for favoring a book", async () => {

    const user = await CreateUserService(FakesUserRepository).execute({
      name: "John Doe",
      email: "jonh@test.com",
      password: "123456",
    })

    const book = await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "ffsda",
    })

    const favoriteBook = await FavoriteBookService(FakesUserRepository).execute({
      _id: user._id,
      bookId: book._id,
    })

    expect(favoriteBook._id).toBe("5fd527e1b14c2c0cd6469fd3")
    expect(favoriteBook.favorite_books[0].isbn).toBe("dsded")


    return favoriteBook

  })

  it("should be not able favoring a book if user not exists", async () => {

    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "ffsddsda",
    })

    expect(
      FavoriteBookService(FakesUserRepository).execute({
        _id: "5fd5281654b8f4004175762c",
        bookId: "5fd5281654b8f4004175762c",
      })
    ).rejects.toThrow()


  })

  
})
