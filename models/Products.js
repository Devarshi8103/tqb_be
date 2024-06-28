const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
    {    image:{
        type:String,
         
    },
        category:{
            type:String,
            require:true,
        } , 
        productName:{
            type:String,
            require:true,
        },
        price:{
             type:Number,
             require:true,
        },
        weight:{
            type:Number,
          
       },
       flavour:{
        type:String,
       
    } ,
     type: {
        type:String,
       
     },
  

    }
);

const ProductsModel = mongoose.model("products" , ProductsSchema);
module.exports = ProductsModel