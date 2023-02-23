<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginButton from "./components/LoginButton.vue";
import LogoutButton from "./components/LogoutButton.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase.config';
import { onBeforeUnmount } from 'vue';
import { useAuthStore } from './stores/auth';

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

    <div class="app">
        <header>
            <RouterLink to="/">
                <h1>Vuedo</h1>
            </RouterLink>
            <nav>
                <RouterLink to="/" :active-class="'active'">Home</RouterLink>
                <RouterLink to="/about" :active-class="'active'">About</RouterLink>
                <RouterLink v-if="authStore.loggedIn" to="/todos" :active-class="'active'">Todos</RouterLink>
                <LoginButton v-if="!authStore.loggedIn" />
                <LogoutButton v-if="authStore.loggedIn" />
            </nav>
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

        nav {
            display: flex;
            gap: 1rem;
            display: flex;
            align-content: center;

            a {
                display: flex;
                align-items: center;

                &.active {
                    color: gray;
                }
            }
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