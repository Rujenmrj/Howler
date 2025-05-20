<script setup>
import { io } from 'socket.io-client';
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import axios from 'axios';

// const API_URL = 'http://localhost:3000/api/messages';

// const fetchMessages = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return [];
//   }
// };

const socket = io('https://howls.rujenm.com.np');
const state = reactive({
  messages: [],
  tosend: '',
  received : [],
  isSeeder: true,
  room: '',
});

const reversedMessages = computed(() => {
  return [...state.received].reverse();
});

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to server');
  });
});
socket.on('receive', (data) => {
  state.received.push(data);
});
const send = () => {
  if (state.tosend !== '') {
    socket.emit('send', state.tosend);
    state.tosend = '';
  }
}

const overlayform = () => {
  state.room = 'customroom'
  socket.emit('join', state.room);
}
</script>

<template>
  <div class="w-full flex justify-between">
    <div class="w-16">
      <img src="/logo.png" alt="howler logo" class="mb-10 md:mb-0">
    </div>
    <div class="flex items-center">
      <button @click="overlayform" class="mr-10 rounded-xl bg-blue-400 px-8 py-2 font-bold text-white">Create Chat</button>
    </div>
  </div>

  <form @submit.prevent="send" class="flex md:flex-row flex-col items-center justify-center">
    <input type="text" class="text-black outline-none text-3xl bg-gray-200 rounded-lg p-2 w-full mx-5 md:w-2/5" placeholder="Awoooooo" v-model="state.tosend" />
    <button type="submit" class="rounded-lg bg-blue-400 px-8 py-2 m-10 font-bold text-white">Howl</button>
  </form>
  

  <div class="flex md:items-center justify-center text-4xl mt-10 flex-col">
     <div class="flex flex-col md:w-2/4 p-10 gap-y-4">
       <span v-for="text in reversedMessages" :key="text"  class="bg-gray-600/50 rounded-xl inline py-3 px-3">{{ text }}</span>
     </div>
  </div>
</template>