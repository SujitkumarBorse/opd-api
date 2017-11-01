var definition = {
    "_id": {
        "type": "String",
        "default": null
    },
    "doctorId": {
        "type": "String",
        "required": true
    },
    "firstName": {
        "type": "String",
        "required": true
    },
    "middleName": {
        "type": "String"
    },
    "lastName": {
        "type": "String"
    },
    "gender": {
        "type": "String",
        "enum": [
            "male",
            "female"
        ]
    },
    "dob": {
        "type": "Date",
        "required": true
    },
    "address": {
        "address": {
            "type": "String"
        },
        "city": {
            "type": "String",
            "required": true
        },
        "state": {
            "type": "String",
            "required": true
        },
        "country": {
            "type": "String",
            "required": true
        },
        "zip": {
            "type": "String"
        }
    },
    "contact": {
        "email": {
            "type": "String"
        },
        "mobile": {
            "type": "String",
            "required": true
        }
    },
    "diseaseDignosedNote": {
        "type": "String"
    },
    "active": {
        "type": "Boolean"
    },
    "created": {
        "type": "Date"
    },
    "updated": {
        "type": "Date"
    }
};
module.exports.definition=definition;