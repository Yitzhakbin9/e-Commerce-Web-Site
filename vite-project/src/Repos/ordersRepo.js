import firebaseCrudFunctions from '../Firebase/firebaseCrudFunctions';
import { COLLECTIONS } from '../Constants/collections';

const COLLECTION_NAME = COLLECTIONS.ORDERS


const getAllOrders = (callback) => {
  return firebaseCrudFunctions.getAll(callback, COLLECTION_NAME);
};


const addOrder = (doc) => {
  return firebaseCrudFunctions.add(COLLECTION_NAME, doc);
};


export default {
  getAllOrders,
  addOrder
};


