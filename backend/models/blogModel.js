// const mongoose=require("mongoose")

// const blogSchema=new mongoose.Schema({
//     title:{
//         type:String},
//     imageUrl:{
//             public_id:String,
//             url:String,
//         },
   
//     content:{
//         type:String,
//     },
//     author:{type:mongoose.Schema.Types.ObjectId,
//         ref:"User",},
//         createdAt:{
//             type:Date,
//             default:Date.now,
//         },
//         likes:[
//             {
              
//                     type:mongoose.Schema.Types.ObjectId,
//                     ref:"User",
              
//             },
//         ],
//         comments:[{
//             user:{
//                 type:mongoose.Schema.Types.ObjectId,
//                 ref:"User",
//             },
//             comment:{
//                 type:String,
//                 required:true,
//             }
//         },]
    
// })


// module.exports=mongoose.model("Blog",blogSchema)