<script setup lang="ts">
import TodoCard from "@/components/TodoCard.vue";
import { db } from "@/firebase.config";
import type { TodoInterface } from "@/interfaces/todos.interface";
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { ref } from "vue";

const authStore = useAuthStore();

// Handle route authentication (if the current user is actually logged in)
if (!authStore.loading && !authStore.loggedIn) {
    router.push("/home")
}
authStore.$subscribe((_mutation, state) => {
    if (!state.loading && !state.loggedIn) {
        router.push("/home")
        return;
    }

    loadTodos();
});

const todos = ref<TodoInterface[]>([]);

const loadTodos = async () => {
    if (!authStore.user) return;

    try {
        const coll = collection(db, "todos");
        const docs = await getDocs(query(coll, where("uid", "==", authStore.user.uid)));

        todos.value = [];
        docs.forEach((doc) => {
            const { content, createdAt, title, uid } = doc.data();
            todos.value.push({ content, createdAt: createdAt.toDate(), title, uid, id: doc.id });
        });
        todos.value.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    } catch (err) {
        console.error(err)
    }
}

const handleDelete = async (id: string) => {
    try {
        const docToDelete = doc(db, "todos", id);
        await deleteDoc(docToDelete)
        loadTodos();
    } catch (err) {
        console.error(err)
    }
}

loadTodos();
</script>

<template>
    <div class="todos-view">
        <button @click="router.push('/create')">New todo</button>

        <div class="todos">
            <TodoCard v-for="todo in todos" :todo="todo" @delete="handleDelete" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.todos-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .todos {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
}


@media screen and (max-width: 360px) {
    .todos-view {
        .todos {
            justify-content: center;
        }
    }
}
</style>