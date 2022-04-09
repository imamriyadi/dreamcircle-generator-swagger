#!/usr/bin/env node
const yargs = require("yargs");
var fs = require('fs'); 
const knex = require('knex');
var path = require('path');
const generateSwaggersss = require('./swagger/generate')
const options = yargs
    .usage("Usage: -n <name>")
    .option("t", { alias: "table", describe: "Your table", type: "string", demandOption: true })
    .argv;
const config = require(`${path.resolve()}/dreamcircle.config.js`)
const { exit } = require("process");
const DB = knex({
    client: 'mysql',
    connection: config.database
});
var progress = 0
const swaggerProperties = {}

const getPropertis = async () => {
    const rows = await DB.raw(`SELECT
	COLUMN_NAME,
	DATA_TYPE, 
	CONCAT('{','"type"',':"',CONCAT(
	CASE
    WHEN DATA_TYPE = "int" OR DATA_TYPE = "tinyint" THEN "integer"
    WHEN DATA_TYPE = "varchar" OR DATA_TYPE = "text" OR DATA_TYPE = "time" THEN  "string"
		WHEN DATA_TYPE = "datetime" OR DATA_TYPE = "date" OR DATA_TYPE = "timestamp"  THEN "date"
    ELSE ""
END
	),'"}')   as result 
FROM
	INFORMATION_SCHEMA.COLUMNS 
WHERE
	TABLE_NAME = '${options.table}' AND COLUMN_NAME NOT IN ("id","created_at","updated_at") AND TABLE_SCHEMA = '${config.database.database}'
`);
    rows[0].forEach((value, index) => {
        swaggerProperties[`${value.COLUMN_NAME}`] = JSON.parse(value.result)
    });
    const cocatSchema = {}
    const genSchemaInsert = await generateSwaggersss.post(`${options.table[0].toUpperCase()}${options.table.slice(1)}`, swaggerProperties)
    const genSchemaGetAll = await generateSwaggersss.getAll(`${options.table[0].toUpperCase()}${options.table.slice(1)}`)

    cocatSchema["post"] = genSchemaInsert.method["post"]
    cocatSchema["get"] = genSchemaGetAll.method["get"]
    const cocatSchemaById = {}
    const genSchemaGet = await generateSwaggersss.get(`${options.table[0].toUpperCase()}${options.table.slice(1)}`)
    const genSchemaPut = await generateSwaggersss.put(`${options.table[0].toUpperCase()}${options.table.slice(1)}`, swaggerProperties)

    cocatSchemaById["get"] = genSchemaGet.method["get"]
    cocatSchemaById["put"] = genSchemaPut.method["put"]
    generateSwagger(`${options.table}`, cocatSchema, cocatSchemaById)
}

const generateSwagger = (table, method, methodById) => {
    const genFIle = `
const ${table} = {
  path: '/',
  tag:'${table[0].toUpperCase()}${table.slice(1)}',
  method: ${JSON.stringify(method, null, 2)}
}

const ${table}_by_id = {
    path: '/{id}',
    tag:'${table[0].toUpperCase()}${table.slice(1)}',
    method: ${JSON.stringify(methodById, null, 2)}
}
 

module.exports = [${table},${table}_by_id]`
    if (!fs.existsSync("./swagger")) {
        fs.mkdirSync("./swagger", { recursive: true });
    }
    var stream = fs.createWriteStream(`./swagger/${table}.js`);
    stream.once('open', function (fd) {
        stream.write(genFIle);
        stream.end();
        console.log('Generatet Swagger Done');
        exit(1)
    });
}

getPropertis()  