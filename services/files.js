//service for read documents excel
const xlsx = require('xlsx');
const { Read } = require('../services/excel')
const path = require("path");

module.exports = class Files {

    static async Save(file){
        
        const route = path.join(__dirname,'../files/',file.name);

        const status = await file.mv(route);

        return route;
        
    };

}