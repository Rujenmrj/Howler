<script setup>
import { io } from 'socket.io-client';
import { onMounted, reactive } from 'vue';
import axios from 'axios';


const isdev = true;

const API_URL = !isdev ? 'https://howls.rujenm.com.np/':'http://localhost:3000/';

const socket = io('https://howls.rujenm.com.np');
const state = reactive({
  tosend: '',
  received : [],
  room: '',
});


onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  axios.get(`${API_URL}chat/global`, { timeout: 10000 })
    .then(response => { 
      state.received = response.data;
      console.log('Fetched messages:', state.received);
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
});
socket.on('receive', (data) => {
  state.received.unshift(data);
});
const send = () => {
  if (state.tosend !== '') {
    socket.emit('send', state.tosend);
    state.tosend = '';
  }
}
</script>

<template>
    <form @submit.prevent="send" class="flex md:flex-row flex-col items-center justify-center">
    <input type="text" class="text-black outline-none text-3xl bg-gray-200 rounded-lg p-2 w-full mx-5 md:w-2/5" placeholder="Awoooooo" v-model="state.tosend" />
    <button type="submit" class="rounded-lg bg-blue-400 px-8 py-2 m-10 font-bold text-white">Howl</button>
  </form>

  <div class="flex md:items-center justify-center text-4xl mt-10 flex-col">
     <div class="flex flex-col md:w-2/4 p-10 gap-y-4">
       <span v-for="text in state.received" :key="text"  class="bg-gray-600/50 rounded-xl inline py-3 px-3">
        <span class="font-extrabold pb-1 block">{{ text.poster.socketID }}</span><br>
        {{ text.message }}
      </span>
     </div>
  </div>
</template>