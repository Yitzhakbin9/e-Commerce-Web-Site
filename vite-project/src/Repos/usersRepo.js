// REPO - basic crud funcs with firebase

import firebaseCrudFunctions from '../Firebase/firebaseCrudFunctions';
import { doc, setDoc } from "firebase/firestore";
import db from "../Firebase/firebase"

const COLLECTION_NAME = "users"


// Get All

const getAllUsers = (callback) => {
  return firebaseCrudFunctions.getAll((usersFromDb) => {

    const users = usersFromDb.map(user => ({
      ...user,
      joinedAt: user.joinedAt
        ? user.joinedAt.toDate().toLocaleDateString("he-IL")
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
