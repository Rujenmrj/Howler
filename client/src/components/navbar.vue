<script setup>
defineProps({
    loggedIn:{
        type: Boolean,
        default: false
    },
    user: {
        type: Object,
        default: () => ({})
    }
})
const overlayform = () => {
  alert('This feature is not implemented yet. Please check back later!');
}
</script>
<template>
    <div class="w-full flex justify-between">
    <div class="w-16">
      <img src="/logo.png" alt="howler logo" class="mb-10 md:mb-0">
    </div>
    <div class="flex items-center" v-if="loggedIn">
      <button @click="overlayform" class="mr-10 rounded-xl bg-blue-400 px-8 py-2 font-bold text-white">Create Chat</button>
      <button @click="overlayform" class="mr-10 rounded-xl bg-blue-400 px-8 py-2 font-bold text-white">Join Chat</button>
    </div>
    <div class="flex items-center" v-else >
      <button @click="overlayform" class="mr-10 rounded-xl bg-blue-400 px-8 py-2 font-bold text-white">Login</button>
    </div>
  </div>
</template>