const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../db/config');


class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            uploadImg: '/api/upload'
        }

        this.connection();

        this.middlewares();

        this.routes();

    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());

        // FileUpload - carga de archivas
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir:'/tmp/',
            createParentPath: true
        }));
    }

    async connection(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.paths.uploadImg, require('../routes/uploadImg'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Aplicaion corriendo en http://localhost:${this.port}`);
        });
    }

}


module.exports = Server;