<template>
  <section class="w-[80%] m-auto mt-20">
    <component :is="InfoExpense" v-if="isAddNewTask" :categoriesProp="newCategories" @addNewTask="addNewTask" @close="isAddNewTask = false" />
    <component :is="FilterComponent" @addCategories="getCategories" @addExpense="isAddNewTask = true" @filter="getFilters" />
    <component :is="UpdateExpense" :categoriesProp="newCategories" v-if="isUpdateTask" :expense="expenseDataUpdate" @updateNewTask="updateExpense"
      @close="isUpdateTask = false" />
    <BudgetMonthly :expenses/>
    <component :is="PopUpConfirm" v-if="isDeleting"
    @cancel="isDeleting = false"
    @confirm="deleteExpense"
    />
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-md text-left max-h-[50vh] overflow-y-auto rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-md text-white uppercase bg-black">
          <tr>
            <th scope="col" class="px-6 py-3">Expense name</th>
            <th scope="col" class="px-6 py-3">Amount</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id"  class="odd:bg-gray-200 text-black showEle"
            :class="{ 'hideEle': !filterByName(expense.name) }">
            <td class="px-6 py-4">
              {{ expense.name }}
            </td>
            <td class="px-6 py-4">
              $ {{ expense.amount }}
            </td>
            <td class="px-6 py-4">
              {{ expense.category }}
            </td>
            <td class="px-6 py-4">
              {{ expense.date }}
            </td>
            <td class="px-6 py-4 gap-x-5 flex">
              <a @click="expenseToUpdate(expense)" class="font-medium text-blue-600 hover:underline">Edit</a>
              <a @click="idToDelete = expense.id; isDeleting = true" class="font-medium text-red-600 hover:underline">Delete</a>
            </td>
          </tr>
          <tr v-if="expenses.length" class="bg-black text-white">
            <td class="px-6 py-4" colspan="4">Total spent</td>
            <td class="px-6 py-4 bg-[green] text-lg" colspan="1">
              $ {{ getTotal.toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref } from 'vue';

//components
const FilterComponent = defineAsyncComponent(() => import('./FilterComponent.vue'));
const InfoExpense = defineAsyncComponent(() => import('./InfoExpense.vue'));
const UpdateExpense = defineAsyncComponent(() => import('./UpdateExpense.vue'));
const PopUpConfirm = defineAsyncComponent(() => import('./PopUpConfirm.vue'))

import BudgetMonthly from './BudgetMonthly.vue';
//interfaces
import type { Category, FilterType } from '@/Interface/Interface';
import type { Expense } from '@/Interface/Interface';

//properties
const expenses = reactive<Expense[]>([]);
const filters = ref<FilterType>({});
const isAddNewTask = ref<boolean>(false);
const isUpdateTask = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const idToDelete = ref<string>('');
const expenseDataUpdate = ref<Expense>({
  id: '',
  name: '',
  amount: 0,
  category: '',
  date: ''
});
const newCategories = ref<Category[]>([]);

//methods
function addNewTask(task: Expense) {
  expenses.unshift(task);
}
//fitler expense by name
function filterByName(name: string = ''): boolean {
  const propFilterName:string = filters.value?.name || '';
  if (propFilterName.length > 0) {
    return name.toLowerCase().includes(propFilterName.toLowerCase());
  }
  return true;
}
//get props filter from filter component
function getFilters(filterNames: FilterType) {
  filters.value = filterNames;
}
//get value to update
function expenseToUpdate(expense: Expense): void {
  expenseDataUpdate.value = expense;
  isUpdateTask.value = true;
}
//delete expense by id
function deleteExpense() {
  const index = expenses.findIndex((exp) => exp.id == idToDelete.value);
  if(index !== -1){
    expenses.splice(index, 1);
    isDeleting.value = false;
  }
}
//get categories props from filter
function getCategories(categoriesProp: Category[]) {  
  newCategories.value = categoriesProp;
  
}
//update expense by id
function updateExpense(expense: Expense) {
  const index: number = expenses.findIndex((e) => e.id === expense.id);
  if (expenses[index].id === expense.id) {
    expenses[index].name = expense.name;
    expenses[index].date = expense.date;
    expenses[index].amount = expense.amount;
    expenses[index].category = expense.category;
  }
}
//computed
const getTotal = computed(() => {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
});



</script>
