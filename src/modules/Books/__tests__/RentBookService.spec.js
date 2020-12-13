const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')
const RentBookService = require('../services/RentBookService')

const CreateUserService = require('../../Users/services/CreateUserService')
const FakesUserRepository = require('../../Users/repositories/fakes/UsersRepositoryFake')


describe("RentBook", () => {
  it("should change the status of the book", async () => {

    const user = await CreateUserService(FakesUserRepository).execute({
      title: "John Doe",
      email: "jonh@test.com",
      password: "123456",
    })

    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "12sfdsfsdd2",
    })

    const book = await RentBookService(FakesBookRepository).execute({
      isbn: "12sfdsfsdd2",
      status: 'rented',
      userId: user.id
    })

    expect(book).toHaveProperty('isbn')
    expect(book).toHaveProperty('status')

  })

  it("should be not create two books with same isbn", async () => {
    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      isbn: "12sdg35ghd2"
    })

    expect(
      CreateBookService(FakesBookRepository).execute({
        title: "Aventura Z",
        bio: "E mais de 8000 mil",
        author: "Goku",
        price: 8000,
        release: new Date(),
        isbn: "12sdg35ghd2"
      })

    ).rejects.toThrow()

  })

  it("should be not create rent books with book not exist", async () => {

    expect(
      RentBookService(FakesBookRepository).execute({
        isbn: "",
        status: "rented",
        rented: "id_not_exists",
      })

    ).rejects.toThrow()

  })

  it("should be not create rent books with book not exist and rented diferent with me rented", async () => {

    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      isbn: "52rte"
    })

    const book = RentBookService(FakesBookRepository).execute({
      isbn: "52rte",
      status: "rented",
      rented: "exists",
    })

    const searchBook = RentBookService(FakesBookRepository).execute({
      isbn: "dsd",
      status: "rented",
      rented: "id_not_exists",
    })

    expect(book.isbn !== searchBook.isbn).rejects

  })
})

