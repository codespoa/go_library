const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const DeleteBookService = require('../services/DeleteBookService')
const CreateBookService = require('../services/CreateBookService')
const RentBookService = require('../services/RentBookService')


describe('DeleteBook', () => {

  it('should check if a sbnCode does not exist', async () => {

    await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12sd2",
    })

    const deleteBook = DeleteBookService(FakesBookRepository).execute('1')

    expect(deleteBook).rejects.toThrow()

  })

  it('should not delete a book with rented status', async () => {

    await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12ssd2",
    })

    await RentBookService(FakesBookRepository).execute({
      sbnCode: "12ssd2",
      status: 'rented',
      rented: '5fbbaa36cb8ec30344ad531c'
    })

    expect(
      DeleteBookService(FakesBookRepository).execute('12ssd2')
    ).rejects.toThrow()


  })
})
