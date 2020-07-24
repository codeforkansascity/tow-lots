const axios = require('axios');

axios.post('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/', { data: '2G1WH55K619337105' })
  .then(function(response){
    console.log(response)
  });
