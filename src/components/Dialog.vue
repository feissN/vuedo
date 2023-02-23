
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    (event: "close"): void
}>()

const dialogRef = ref<HTMLDivElement | null>(null);

const handleClick = (e: MouseEvent) => {
    const clickedElement = e.target as HTMLDivElement;

    if (clickedElement === dialogRef.value) {
        emit("close");
    }
}

</script>

<template>
    <div class="dialog" @click="handleClick" ref="dialogRef">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialog {
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    height: 100svh;
    top: 0;
    left: 0;

    backdrop-filter: brightness(80%);

    display: flex;
    align-items: center;
    justify-content: center;

    user-select: none;

    .content {
        user-select: unset;
    }
}
</style>