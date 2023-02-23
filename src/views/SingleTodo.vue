<script setup lang="ts">
import TodoCard from '@/components/TodoCard.vue';
import { db } from '@/firebase.config';
import type { TodoInterface } from '@/interfaces/todos.interface';
import router from '@/router';
import { deleteDoc, doc, getDoc, setDoc } from '@firebase/firestore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const todoId = route.params.id as string;

const todoItem = ref<TodoInterface>()

const loadTodoData = async () => {
    try {
        const docRef = doc(db, "todos", todoId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.warn("no data found")
            return;
        }

        todoItem.value = {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
            id: docSnap.id
        } as TodoInterface;
    } catch (err) {
        router.push("/todos")
        console.error(err);
    }
}

loadTodoData();

const handleUpdate = async (updatedTodo: TodoInterface) => {
    try {
        await setDoc(doc(db, "todos", todoId), updatedTodo);
        loadTodoData();
    } catch (err) {
        console.error(err);
    }
}

const handleDelete = async (id: string) => {
    try {
        const docToDelete = doc(db, "todos", id);
        await deleteDoc(docToDelete)
        router.push("/todos")
    } catch (err) {
        console.error(err)
    }
}

</script>

<template>
    <TodoCard v-if="todoItem" :todo="todoItem" :size="'big'" @update="handleUpdate" @delete="handleDelete" />
</template>