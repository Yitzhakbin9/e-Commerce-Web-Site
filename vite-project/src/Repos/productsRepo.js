import firebaseCrudFunctions from '../Firebase/firebaseCrudFunctions';
import { COLLECTIONS } from '../Constants/collections';
import { PRODUCTS_FIELDS } from '../Constants/fields';

const COLLECTION_NAME = COLLECTIONS.PRODUCTS


const getAllProducts = (callback) => {
  return firebaseCrudFunctions.getAll(callback, COLLECTION_NAME);
};


const addProduct = (doc) => {
  return firebaseCrudFunctions.add(COLLECTION_NAME, doc);
};

const updateProduct = (id, fieldsToUpdate) => {
  return firebaseCrudFunctions.update(COLLECTION_NAME, id, fieldsToUpdate);
};

export default {
  getAllProducts,
  addProduct,
  updateProduct
};

