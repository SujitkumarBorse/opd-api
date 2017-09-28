var definition = {
    "_id": {
        "type": "String",
        "default": null
    },
    "firstName": {
        "type": "String",
        "required": true
    },
    "lastName": {
        "type": "String"
    },
    "gender": {
        "type": "String",
        "enum": [
            "Male",
            "Female"
        ]
    },
    "email": {
        "type": "String",
        "unique": true
    },
    "password": {
        "type": "String",
        "required": true
    },
    "medicalRegistrationNo": {
        "type": "String",
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
        "contry": {
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
        "phone": {
            "type": "String"
        },
        "mobile": {
            "type": "String",
            "required": true
        }
    },
    "accountDetalis": {
        "panCardNumber": {
            "type": "String"
        }
    },
    "chartedAccountant": {
        "name": {
            "type": "String"
        },
        "email": {
            "type": "String"
        },
        "mobile": {
            "type": "String"
        }
    },
    "qualification": [
        {
            "degree": {
                "type": "String"
            },
            "specialization": {
                "type": "String"
            }
        }
    ],
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