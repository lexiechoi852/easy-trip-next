import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAppDispatch } from "@/store/hooks";
import { logout, setUser } from "@/store/userSlice";

export default function useAuth() {
  const dispatch = useAppDispatch();

  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    const currentUser = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
      isAnonymous: userCredential.user.isAnonymous,
    };
    dispatch(setUser(currentUser));
  };
  const handleSignInAnonymously = async () => {
    const userCredential = await signInAnonymously(auth);
    const currentUser = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
      isAnonymous: userCredential.user.isAnonymous,
    };
    dispatch(setUser(currentUser));
  };
  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return {
    handleSignIn,
    handleSignInAnonymously,
    handleSignOut,
  };
}
