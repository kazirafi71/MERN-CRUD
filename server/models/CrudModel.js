const mongoose=require('mongoose')


const CrudSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
},{ timestamps: true })

const Crud=mongoose.model('Crud', CrudSchema)
module.exports=Crud