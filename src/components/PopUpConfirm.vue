<template>
  <div id="popUp" class="fixed showEle inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <!-- Modal Content -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Are u sure ?</h2>

      <!-- Modal Actions -->
      <div class="flex justify-end w-full gap-x-5">
        <button @click="onClickCancel" class="bg-red-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
        <button @click="onClickConfirm" class="bg-blue-500 text-white px-4 py-2 rounded">
          Confirm
        </button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

//define emits
const emit = defineEmits(['cancel', 'confirm'])

function onClickCancel() {
  emit('cancel')
}
function onClickConfirm() {
  emit('confirm')
}
</script>
