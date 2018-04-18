const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const load = require('express-load');
const mongoose = require('mongoose');

//file of configuration Mongo
const configMongo = require('./mongodb.json');

class ExpressInit {
    constructor(){
        this.express = undefined;
    }
    config(){

        this.express = express();
         
        // middlewares
        this.express.use(bodyParser.urlencoded({extended:true}));
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(helmet());

        //load files
        load("controllers")
        .then("routes")
        .into(this.express);
                  
    };

    configMongoose(){
        //config database remote
        mongoose.connect("mongodb://"+ configMongo.user +":"+ configMongo.password +"@"+ configMongo.server +":"+ configMongo.port +"/" + configMongo.database).then(()=>{
            console.log('server connected to mongo =)');
        }).catch(err => console.log(err));
    };

    start(startCallback , port = process.env.PORT || 3000){

        // init server
        this.express.listen(port, function(){
                 startCallback(port);
        })

        return this.express;
    };
}


    const server = new ExpressInit();

    server.config();
    server.configMongoose();
    server.start((port)=>{
        console.log('server started on port : ' + port);
    });
