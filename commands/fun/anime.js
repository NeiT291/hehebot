const axios = require("axios");

module.exports = {
    name: 'anime',
    category: 'fun',
    run: (client, message, args) => {
      const options = {
        method: 'GET',
        url: 'https://any-anime.p.rapidapi.com/anime',
        headers: {
          'X-RapidAPI-Key': '6ac63ed2fcmshee4f4aed274cc12p157d22jsnf8d09d80489c',
          'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
        }
      };
          
      axios.request(options).then(function (response) {
        message.channel.send(response.data.stuff[0].image);
      }).catch(function (error) {
        console.error(error);
      });
    }
}