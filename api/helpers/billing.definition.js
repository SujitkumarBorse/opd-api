var definition = {
    "_id": {
        "type": "String",
        "default": null
    },
    "patientId": {
        "type": "String",
        "required": true
    },
    "patientName": {
        "type": "String",
        "required": true
    },
    "dateTime": {
        "type": "Date",
        "required": true
    },
    "amount": {
        "type": "Date",
        "required": true
    },
    "clinicalTestType": {
        "type": "Date",
        "required": true
    },
    "paymentType": {
        "type": "String",
        "enum": [
            "cash",
            "card",
            "cheque",
            "e-wallet"
        ]
    },
    "paymentTransactionId": {
        "type": "String"
    },
    "created": {
        "type": "Date"
    },
    "updated": {
        "type": "Date"
    }
};
module.exports.definition=definition;