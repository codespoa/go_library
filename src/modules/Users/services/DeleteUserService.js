const AppError = require('../../../shared/error/AppError')

const DeleteUserService = (repository) => ({

  async execute(_id) {


    const checkUserExists = await repository.findById(_id)

    if (!checkUserExists)
      throw new AppError('This user not exists in system', 404)

    const user = await repository.remove(_id)

    return user
  }

})

module.exports = DeleteUserService