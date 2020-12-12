const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')

describe("CreateBook", () => {
  it("should be able to create a new book", async () => {

    const book = await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12sd2",
    })

    expect(book).toHaveProperty('name')
    expect(book).toHaveProperty('author')
    expect(book).toHaveProperty('price')
    expect(book).toHaveProperty('release')
    expect(book).toHaveProperty('sbnCode')

    return book

  })

  it("should be not create two books with same sbnCode", async () => {
    createBook = CreateBookService

    expect(
      createBook(FakesBookRepository).execute({
        name: "Aventura Z",
        bio: "E mais de 8000 mil",
        author: "Goku",
        price: 8000,
        release: new Date(),
        sbnCode: "12sd2"
      })

    ).rejects.toThrow()

  })
})

