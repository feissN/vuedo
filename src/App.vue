<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navigation from "./components/Navigation.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase.config';
import { onBeforeUnmount } from 'vue';
import { useAuthStore } from './stores/auth';
import ReloadPWAVue from './components/ReloadPWA.vue';

const authStore = useAuthStore();

const unsub = onAuthStateChanged(auth, (user) => {
    authStore.setLoggedIn(user);
});

onBeforeUnmount(() => {
    unsub();
});

</script>

<template>
    <LoadingSpinner v-if="authStore.loading" />
    <ReloadPWAVue />

    <div class="app">
        <header>
            <RouterLink to="/">
                <h1>Vuedo</h1>
            </RouterLink>
            <Navigation />
        </header>

        <main>
            <RouterView />
        </main>
    </div>
</template>

<style scoped lang="scss">
.app {
    font-family: sans-serif;
    min-height: 100vh;
    min-height: 100svh;
    background-color: #f2f2f2;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;

        a {
            text-decoration: none;
            color: black;
        }
    }

    main {
        padding: 3rem;
    }
}

@media screen and (max-width: 360px) {
    .app {
        main {
            padding: 1rem;
        }
    }
}
</style>