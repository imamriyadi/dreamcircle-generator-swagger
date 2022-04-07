exports.format = {
    path: "/",
    tag: "",
    method: {}
}

exports.responses = {
    "200": {
        "description": "success"
    },
    "400": {
        "description": "Bad Request"
    },
    "404": {
        "description": "Not found."
    }
}

exports.security = [{
    "bearerAuth": []
}]

exports.requestBody = {
    "content": {
        "application/x-www-form-urlencoded": {
            "schema": {
                "type": "object",
                "required": [
                ],
                "properties": {}
            }
        }
    }
}

exports.tags = []