var definition = {
    "_id": {
        "type": "String",
        "default": null
    },
    "patientId": {
        "type": "String",
        "required": true
    },
    "dateTime": {
        "type": "Date"
    },
    "doctorId": {
        "type": "String",
        "required": true
    },
    "status": {
        "type": "String",
        "enum": [
            "scheduled",
            "inProgress",
            "completed",
            "cancelled"
        ]
    },
    "amountPaid": {
        "type": "Number"
    },
    "created": {
        "type": "Date"
    },
    "updated": {
        "type": "Date"
    }
};
module.exports.definition = definition;