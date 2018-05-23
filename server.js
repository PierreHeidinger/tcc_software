const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const load = require('express-load');
const mongoose = require('mongoose');
const cluster = require('cluster');
const busboyBodyParser = require('busboy-body-parser');
const fileUpload = require('express-fileupload');
const os = require('os');

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
        //this.express.use(busboyBodyParser());
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(fileUpload());

        //load files
        load("controllers")
        .then("routes")
        .into(this.express);
                  
    };

    async configMongoose(){

        //config database remote
        await mongoose.connect("mongodb://"+ configMongo.user +":"+ configMongo.password +"@"+ configMongo.server +":"+ configMongo.port +"/" + configMongo.database).then((mongo)=>{
            console.log('server to mongo connected :D');
        }).catch(err => console.log(err));

    };

    start(startCallback , port = process.env.PORT || 3000){

        if(cluster.isMaster){

            console.log('Master' + process.pid + ' is running');

            for(let i = 0 ; i < os.cpus().length; i++){
                cluster.fork();
            }

            cluster.on('exit',(worker,code,signal)=>{
                console.log('worker' + worker.process.pid + ' died');
            });

        }else{

            // init server
            this.express.listen(port, function(){
                startCallback(port);
            })

            console.log(`Worker ${process.pid} started`);

            return this.express;

        }
    };
};

const server = new ExpressInit();

server.config();
server.configMongoose();
server.start((port)=>{
    console.log('server started on port : ' + port);
});
