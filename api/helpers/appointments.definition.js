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
    "status": {
        "type": "String",
        "enum": [
            "schedualed",
            "inProgress",
            "completed",
            "cancelled"
        ]
    },
    "created": {
        "type": "Date"
    },
    "updated": {
        "type": "Date"
    }
};
module.exports.definition=definition;