const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  title: yup.string().required(),
  bio: yup.string(),
  author: yup.string().required(),
  category: yup.string().required(),
  price: yup.number().required(),
  release: yup.date().required(),
  status: yup.string().oneOf(['rented', 'not rented', 'lack']).default('not rented'),
  isbn: yup.string().matches(/[a-zA-Z]+/gi).required().min(3),
});
