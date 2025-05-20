<script setup>
import { io } from 'socket.io-client';
import { computed, onMounted, reactive } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/messages';

const fetchMessages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

const socket = io('http://localhost:3000');
const state = reactive({
  message: 'Hello from Vue 3',
  tosend: '',
  received : [],
});

const reversedMessages = computed(() => {
  return [...state.received].reverse();
});

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('message', (message) => {
    console.log('Received message from server:', message);
    state.message = message;
  });



});
socket.on('receive', (data) => {
  console.log(`Received message: ${data}`);
  state.received.push(data);
});
const send = () => {
  if (state.tosend !== '') {
    socket.emit('send', state.tosend);
    console.log('Sent message:', state.tosend);
    state.tosend = '';
  }
}
</script>

<template>
  <div class="w-16">
    <img src="/logo.png" alt="howler logo" class="filter invert">
  </div>

  <form @submit.prevent="send" class="flex items-center justify-center">
    <input type="text" class="text-black outline-none text-3xl " v-model="state.tosend" />
    <button type="submit">Howl</button>
  </form>
  

  <div class="flex items-center justify-center text-4xl mt-10 flex-col">
     <div class="flex flex-col w-1/4">
       <span v-for="text in reversedMessages" :key="text"  class="">{{ text }}</span>
     </div>
  </div>
</template>