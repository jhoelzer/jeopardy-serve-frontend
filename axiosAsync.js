module.exports = async function (uri) {

    const axios = require("axios");
    // npm install axios
    
    const response = await axios.get(uri);
      
    return response.data;
}