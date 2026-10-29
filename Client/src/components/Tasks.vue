<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import AddTask from './AddTask.vue';
import TaskList from './TaskList.vue';
import FilterButton from './FilterButton.vue';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import type { Task,TaskFilter } from './types';

import { useToast } from 'vue-toastification';


const message = ref("Tasks App");
const newTask = ref("");
const tasks = reactive<Task[]>([]);
const isLoading = ref<boolean>(true);
const activeFilter = ref<TaskFilter>('all');

async function getTasks(): Promise<void> {
  try {  
    const response = await axios.get(`${apiUrl}/tasks`);
  tasks.splice(0, tasks.length, ...response.data.tasks);
    console.log(tasks);
  } catch (error) {
    console.error("Error fetching tasks", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getTasks();
});
const toast = useToast();
async function toggleDone(id:number){
    const task = tasks.find((task) => task.id === id );
    if(task){
        if(task.type === 'to-do'){
            task.type ='done';
        }else{
            task.type ='to-do'; 
        }
        const updatedTask = {    title: task.title,    type: task.type    };

                try {
                    const response = await axios.put(`${apiUrl}/tasks/${id}`, updatedTask);
                    //console.log('Job updated:', response.data);
                    toast.success('Task Updated Successfully');    
                } catch (error) {
                    console.error('Error fetching job', error);
                    toast.error('Job Was Not Added');
                }
        }
 
}
async function deleteTask(id:number){
    console.log("task id:" + id);
     try{
        const confirm = window.confirm('Are you sure you want to delete this task?');
        if(confirm){
            await axios.delete(`${apiUrl}/tasks/${id}`);
            toast.success('Task successfully deleted');
            //router.push('/jobs');
             getTasks();
        }

    }catch(error){
       // console.error('Task not deleted due to',error);
  toast.error('Task not deleted. Please try again!');
    }
}

const totalDone = computed(()=>
    tasks.reduce((total,task) => task.type === 'done' ? total+1 : total,0));

 const filter = ref<TaskFilter>('all');  
 
 function setFilter( value : TaskFilter){
    filter.value = value;
activeFilter.value = value;
 }
 const filteredTasks = computed( ()=>{
    switch(filter.value){
        case "all" :
        return tasks;
        case "todo" :
         return tasks.filter((task) => task.type === 'to-do');
         case "done":
            return tasks.filter((task) => task.type === 'done');  
    }
    return tasks;
 })


</script>
<template>
    <main>
        
        <AddTask @get-tasks="getTasks"/>
       <section class="bg-green-50">
            <div class="container m-auto max-w-2xl py-4">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0" >
                <h3 v-if="!tasks.length">Please add task list</h3>
                <h3 v-else> {{totalDone}} / {{ tasks.length }}  tasks completed</h3>

                    <div v-if="tasks.length" class="button-container btn-group">
                        <FilterButton @set-filter="setFilter" filter="all"  :active-filter="activeFilter"></FilterButton>
                        <FilterButton @set-filter="setFilter" filter="todo" :active-filter="activeFilter"></FilterButton>
                        <FilterButton @set-filter="setFilter" filter="done" :active-filter="activeFilter"></FilterButton>
                        </div>
                    <!-- Loader is loading if isLoading is set to true-->
                        <div v-if="isLoading" class="text-center text-gray-500 py-6">
                            <PulseLoader/>
                        </div>
                    <!-- Job listing disply when done loading-->
                    <div v-else class="grid grid-cols-1 gap-6">
                    <TaskList :tasks="filteredTasks" @toggle-done="toggleDone" @delete-task="deleteTask"/>
                    </div>

            </div>
            </div>
        </section>


       
    </main>
</template>
<style>
.btn-group{
    display: flex;
    justify-content: end;
}
.btn-group .btn{ margin-left: 10px;  padding: 5px 10px; border-radius: 5px;
    background-color:#ccc; cursor: pointer; text-transform: capitalize;
}
.btn-group .btn.active{
     background-color:#000;  color:#fff;
    
}
</style>
 