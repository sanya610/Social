const mongoose = require('mongoose');

const reset_password_tokenSchema = new mongoose.Schema({

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},

accessToken: {
    type: String,
    required: true
},

isValid: {
   type: Boolean,
   required: true  
}

},{
    timestamps: true
});

reset_password_tokenSchema.index({createdAt: 1},{expireAfterSeconds: 1000});
const reset_password_token =  mongoose.model('reset_password_token', reset_password_tokenSchema);
module.exports = reset_password_token;


