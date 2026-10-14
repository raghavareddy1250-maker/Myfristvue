<script setup>
import { RouterLink } from 'vue-router';
import JobListing from './JobListing.vue';
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  jobs: [],
  isLoading: true,
});

onMounted(async () => {
  console.log('Fetching jobs...');
  try {
    const response = await axios.get('/api/jobs');
    state.jobs = response.data;
    console.log('Fetched jobs:', state.jobs);
  } catch (error) {
    console.error('Error fetching jobs', error);
  } finally {
    console.log('Loading complete');
    state.isLoading = false;
  }
});
</script>

<template>
  <div>
    <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show job listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div> 
  </section>

    <section v-if="showButton" class="m-auto my-10 max-w-lg px-6">
      <RouterLink
        to="/jobs"
        class="block rounded-xl bg-black px-6 py-4 text-center text-white hover:bg-gray-700"
      >
        View All Jobs
      </RouterLink>
    </section>
  </div>
  
</template>
