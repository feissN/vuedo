import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from "firebase/auth";
import { auth } from '@/firebase.config';

export const useAuthStore = defineStore('auth', () => {
    const loading = ref(true);
    const failed = ref(false);


    const loggedIn = ref(false);
    const user = ref<User | null | undefined>(undefined);

    const setLoading = (newLoading: boolean) => {
        loading.value = newLoading;
    }

    const login = async () => {
        try {
            loading.value = true;
            const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

            setLoggedIn(user);
        } catch (err) {
            console.error(err);
            failed.value = true;
            loading.value = false;
        }
    }

    const logout = async () => {
        await signOut(auth);

        loggedIn.value = false;
        user.value = null;
    }

    const setLoggedIn = (newUser: User | null) => {
        failed.value = false;
        loading.value = false;

        if (!newUser) {
            loggedIn.value = false;
            user.value = null
            return;
        }

        loggedIn.value = true;
        user.value = newUser;
    }

    return { loading, setLoading, failed, loggedIn, user, login, logout, setLoggedIn }
})
