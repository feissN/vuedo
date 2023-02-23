<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
}

</script>

<template>
    <button class="logout" @click="handleLogout">
        Logout
    </button>
</template>