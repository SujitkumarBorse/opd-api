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
            "male",
            "female"
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
            "type": "String"
        },
        "state": {
            "type": "String"
        },
        "contry": {
            "type": "String"
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
            "type": "String"
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