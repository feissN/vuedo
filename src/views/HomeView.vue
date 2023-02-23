<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const navigateToTodos = () => {
    router.push('/todos');
}


</script>

<template>
    <div class="home">
        <h1>Home</h1>

        <div class="logged-in" v-if="authStore.user">
            <h3>Hello {{ authStore.user.displayName }}</h3>
            <button @click="navigateToTodos">View your Todos</button>
        </div>
    </div>
</template>