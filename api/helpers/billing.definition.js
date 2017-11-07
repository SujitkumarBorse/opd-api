var definition = {
    "_id": {
        "type": "String",
        "default": null
    },
    "patientId": {
        "type": "String",
        "required": true
    },
    "doctorId": {
        "type": "String",
        "required": true
    },
    "patientName": {
        "type": "String",
        "required": true
    },
    "appointmentId": {
        "type": "String",
        "required": true
    },
    "amount": {
        "type": "Number",
        "required": true
    },
    // "clinicalTestType": {
    //     "type": "Date",
    //     "required": true
    // },
    // "paymentType": {
    //     "type": "String",
    //     "enum": [
    //         "cash",
    //         "card",
    //         "cheque",
    //         "e-wallet"
    //     ]
    // },
    // "paymentTransactionId": {
    //     "type": "String"
    // },
    "created": {
        "type": "Date"
    },
    "updated": {
        "type": "Date"
    }
};
module.exports.definition=definition;