// REPO - basic crud funcs with firebase

import firebaseCrudFunctions from '../Firebase/firebaseCrudFunctions';
import { COLLECTIONS } from '../Constants/collections';
import { PRODUCTS_FIELDS } from '../Constants/fields';

const COLLECTION_NAME = COLLECTIONS.PRODUCTS


// Get All

const getAllProducts = (callback) => {
  return firebaseCrudFunctions.getAll(callback, COLLECTION_NAME);
};


const addProduct = (doc) => {
  return firebaseCrudFunctions.add(COLLECTION_NAME, doc);
};



export default {
  getAllProducts,
  addProduct
};





// // Get By ID
// const getPersonById = (id) => {
//   return Person.findById(id);
// };

// // Create
// const addPerson = (obj) => {
//   // Option 1
//   return Person.create(obj);
//   // // Option 2
//   // const per = new Person(obj);
//   // return per.save();
// };

// // Update
// const updatePerson = (id, obj) => {
//   return Person.findByIdAndUpdate(id, obj);
// };

// const deletePerson = (id) => {
//   return Person.findByIdAndDelete(id);
// };

// module.exports = {
//   getAllPersons,
//   getPersonById,
//   addPerson,
//   updatePerson,
//   deletePerson,
// };
