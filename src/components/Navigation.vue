<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted, onUnmounted, ref } from 'vue';
import LoginButton from './LoginButton.vue';
import LogoutButton from './LogoutButton.vue';

const authStore = useAuthStore();

const smallerWidth = ref(window.innerWidth < 400);
const isMenuCollapsed = ref(false);

const onResize = () => {
    smallerWidth.value = window.innerWidth < 400;
}

onMounted(() => {
    window.addEventListener('resize', onResize);
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
})

</script>

<template>
    <div :class="`navigation ${smallerWidth ? 'smaller' : ''}`">
        <div v-if="smallerWidth" :class="`burger ${isMenuCollapsed ? 'collapsed' : ''}`"
            @click="isMenuCollapsed = !isMenuCollapsed">
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
        </div>
        <nav :class="isMenuCollapsed ? 'visible' : 'hidden'">
            <RouterLink @click="isMenuCollapsed = false" to="/home" :active-class="'active'">Home</RouterLink>
            <RouterLink @click="isMenuCollapsed = false" to="/about" :active-class="'active'">About</RouterLink>
            <RouterLink @click="isMenuCollapsed = false" v-if="authStore.loggedIn" to="/todos" :active-class="'active'">Todos
            </RouterLink>
            <LoginButton v-if="!authStore.loggedIn" />
            <LogoutButton v-if="authStore.loggedIn" />
        </nav>
    </div>
</template>

<style scoped lang="scss">
.navigation {
    a {
        text-decoration: none;
        color: black;
        display: flex;
        align-items: center;

        &.active {
            color: gray;
        }
    }


    nav {
        display: flex;
        gap: 1rem;
        display: flex;
        align-content: center;
    }

    &.smaller {
        .burger {
            position: relative;
            z-index: 250;
            cursor: pointer;
            min-width: 50px;
            min-height: 50px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            position: relative;
            gap: 0.5rem;

            .stripe {
                height: 4px;
                width: 100%;
                background-color: black;
                transition-property: transform opacity;
                transition-duration: 100ms;
                transition-timing-function: ease;
            }

            &.collapsed {
                .stripe:nth-child(1) {
                    transform: translateY(0.75rem) rotate(45deg);
                }

                .stripe:nth-child(2) {
                    opacity: 0;
                }

                .stripe:nth-child(3) {
                    transform: translateY(-0.75rem) rotate(-45deg);
                }
            }
        }

        nav {
            z-index: 200;
            border-top: 3px solid black;
            background-color: lightgrey;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            height: 100svh;
            flex-direction: column;
            align-items: unset;
            transition: left 200ms ease;
            font-size: 2rem;
            padding: 1rem;
            padding-top: 5rem;

            a {
                display: flex;
                align-items: center;
                justify-content: center;

            }

            &.hidden {
                left: 100vw;
            }
        }
    }
}
</style>