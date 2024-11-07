<template>
<section class="my-10 flex justify-between">
    <input type="search" placeholder="filter by name..." class="p-2 border-2 outline-none rounded-md w-[35%]" v-model="filterName">
    <input type="number" placeholder="filter by price..." class="p-2 border-2 outline-none rounded-md w-[25%]" v-model.number="price">
    <button class="bg-[green] text-white p-3 rounded-md" @click="addExpanse">Add New Expanse</button>
    <button class="bg-[green] text-white p-3 rounded-md" @click="addCategory">Add New Category</button>
    <component :is="AddNewCategory" v-if="isAddNewCategories"
    @closeAddCategories="isAddNewCategories = false"
    @addCategories="addNewCategories"
     />
</section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watchEffect } from 'vue';
import type { Category, FilterType } from '@/Interface/Interface';
//components
const AddNewCategory = defineAsyncComponent(() => import('./AddNewCategory.vue'))
//reactive prperties
const filterName = ref<string>("");
const category = ref<string>("");
const price = ref<number>(0);
const isAddNewCategories = ref<boolean>(false);

//emits
const emit = defineEmits<{
  (event: 'filter', filters: FilterType): void,
  (event: 'addExpense'): void,
  (event: 'addCategories',categories: Category[]): void,
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
function addCategory() {
  isAddNewCategories.value = true;
}
//add new categories
function addNewCategories(categoriesProp: Category[]) {
  emit('addCategories', categoriesProp);
}
//watch all properties
watchEffect(()=>{
    propFilters();
})


</script>