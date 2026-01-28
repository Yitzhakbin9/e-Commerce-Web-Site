// REPO - basic crud funcs with firebase

import firebaseCrudFunctions from '../Firebase/firebaseCrudFunctions';
import { doc, setDoc } from "firebase/firestore";
import db from "../Firebase/firebase"
import { COLLECTIONS } from '../Constants/collections';
import { USER_FIELDS } from '../Constants/fields';

const COLLECTION_NAME = COLLECTIONS.USERS


// Get All

const getAllUsers = (callback) => {
  return firebaseCrudFunctions.getAll((usersFromDb) => {

    const users = usersFromDb.map(user => ({
      ...user,
      [USER_FIELDS.CREATED_AT]: user[USER_FIELDS.CREATED_AT]
        ? user[USER_FIELDS.CREATED_AT].toDate().toLocaleDateString("he-IL")
        : ""
    }));

    callback(users);
  }, COLLECTION_NAME);
};


// Get By ID
const getUserById = async (id) => {
  console.log("Getting user by ID:", id);
  return await firebaseCrudFunctions.getById(COLLECTION_NAME, id);
};

// // Create

const createUserDoc = async (uid, userData) => {
  // We use setDoc function because we already have the userID
  // we put await here because we want to get the userData and send it to the client
  await setDoc(doc(db, COLLECTION_NAME, uid), userData);
  return userData;
};





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



export default {
  getAllUsers,
  getUserById,
  createUserDoc
};
