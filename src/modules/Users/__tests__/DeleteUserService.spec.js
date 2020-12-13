const FakesUserRepository = require('../repositories/fakes/UsersRepositoryFake')
const CreateUserService = require('../services/CreateUserService')
const DeleteUserService = require('../services/DeleteUserService')

describe("DeleteUser", () => {
  it("should be able to delete a user", async () => {

   const user =  await CreateUserService(FakesUserRepository).execute({
      name: "jubileu",
      email: "je@gmail.com",
      password: "123456",
      phone: 51984503888,
      date_birth: new Date(),
    })

    const deleteUser = await DeleteUserService(FakesUserRepository).execute(user._id)

    expect(user).toHaveProperty("_id")
    expect(user).toHaveProperty("name")
    expect(user).toHaveProperty("email")

    expect(deleteUser).toBe(undefined)

    return deleteUser

  })

  it('should check if a user does not exist', async () => {

    await CreateUserService(FakesUserRepository).execute({
      name: "jubileu",
      email: "ja@gmail.com",
      password: "123456",
      phone: 51984503888,
      date_birth: new Date()
    })

    const deleteUser = DeleteUserService(FakesUserRepository).execute('1')

    expect(deleteUser).rejects.toThrow()

  })
})
