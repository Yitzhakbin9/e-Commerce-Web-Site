import firebaseCrudFunctions from '../Firebase/firebaseCrudFunctions';
import { COLLECTIONS } from '../Constants/collections';
import { CATEGORY_FIELDS } from '../Constants/fields';

const COLLECTION_NAME = COLLECTIONS.CATEGORIES


const getAllCategories = (callback) => {
  return firebaseCrudFunctions.getAll(callback, COLLECTION_NAME);
};

const addCategory = (name) => {
  const doc = { [CATEGORY_FIELDS.CREATED_AT]: new Date(), [CATEGORY_FIELDS.IS_ACTIVE]: true, [CATEGORY_FIELDS.NAME]: name };
  return firebaseCrudFunctions.add(COLLECTION_NAME, doc);
};

const updateCategory = (id, name) => {
  return firebaseCrudFunctions.update(COLLECTION_NAME, id, name);
};

const removeCategory = (id) => {
  return firebaseCrudFunctions.remove(COLLECTION_NAME, id);
};



export default {
  getAllCategories,
  addCategory,
  updateCategory,
  removeCategory
};

