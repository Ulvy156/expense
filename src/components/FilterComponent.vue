<template>
<section class="my-10 flex justify-between">
    <input type="search" placeholder="filter by name..." class="p-2 border-2 outline-none rounded-md w-[35%]" v-model="filterName">
    <input type="number" placeholder="filter by price..." class="p-2 border-2 outline-none rounded-md w-[25%]" v-model.number="price">
    <select v-model="category" class="w-[25%] border-2 p-2 outline-none rounded-md">
      <option disabled value="">Filter by category</option>
      <option>Food</option>
      <option>Shopping</option>
      <option>Travel</option>
      <option>Rent</option>
    </select>
    <button class="bg-[green] text-white p-3 rounded-md" @click="addExpanse">Add New Expanse</button>
</section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { FilterType } from '@/Interface/Interface';

//reactive prperties
const filterName = ref<string>("");
const category = ref<string>("");
const price = ref<number>(0);

//emits
const emit = defineEmits<{
  (event: 'filter', filters: FilterType): void,
  (event: 'addExpense'): void,
}>();

function propFilters() {
    const allFilters:FilterType = {
        name: filterName.value,
        category: category.value,
        price: price.value
    }
    emit("filter", allFilters);
}
function addExpanse() {
  emit("addExpense");
}

//watch all properties
watchEffect(()=>{
    propFilters();
})


</script>