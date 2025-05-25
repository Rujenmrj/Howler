<script setup>

import navbar from './components/navbar.vue';
import { reactive } from 'vue';
import { RouterView } from 'vue-router';

const state = reactive({
  user: {
    name: '',
    socketID: ''
  },
});
</script>

<template>
  <navbar :loggedIn="state.user.name != ''" />
  <RouterView />
  
</template>