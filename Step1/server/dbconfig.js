var dbconfig = {
    development: {
        //connectionLimit : 10,
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'term_project_db'
    },
    production: {
        //connectionLimit : 10,
        host: 'localhost',
        port: '3306',
        user: 'dbuser66',
        password: 'P@ssw0rd',
        database: 'term_project_db'
        //database: 'user66007_db'
    }
};
module.exports = dbconfig;