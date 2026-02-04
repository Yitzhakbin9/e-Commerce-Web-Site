
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
const getUserById = (id) => {
  console.log("Getting user by ID:", id);
  return firebaseCrudFunctions.getById(COLLECTION_NAME, id);
};

// Create

const createUserDoc = (uid, userData) => {
  // We use setDoc function because we already have the userID
  setDoc(doc(db, COLLECTION_NAME, uid), userData);
  return userData;
};


// Update
const updateUser = (id, obj) => {
  return firebaseCrudFunctions.update(COLLECTION_NAME, id, obj);
};


// const addPerson = (obj) => {
//   // Option 1
//   return Person.create(obj);
//   // // Option 2
//   // const per = new Person(obj);
//   // return per.save();
// };


// const deletePerson = (id) => {
//   return Person.findByIdAndDelete(id);
// };



export default {
  getAllUsers,
  getUserById,
  createUserDoc,
  updateUser
};
