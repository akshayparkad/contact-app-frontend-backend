const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumbers: [
        {
            type: String,
            required: true,
            unique: true,
        },
    ]
},
    {
        collection: 'contact-data'
    }

)

const model = mongoose.model('ContactData', User);

module.exports = model;