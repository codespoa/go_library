const FakesUserRepository = require('../repositories/fakes/UsersRepositoryFake')
const AuthenticateUserService = require('../services/AuthenticateUserService')
const CreateUserService = require('../services/CreateUserService')

describe("AuthenticateUser", () => {
  it("should be responsible for logging the user", async () => {

    await CreateUserService(FakesUserRepository).execute({
      name: "John Doe",
      email: "jonh@example.com",
      password: "123456",
    })

    const user = await AuthenticateUserService(FakesUserRepository).execute({
      email: "jonh@example.com",
      password: '123456'
    })

    expect(user).toHaveProperty("token")

  })

  it("should be checks if there is no user", async () => {

    expect(
      AuthenticateUserService(FakesUserRepository).execute({
        email: "jonh@e.com",
        password: "123ds456",
      })
      
    ).rejects.toThrow()

  })

})
