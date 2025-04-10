// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {};

// export const manyOperationReducer=createReducer(initialState,{
//     newPostRequest: (state) => {
//         state.loading = true;
//       },
//       newPostSuccess: (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       },
//       newPostFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       },
//       likePostRequest: (state) => {
//         state.loading = true;
//       },
//       likePostSuccess: (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       },
//       likePostFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       },

//       commentPostRequest:(state, action) => {
//         state.loading = true;

//       },
//       commentPostSuccess:(state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       },
//       commentPostFailure:(state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       },
//       deletePostRequest:(state, action) => {
//         state.loading = true;

//       },
//       deletePostSuccess:(state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       },
//       deletePostFailure:(state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       },

// })

// export const getPostReducer=createReducer(initialState,{

//   getPostRequest:(state, action) => {
//     state.loading = true;

//   },
//  getPostSuccess:(state, action) => {
//     state.loading = false;
//     state.post = action.payload;
//   },
//   getPostFailure:(state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   },
// })
