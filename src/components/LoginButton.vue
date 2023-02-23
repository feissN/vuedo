<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();


const handleLogin = () => {
    authStore.login();
}

</script>

<template>
    <button class="login" @click="handleLogin">
        Login with google
    </button>
</template>