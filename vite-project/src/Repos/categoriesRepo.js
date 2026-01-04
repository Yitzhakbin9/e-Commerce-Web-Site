// REPO - basic crud funcs with firebase

import firebaseCrudFunctions from '../Firebase/firebaseCrudFunctions';

const COLLECTION_NAME = "categories"


const getAllCategories = (callback) => {
  return firebaseCrudFunctions.getAll(callback, COLLECTION_NAME);
};

const addCategory = (name) => {
  const doc = {categoryName : name , Items: []}
  return firebaseCrudFunctions.add(COLLECTION_NAME , doc);
};

const updateCategory = (id, name) => {
  return firebaseCrudFunctions.update(COLLECTION_NAME , id, name);
};

const removeCategory = (id) => {
  return firebaseCrudFunctions.remove(COLLECTION_NAME , id);
};




export default {
  getAllCategories,
  addCategory,
  updateCategory,
  removeCategory
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
