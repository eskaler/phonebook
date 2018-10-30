var pgp = require('pg-promise')();

var db = pgp( {
  host: '176.56.14.200',
  port: 5432,
  database: 'laptevphonebook',
  user: 'postgres',
  password: 'ttimephi'
})



module.exports = {
  execute: (query, params)=>{
    
    console.log('Pg required');

    return db.any(query, params)
    .then(response => {
      //console.log(response);
      return response;
    })
    .catch(error => {
        console.log(error);
    });

  }  
}
