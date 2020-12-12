const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  status: yup.string().required().oneOf(['rented', 'not rented', 'lack']),
});
