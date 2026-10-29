<script lang="ts" setup>
import type { TupleType } from 'typescript';
import type { TaskFilter } from './types';
import { defineProps,defineEmits,ref } from 'vue';

const props = defineProps<{
filter: TaskFilter;
activeFilter: TaskFilter;
}>();


const emit = defineEmits<{
    setFilter: [ filter : TaskFilter ]
}>();


</script>
<template>
    <button class="btn btn theme-secondary" @click="emit('setFilter',props.filter)"  :class="{ active: activeFilter === props.filter }">{{ props.filter }}</button>
</template>
