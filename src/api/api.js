import { db, auth } from '../firebase';

/* Auth */

export function initAuth(onAuth) {
  return auth.onAuthStateChanged(onAuth);
}

export function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signOut() {
  return auth.signOut();
}

export function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

/* DB */

export function getTodos(userId) {
  return db.collection('todos')
    .where('userId', '==', userId)
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      return items;
    });
}

export function createTodo(data) {
  return db.collection('todos').add({
    ...data,
    isCompleted: false
  })
    .then((docRef) => docRef.get())
    .then((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
}

export function updateTodo(todoId, data) {
  return db.collection('todos').doc(todoId).update(data)
    .then(() => ({
      id: todoId,
      ...data
    }));
}

export function deleteTodo(todoId) {
  return db.collection('todos').doc(todoId).delete()
    .then(() => todoId);
}
