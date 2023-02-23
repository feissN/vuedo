<script setup lang="ts">
import LoginButton from '@/components/LoginButton.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const navigateToTodos = () => {
    router.push('/todos');
}
</script>

<template>
    <div class="home">
        <div class="header">
            <h1>Welcome to Vuedo</h1>
            <h2>A simple markdown notes app using Vue3</h2>
            <RouterLink class="about-link" to="/about">
                <h4>More Infos</h4>
            </RouterLink>
        </div>

        <div class="logged-in" v-if="authStore.user">
            <h3>Hello {{ authStore.user.displayName }}</h3>
            <button @click="navigateToTodos">View your Todos</button>
        </div>

        <div class="get-started" v-if="!authStore.user">
            <h3>Please login to get started!</h3>
            <LoginButton />
        </div>
    </div>
</template>

<style scoped lang="scss">
.home {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    flex-direction: column;
    gap: 1rem;

    .about-link {
        color: black;
    }

    .get-started {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        button {
            font-size: 1.25rem;
            padding: 1.25rem;
        }
    }
}
</style>