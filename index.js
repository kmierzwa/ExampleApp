const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');



let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'karolek',
  database : 'Base'
});


app.get('/BOOM',(request, response) =>{
    console.log('BOOM')
    return response.status(404).send('dupa')
})

//odbieram request i definiuje co ma sie stac jak przyjdzie request
app.get('/dupa',(request, response) =>{
//lacze sie z baza danych
    connection.connect();
    //definiuje ta funkcje i przekazuje mysql parametry do tej funkcji: error, results, fields
    connection.query('SELECT * from example', function (error, results, fields) {
        if (error) throw error;
        //jezeli jest blad to jest jezeli nie to zwracam http code 200 i wysyla to co jest w result do tego kto wsylal request
        return response.status(200).send(results)
      });
       
      connection.end();
    
})

//request - przechowywane tam ejst wszystko to co klient sie pyta 
//body = parametry ktore przekazuje swiadomie request
//trzeba pamietac o bodyparcel bo nie bd dzialac ;D

app.post('/add', function(request, response){
    console.log(request.body)
    connection.connect();
    //nazwa koloumy to je klucz w json a wartosc to jest wartosc 
    // a ten ? to zabezpieczenie przed sql injection  
    connection.query("insert into uzytkownik set ?" ,request.body, function (error, results, fields) {
        if (error) throw error;
        return response.status(200).send('git')
      });
      return response.status(400).send('dupa')
      connection.end();
    
})

app.get('/',(request, response) =>{
    console.log(request)   
    return response.status(200).sendFile(path.join(__dirname + '/public/index.html'))
})


app.listen(3000, () => console.log('Listening on port ' + 3000))