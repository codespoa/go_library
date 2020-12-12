const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')
const RentBookService = require('../services/RentBookService')

describe("RentBook", () => {
  it("should change the status of the book", async () => {

    await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12sd2",
    })

    const book = await RentBookService(FakesBookRepository).execute({
      sbnCode: "12sd2",
      rented: '5fbb904274e61942f4956267',
      status: 'rented'
    })

    expect(book).toHaveProperty('sbnCode')
    expect(book).toHaveProperty('rented')
    expect(book).toHaveProperty('status')

  })

  it("should be not create two books with same sbnCode", async () => {
    await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12sdg35ghd2"
    })

    expect(
      CreateBookService(FakesBookRepository).execute({
        name: "Aventura Z",
        bio: "E mais de 8000 mil",
        author: "Goku",
        price: 8000,
        release: new Date(),
        sbnCode: "12sdg35ghd2"
      })

    ).rejects.toThrow()

  })

  it("should be not create rent books with book not exist", async () => {

    expect(
      RentBookService(FakesBookRepository).execute({
        sbnCode: "",
        status: "rented",
        rented: "id_not_exists",
      })

    ).rejects.toThrow()

  })

  it("should be not create rent books with book not exist and rented diferent with me rented", async () => {

    await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "52rte"
    })

    const book = RentBookService(FakesBookRepository).execute({
      sbnCode: "52rte",
      status: "rented",
      rented: "exists",
    })

    const searchBook = RentBookService(FakesBookRepository).execute({
      sbnCode: "dsd",
      status: "rented",
      rented: "id_not_exists",
    })

    expect(book.sbnCode !== searchBook.sbnCode).rejects

  })
})

