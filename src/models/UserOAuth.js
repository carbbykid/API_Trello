var mongoose= require('mongoose')
var Schema = mongoose.Schema

const userOAuthSchema = new Schema({
    oAuthId:{
        type: String
    },
    name:{ 
        type: String
    },
    email:{
        type: String
    },
    provider:{
        type: String
    }
}, {timestamps: true})
const userOAuth = mongoose.model('userOAuth',userOAuthSchema);
module.exports = userOAuth;