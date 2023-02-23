<template>
    <div class="loading-spinner">
        <div class="spinner"></div>
    </div>
</template>

<style scoped lang="scss">
.loading-spinner {
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

    .spinner {
        width: 100px;
        height: 100px;
        border-radius: 50%;

        border: 6px solid white;
        border-color: white transparent white transparent;
        animation: spin 1.2s linear infinite;

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    }
}
</style>