const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')
const SearchBookService = require('../services/SearchBookService')

describe("SearchBook", () => {
  it("is responsible for looking for a book", async () => {

    const books = await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12sd2",
    })

     SearchBookService(FakesBookRepository).execute({
      name: 'Aventura Z',
      author: 'Goku',
    })

    expect(books.name).toBe('Aventura Z')
    expect(books.author).toBe('Goku')


    return books

  })

})
