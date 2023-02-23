<script setup lang="ts">
import { db } from '@/firebase.config';
import { useAuthStore } from '@/stores/auth';
import { addDoc, collection } from '@firebase/firestore';
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
    (event: "success"): void,
    (event: "failure"): void
}>()

const titleElementRef = ref<HTMLInputElement | null>(null);
const title = ref("");
const content = ref("");

const authStore = useAuthStore();

const addNewTodo = async () => {
    if (!authStore.user || !title.value) return;
    try {
        const todosCollection = collection(db, "todos")

        const data = {
            title: title.value,
            content: content.value,
            uid: authStore.user.uid,
            createdAt: new Date(),
        };

        await addDoc(todosCollection, data);

        title.value = "";
        content.value = "";

        emit("success");
    } catch (err) {
        emit("failure");
    }
}

onMounted(() => {
    titleElementRef.value?.focus();
})

</script>

<template>
    <form @submit.prevent="addNewTodo()">
        <h3>Add new Todo</h3>
        <input type="text" placeholder="Title" v-model="title" ref="titleElementRef">
        <textarea type="text" placeholder="Content" v-model="content"></textarea>
        <button>Add</button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    background-color: white;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.25rem;
}
</style>