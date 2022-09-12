const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dongore',
    description: 'Dongore API Auto-gen',
  },
  host: 'localhost:3000https://dongore-backend2.herokuapp.com/swagger-ui.html',
  schemes: ['http'],
};

const outputFile = './types/swagger-output.json';
const endpointsFiles = ['./types/endpointsUser.js', './types/endpointsBook.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);