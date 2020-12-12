const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required().min(11),
  date_birth: yup.date().required(),
  password: yup.string().min(6).required(),
  role: yup.string().oneOf(['admin', 'user']),
});
