//service for read documents excel
const xlsx = require('xlsx');

module.exports = class Excel {

    static async Read(dir){

        const books =  [];
    
        var workbook = await xlsx.readFile(dir);
        var sheet_name_list = workbook.SheetNames;
    
        for (var sheet of sheet_name_list){
            const page = {"name" : sheet , content : xlsx.utils.sheet_to_json(workbook.Sheets[sheet])}
            books.push(page);
        }
        
        return books;
    };

}