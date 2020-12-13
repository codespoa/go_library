require('dotenv').config();
const mongoose = require('mongoose')

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CONTAINER, MONGO_DB } = process.env

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CONTAINER}/${MONGO_DB}?authSource=admin`

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoCreate: true
}

const connect = async () => {
  return mongoose
    .connect(uri, config)
    .then(() => {
      console.log('\x1b[32m', '[API] MongoDB connected!')
    })
    .catch((err) => console.log('\x1b[31m', '[API] Erro on connect DB', err))
}

module.exports = {
  connect,
  uri,
  config,
}
