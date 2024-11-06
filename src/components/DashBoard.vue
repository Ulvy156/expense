<template>
  <section class="w-[80%] m-auto mt-20">
    <component :is="InfoExpense" v-if="isAddNewTask" @addNewTask="addNewTask" @close="isAddNewTask = false" />
    <component :is="FilterComponent" @addExpense="isAddNewTask = true" @filter="getFilters" />
    <component :is="UpdateExpense" v-if="isUpdateTask" :expense="expenseDataUpdate" @updateNewTask="updateExpense"
      @close="isUpdateTask = false" />
    <BudgetMonthly :expenses/>
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
        <tbody c>
          <tr v-for="expense in expenses" :key="expense.id"  class="odd:bg-gray-200 text-black showEle"
            :class="{ 'hideEle': !filterByName(expense.name) && filterName.length > 0 }">
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
              <a @click="deleteExpense(expense.id)" class="font-medium text-red-600 hover:underline">Delete</a>
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
import BudgetMonthly from './BudgetMonthly.vue';
//interfaces
import type { FilterType } from '@/Interface/Interface';
import type { Expense } from '@/Interface/Interface';

//properties
const expenses = reactive<Expense[]>([])
const filterName = ref<string>("");
const filters = ref<FilterType>({});
const isAddNewTask = ref<boolean>(false);
const isUpdateTask = ref<boolean>(false);
const expenseDataUpdate = ref<Expense>({
  id: '',
  name: '',
  amount: 0,
  category: '',
  date: ''
});

//methods
function addNewTask(task: Expense) {
  expenses.unshift(task);
}
//fitler expense by name
function filterByName(name: string): boolean {
  return name.toLowerCase().includes(filterName.value.toLowerCase());
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
function deleteExpense(id: string) {
  const index = expenses.findIndex((exp) => exp.id == id);
  if(index !== -1){
    expenses.splice(index, 1);
  }
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
