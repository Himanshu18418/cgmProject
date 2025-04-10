// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// // const response = await openai.createCompletion({
// //   model: "text-davinci-003",
// //   prompt: "Say this is a test",
// //   temperature: 0,
// //   max_tokens: 7,
// // });

// exports.generateImage=async(req,res)=>{
//     const {prompt}=req.body
//     try {
//         const response=await openai.createImage({
//             prompt:'Polar bear',
//             n:1,
//             size:"512x512"

//         })
//         const imgUrl=response.data.data[0].url
//         res.status(200).json({
//             success:true,
//             data:imgUrl
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({
//             success:false,
//             message:error.message
//         })
//     }
// }