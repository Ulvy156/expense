<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts"></script>

<style>
@import url('https://fonts.cdnfonts.com/css/gill-sans-mt-2');
body {
  font-family: 'Gill Sans MT', sans-serif;
}

.showEle {
  animation: showEle 0.3s ease-in-out forwards;
}
.hideEle {
  animation: hideEle 0.3s ease-in-out forwards;
}
@keyframes hideEle {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
    display: none;
  }
}
@keyframes showEle {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
