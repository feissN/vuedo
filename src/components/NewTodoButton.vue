<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { ref } from "vue";
import AddNewTodo from "./AddNewTodo.vue";

const emit = defineEmits<{
    (event: "success"): void
}>()

const showDialog = ref(false);

const toggleNewTodoDialog = () => {
    showDialog.value = !showDialog.value
}

</script>

<template>
    <Dialog v-if="showDialog" @close="toggleNewTodoDialog">
        <AddNewTodo @success="emit('success')"/>
    </Dialog>

    <button @click="toggleNewTodoDialog">New todo</button>
</template>