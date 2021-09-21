const PORT = process.env.PORT || 5005 ;
const express =require('express');
const mustacheexpress = require('mustache-express');
const app = express();
const mustache = mustacheexpress();
const bodyParser = require('body-parser');
const  {Client,Pool} = require('pg');
const { response } = require('express');
mustache.cache=null;
app.engine('mustache',mustache);
app.set('view engine','mustache');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));



app.get('/register',(request,response)=>{
    response.render('register');

})
app.get('/login',(request,response)=>{
    response.render('login');

})
app.get('/',(request,response)=>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }

    });
    client.connect()
    .then(()=>{
        return client.query('select * from register');
        
    })
    .then((results)=>{
        console.log('results?',results);
        response.render('index',results);
    });
    
    });


app.get('/welcome',(request,response)=>{
    response.render('welcome');

})







    
        
            
        app.get('/register-list',(request,response)=>{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                  rejectUnauthorized: false
                }
        
            });
            client.connect()
            .then(()=>{
                return client.query('select * from register');
                
            })
            .then((results)=>{
                console.log('results?',results);
                response.render('registerlist',results);
            });
            
            });
           
            
           
        app.post('/register/add', async function (req, res) {
		
            try{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
                    ssl: {
                      rejectUnauthorized: false
                    }
                        });
              client.connect()
                await JSON.stringify(client.query('SELECT cid FROM "register" WHERE "email"=$1', [req.body.email], function(err, result) {
                    if(result.rows[0]){
                        res.redirect('/Registration-error')
                    }
                    else{
                        client.query('INSERT INTO register(full_name,email,password) VALUES ($1, $2, $3)', [req.body.full_name,req.body.email,req.body.password], function(err, result) {
                            if(err){console.log(err);}
                            else {
                            
                            client.query('COMMIT')
                                console.log(result)
                               
                                res.redirect('/');
                                return;
                            }
                        });
                        
                        
                    }
                    
                }));
                
            } 
            catch(e){throw(e)}
        });
        app.post('/login/add', async function (req, res) {
		
            try{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
                    ssl: {
                      rejectUnauthorized: false
                    }
                        });
              client.connect()
                await JSON.stringify(client.query('SELECT cid FROM "register" WHERE "email"=$1', [req.body.email], function(err, result) {
                    if(result.rows[0]){
                        res.redirect('/')
                        
                    }
                    else{
                     res.redirect('/Login-error');
                        
                    }
                    
                }));
                
            } 
            catch(e){throw(e)}
        });
        
      
app.get('/thanks',(request,response)=>{
    response.render('thanks for booking');
})
app.get('/Booking-error',(request,response)=>{
    response.render('Error');
})
app.get('/Registration-error',(request,response)=>{
    response.render('Error2');
})
app.get('/Login-error',(request,response)=>{
    response.render('Error3');
})
app.get('/sign',(request,response)=>{
    response.render('sign');
})
app.get('/admin',(request,response)=>{
    response.render('admin');
})



app.listen(PORT,()=>{
    console.log('Listening');
})