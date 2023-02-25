<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import Dialog from "@/components/Dialog.vue";
const { needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
    needRefresh.value = false;
}
</script>

<template>
    <Dialog v-if="needRefresh">
        <div class="reload-available">
            <h3>Update available</h3>
            <div class="buttons">
                <button @click="updateServiceWorker()" class="button">
                    Reload
                </button>
                <button @click="close" class="button">
                    Close
                </button>
            </div>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
.reload-available {
    background-color: white;
    padding: 1rem;
    font-family: sans-serif;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .buttons {
        display: flex;
        justify-content: space-between;
    }
}
</style>