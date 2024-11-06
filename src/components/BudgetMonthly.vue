<template>
  <section class="flex justify-between mb-10 gap-x-5">
    <div>
        <h1>$ {{ monthlyBudget.toLocaleString() }}</h1>
        <p>Monthly Income</p>
    </div>
    <div>
        <h1>$ {{monthlyExpense.toLocaleString()}}</h1>
        <p>Monthly Expense</p>
    </div>
    <div>
        <h1>$ {{ balance.toLocaleString() }}</h1>
        <p>Monthly Balance</p>
    </div>
    <div>
        <h1>$ {{ monthlySaving.toLocaleString() }}</h1>
        <p>Monthly Saving</p>
    </div>
    <div>
        <h1>{{transactons}}</h1>
        <p>Monthly Transaction</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Expense } from '@/Interface/Interface';
import { ref, watch } from 'vue';

//reactive properties
const monthlyBudget = ref<number>(500);
const monthlyExpense = ref<number>(0);
const balance = ref<number>(monthlyBudget.value - monthlyExpense.value);
const monthlySaving = ref<number>(200);
const transactons = ref<number>(0);

//props
const prop = defineProps<{
    expenses:Expense[]
}>();

//methds
function getTotalExpense() {
    const totalSpent = prop.expenses.reduce((total, expense) => total + expense.amount, 0)
    monthlyExpense.value =  totalSpent;
    balance.value = monthlyBudget.value - monthlyExpense.value;
}

watch(prop.expenses, ()=>{
    transactons.value = prop.expenses.length;
    getTotalExpense();
})


</script>

<style scoped>
section > div {
    padding: 10px;
    text-align: center;
    width: 100%;
    border-radius: 20px;
}
section > div:first-child{
    background: rgb(3, 3, 184);
    color:white;
}
section > div > h1 {
    font-size: 30px;
}
section > div:nth-child(2){
    background: red;
    color: white;
}
section > div:nth-child(3){
    background: green;
    color: white;
}
section > div:nth-child(4){
    background: rgb(2, 182, 2);
    color: white;
}
section > div:nth-child(5){
    background: rgb(204, 3, 3);
    color: white;
}
</style>