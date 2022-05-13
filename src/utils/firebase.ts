import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCB9uAcpLd3byPJN47cqCfyVdTjdnHhJPM',
  authDomain: 'unity-latam.firebaseapp.com',
  projectId: 'unity-latam',
  storageBucket: 'unity-latam.appspot.com',
  messagingSenderId: '116709792736',
  appId: '1:116709792736:web:cd642a35ebfc22865b6985',
  measurementId: 'G-RDPVN3HRG3',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

const rosterDoc = doc(firestore, 'Guild', 'Roster');

export const getRosterDoc = () => getDoc(rosterDoc);
export const setRosterDoc = (character: Record<string, unknown>) =>
  setDoc(rosterDoc, character, { merge: true });
