var express = require('express');
var pg = require('./pg');
var sql = require('./sql');
var responseBuilder = require('./responseBuilder');

module.exports = {
    start: ()=>{
        const app = express();

        app.get('/', function(req, res, next){

            let query = req.query;
            console.log(query);
            if(!query.type)
                return next();

            if(query.type == "positions"){
                pg.execute(sql.getPositions).then(response => {
                    //console.log(response);
                    res.send(responseBuilder.positionsOptions(response))});  
                return;              
            }
            
            pg.execute(sql.getPersons, 
                [query.name, 
                query.phoneNumber,
                query.email, 
                query.subdivision,
                query.position,
                query.address]).then(response => {
                    //console.log(response);
                    res.send(responseBuilder.personsCards(response))});                
        });

        app.use('/', express.static('public')),

        app.listen(3000,'192.168.100.2',function(){
            console.log('Server started on 3000 port');
        })
    },
    

}


