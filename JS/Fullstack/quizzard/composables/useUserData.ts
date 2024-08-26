import {getFirestore, setDoc, doc, getDoc, CollectionReference, Firestore, query, collection, where, getDocs} from "firebase/firestore"

let db  : Firestore

async function getUser(email: string) {
  console.log("GETTING USER!")
    const q = query(collection(db, "User"),where("email", "==", "email"))
     getDocs(q).then(snapshot => {
       if(snapshot.size > 0) {
         console.log("GET USER DATA: ", JSON.stringify(snapshot.docs[0].data()))
        }
      });
}


export default function useUserData()
{
    db = useNuxtApp().$firestore as Firestore;
    return {
      getUser
    }

}