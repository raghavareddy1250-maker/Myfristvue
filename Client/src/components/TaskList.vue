
<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Task } from './types';
 
const props = defineProps<{ tasks:Task[]}>();
const emit = defineEmits<{ toggleDone: [id : number], deleteTask:[id:number]}>();
</script>    

<template>
     <div class="task-list py-10" >
    <article class="animate-fade-in opacity-0 toast-slide alert alert-info list-group animate" 
    v-for=" (task, index) in props.tasks" :key="task.id"    
      :style="{ animationDelay: `${index * 300}ms` }"   
            >
        <label class="form-group list-group-item">
          <input
  class="form-check-input me-1"
  @change="emit('toggleDone', task.id)"
  type="checkbox"
  :checked="task.type === 'done'"
/>
             <span :class="task.type">  {{ task.title }} </span>
             <span class="delete" @click.prevent.stop="emit('deleteTask',task.id)"> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<linearGradient id="nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1" x1="18.405" x2="33.814" y1="10.91" y2="43.484" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#32bdef"></stop><stop offset="1" stop-color="#1ea2e4"></stop></linearGradient><path fill="url(#nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1)" d="M39,10l-2.835,31.181C36.072,42.211,35.208,43,34.174,43H13.826	c-1.034,0-1.898-0.789-1.992-1.819L9,10H39z"></path><path fill="#0176d0" d="M32,7c0-1.105-0.895-2-2-2H18c-1.105,0-2,0.895-2,2c0,0,0,0.634,0,1h16C32,7.634,32,7,32,7z"></path><path fill="#007ad9" d="M7,9.886L7,9.886C7,9.363,7.358,8.912,7.868,8.8C10.173,8.293,16.763,7,24,7s13.827,1.293,16.132,1.8	C40.642,8.912,41,9.363,41,9.886v0C41,10.501,40.501,11,39.886,11H8.114C7.499,11,7,10.501,7,9.886z"></path>
</svg></span>
        </label>
       
    </article>

   

    </div>
    
</template>

<style scoped>
.done{
    text-decoration: line-through;
}
.delete{margin-left: auto; cursor: pointer;

}
.list-group-item {
  display: flex;
  align-items: center;
}

.alert {
    position: relative;
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
}
.alert-info {
    color: #055160;
    background-color: #cff4fc;
    border-color: #b6effb;
}

.alert label{ text-transform: capitalize;}



.form-check-input:checked {
    background-color: #00bce4;
    border-color: #00bce4;
}.form-check-input[type=checkbox] {
    border-radius: .25em;
}
.toast-slide {
  --bs-toast-transition-property: opacity, transform, display;
  --bs-toast-transition-duration: .3s;
  --bs-toast-transition-timing: ease-out;
  transform: translateY(1rem);
}
.toast-slide.show {
  transform: none;
}


.form-check-input {
    width: 1em;
    height: 1em;
    margin-top: .25em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0,0,0,.25);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
}
.form-check-input:checked[type=checkbox] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>