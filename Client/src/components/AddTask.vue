<template>
    <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-4">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Task</h2>

        
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Task Name</label
            >
            <input
              type="text"
              v-model="form.title"
              @keyup="validateTitle()"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Enter Task name "
              required
            />
            <span v-if="errorstring" class="errorcls">{{ errorstring }}</span>
              <button
              class="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Task
            </button>
          </div>
          </form>
          </div>
          </div>
          </section>

</template>
<script lang="ts" setup>
import { reactive,ref } from 'vue';
import { useToast } from 'vue-toastification';
import type { Task } from './types';
import axios from 'axios';
// @ts-ignore Vite provides import.meta.env at build time.
const apiUrl = import.meta.env.VITE_API_BASE_URL;
//const emit = defineEmits<{getTasks:[tasks:Task[]]}>();
const emit = defineEmits<{
  getTasks: [];
}>();

const form = reactive<{title:string}>({
   title: '',
});
const errorstring = ref<string>('');



const toast = useToast();

function validateTitle() {
  const title = String(form.title ?? '').trim();

  if (/^\d+$/.test(title)) {
    errorstring.value =
      'Please enter a valid task. Numbers only are not allowed.';
    return;
  }

  errorstring.value = '';
}

const handleSubmit = async () => {
const title = String(form.title ?? '').trim();

  const newTask = {
    title: title,
    type: "to-do",
  };


  try {
    //console.log(newTask);
   const response = await axios.post(`${apiUrl}/tasks`, newTask);
   emit("getTasks");
   toast.success('Task Added Successfully');
   form.title='';
   //router.push(`/jobs/${response.data.tas.id}`);
  } catch (error) {
    console.error('Error fetching job', error);
    toast.error('Task Was Not Added');
  }
};
</script>

<style scoped>
.errorcls{ color:#ff0000; font-size: 12px;}
</style>