<template>
    <div id="popUp"
        class="fixed showEle inset-0 bg-gray-900 bg-opacity-50 flex justify-center w-full items-center z-50">
        <!-- Modal Content -->
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/2  mx-auto">
            <h2 class="text-2xl text-[green] font-bold mb-4">Create Expense</h2>

            <!-- Modal Actions -->
            <div class="w-full gap-x-5">
                <section class="w-full grid grid-cols-2 gap-5 mb-10">
                    <input :class="{ 'border-[red]': isExpenseValid }" type="text" placeholder="Expense name..."
                        v-model="expenseName" class="p-3 border-2 outline-none rounded-md " />
                    <input :class="{ 'border-[red]': isPriceValid }" type="number" placeholder="Expense pice..."
                        v-model="amount" class="p-3 border-2 outline-none rounded-md " />
                    <select :class="{ 'border-[red]': isCategoryValid }" v-model="category"
                        class=" border-2 p-3 outline-none rounded-md">
                        <option disabled value="">Select category</option>
                        <option v-for="category in categories" :key="category.id">{{ category.name }}</option>
                    </select>
                    <input :class="{ 'border-[red]': isDateValid }" type="date" placeholder="Expense name..."
                        v-model="date" class="p-3 border-2 outline-none rounded-md" />
                </section>
                <div class="flex justify-end gap-x-5">
                    <p v-if="isUpdateSuccess" class="text-lg w-[40%] text-[green]">Update succesfully</p>
                    <div class="flex gap-x-5 w-full  justify-end">
                        <button @click="closeExpanse" class="bg-red-500 text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button @click="addExpanse" class="bg-blue-500 text-white px-4 py-2 rounded">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
//interfaces
import type { Category, Expense } from '@/Interface/Interface';

//emits
const emit = defineEmits<{
    (event: 'updateNewTask', expense: Expense): void,
    (event: 'close'): void,
}>();

const prop = defineProps<{
    expense: Expense,
    categoriesProp: Category[]

}>();

//reactive properties
const expenseName = ref<string>(prop.expense.name);
const amount = ref<string>(prop.expense.amount?.toString());
const category = ref<string>(prop.expense.category);
const date = ref<string>(prop.expense.date);
const isExpenseValid = ref<boolean>(false);
const isPriceValid = ref<boolean>(false);
const isCategoryValid = ref<boolean>(false);
const isDateValid = ref<boolean>(false);
const categories = reactive<Category[]>([
    {
        id: "fdser324Sfds",
        name: "Food"
    },
    {
        id: "fdsxwr324Sfdx",
        name: "Shopping"
    },
    {
        id: "aqsxwr324Sfdp",
        name: "Travel"
    },
    {
        id: "klqsxcjr324Sfdp",
        name: "Rent"
    }
]);
const isUpdateSuccess = ref<boolean>(false);
//methods
//add expanse 
function addExpanse(): void {
    validateInput();

    if (!hasInvalidField()) {
        const expense: Expense = {
            id: prop.expense.id,
            name: expenseName.value,
            amount: parseFloat(amount.value),
            category: category.value,
            date: date.value
        }
        emit('updateNewTask', expense);
        isUpdateSuccess.value = true;
    }
}

//close expanse
function closeExpanse() {
    emit('close');
}

//check if has some fields valid
function hasInvalidField(): boolean {
    const validFields = [isExpenseValid.value, isPriceValid.value, isCategoryValid.value, isDateValid.value];
    return validFields.some(value => value === true);
}

//check if required fields are not meet requirements
function validateInput(): void {
    if (expenseName.value.trim().length < 3) {
        isExpenseValid.value = true;
    } else {
        isExpenseValid.value = false;
    }
    if (amount.value.length < 1) {
        isPriceValid.value = true;
    } else {
        isPriceValid.value = false;
    }
    if (category.value.trim().length < 3) {
        isCategoryValid.value = true;
    } else {
        isCategoryValid.value = false;
    }
    if (date.value.trim().length < 1) {
        isDateValid.value = true;
    } else {
        isDateValid.value = false;
    }
}

//mouted()
onMounted(() => {
    prop.categoriesProp.forEach((newC) => {
        categories.push(newC);
    })
})
</script>
