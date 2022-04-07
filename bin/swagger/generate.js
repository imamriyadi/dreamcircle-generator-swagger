const template = require('./template')

class generate {
    static async post(table, properties) {
        const schemaTmpl = { ...template.format }
        schemaTmpl.tag = table;
        schemaTmpl.method["post"] = {}
        schemaTmpl.method["post"]["tags"] = [`${table}`]
        schemaTmpl.method["post"]["security"] = template.security
        schemaTmpl.method["post"]["summary"] = `Insert Data ${table}`
        schemaTmpl.method["post"]["description"] = ``
        schemaTmpl.method["post"]["requestBody"] = {}
        schemaTmpl.method["post"]["requestBody"]["content"] = {}
        schemaTmpl.method["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"] = {}
        schemaTmpl.method["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"] = {}
        schemaTmpl.method["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"]["type"] = "object"
        schemaTmpl.method["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"]["properties"] = JSON.parse(JSON.stringify(properties, null, 2))
        schemaTmpl.method["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"]["required"] = [] 
        schemaTmpl.method["post"]["requestBody"]["content"]["application/json"] = {}
        schemaTmpl.method["post"]["requestBody"]["content"]["application/json"]["schema"] = {}
        schemaTmpl.method["post"]["requestBody"]["content"]["application/json"]["schema"]["type"] = "object"
        schemaTmpl.method["post"]["requestBody"]["content"]["application/json"]["schema"]["properties"] = JSON.parse(JSON.stringify(properties, null, 2))
        schemaTmpl.method["post"]["requestBody"]["content"]["application/json"]["schema"]["required"] = []
        schemaTmpl.method["post"]["responses"] = JSON.parse(JSON.stringify(template.responses, null, 2))
        return schemaTmpl
    }

    static async getAll(table) {
        const schemaTmpl = { ...template.format }
        schemaTmpl.tag = table;
        schemaTmpl.path = "/"
        schemaTmpl.method["get"] = {}
        schemaTmpl.method["get"]["tags"] = [`${table}`]
        schemaTmpl.method["get"]["security"] = template.security
        schemaTmpl.method["get"]["summary"] = `Get Data ${table}`
        schemaTmpl.method["get"]["description"] = ``
        schemaTmpl.method["get"]["responses"] = JSON.parse(JSON.stringify(template.responses, null, 2))
        return schemaTmpl
    }

    static async get(table) {
        const schemaTmpl = { ...template.format }
        schemaTmpl.tag = table;
        schemaTmpl.path = "/{id}"
        schemaTmpl.method["get"] = {}
        schemaTmpl.method["get"]["tags"] = [`${table}`]
        schemaTmpl.method["get"]["parameters"] = [{
            "in": "path",
            "name": "id",
            "type": "integer",
            "required": true,
            "description": `Numeric ID of the ${table} to get.`
        }]
        schemaTmpl.method["get"]["security"] = template.security
        schemaTmpl.method["get"]["summary"] = `Get Data ${table} By ID`
        schemaTmpl.method["get"]["description"] = ``
        schemaTmpl.method["get"]["responses"] = JSON.parse(JSON.stringify(template.responses, null, 2))
        return schemaTmpl
    }

    static async put(table, properties) {
        const schemaTmpl = { ...template.format }
        schemaTmpl.tag = table;
        schemaTmpl.path = "/{id}"
        schemaTmpl.method["put"] = {}
        schemaTmpl.method["put"]["tags"] = [`${table}`]
        schemaTmpl.method["put"]["security"] = template.security
        schemaTmpl.method["put"]["summary"] = `Edit Data ${table}`
        schemaTmpl.method["put"]["parameters"] = [{
            "in": "path",
            "name": "id",
            "type": "integer",
            "required": true,
            "description": `Numeric ID of the ${table} to get.`
        }]
        schemaTmpl.method["put"]["description"] = ``
        schemaTmpl.method["put"]["requestBody"] = {}
        schemaTmpl.method["put"]["requestBody"]["content"] = {}
        schemaTmpl.method["put"]["requestBody"]["content"]["application/x-www-form-urlencoded"] = {}
        schemaTmpl.method["put"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"] = {}
        schemaTmpl.method["put"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"]["type"] = "object"
        schemaTmpl.method["put"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"]["properties"] = JSON.parse(JSON.stringify(properties, null, 2))
        schemaTmpl.method["put"]["requestBody"]["content"]["application/x-www-form-urlencoded"]["schema"]["required"] = []
        schemaTmpl.method["put"]["requestBody"]["content"]["application/json"] = {}
        schemaTmpl.method["put"]["requestBody"]["content"]["application/json"]["schema"] = {}
        schemaTmpl.method["put"]["requestBody"]["content"]["application/json"]["schema"]["type"] = "object"
        schemaTmpl.method["put"]["requestBody"]["content"]["application/json"]["schema"]["properties"] = JSON.parse(JSON.stringify(properties, null, 2))
        schemaTmpl.method["put"]["requestBody"]["content"]["application/json"]["schema"]["required"] = []
        schemaTmpl.method["put"]["responses"] = JSON.parse(JSON.stringify(template.responses, null, 2))
        return schemaTmpl
    }

    static async delete(table, properties) {

    }
}

module.exports = generate
