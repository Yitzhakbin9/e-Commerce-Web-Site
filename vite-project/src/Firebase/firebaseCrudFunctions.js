
import db from './firebase'

import {
    query,        // – יוצר שאילתה (Query) כדי לסנן/למיין תוצאות מאוסף (collection).
    onSnapshot,   //   – מאזין בזמן אמת לשינויים במסמך או באוסף ומחזיר עדכונים מיידיים.
    collection,   //– ניגש לאוסף (Collection) בתוך בסיס הנתונים.
    doc,          //– ניגש למסמך (Document) מתוך אוסף מסוים.
    addDoc,       //– מוסיף מסמך חדש לאוסף ויוצר לו ID אוטומטי.
    updateDoc,    // – מעדכן שדות במסמך קיים ב-Firestore.
    deleteDoc,    //– מוחק מסמך קיים מאוסף ב-Firestore.
    getDoc

} from "firebase/firestore"


const getAll = (callback, collName) => {
    const col = collection(db, collName);
    const q = query(col);

    // We use here OnSnapshot method beacuse in the future we 
    // may add another admins so we want the information to be
    // updated in real time
    return onSnapshot(q, (querySnapshot) => {
        const field = querySnapshot.docs.map((user) => ({
            id: user.id,
            ...user.data()
        }));

        callback(field);
    });
};


// The reason we use 'return await...' instead of 'await...'
// is because we need the answer from the db to continue with our logic.
// In add, update and delete functions, we can continue with the code without
// getting the answer right away.
const getById = async (collName, id) => {
    return await getDoc(doc(db, collName, id));
};


const add = async (collName, doc) => {
    const col = collection(db, collName)
    await addDoc(col, doc)
}

const update = async (collName, id, name) => {
    const userDoc = doc(db, collName, id)
    updateDoc(userDoc, { name: name })
}


const remove = async (collName, id) => {
    const userDoc = doc(db, collName, id)
    deleteDoc(userDoc)
}


export default {
    getAll,
    getById,
    add,
    update,
    remove
};




