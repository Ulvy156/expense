<template>
    <div id="popUp"
        class="fixed max-h-[100vh]  overflow-y-auto showEle inset-0 bg-gray-900 bg-opacity-50 flex justify-center w-full items-center z-50">
        <!-- Modal Content -->
        <div class="bg-white px-6 pb-3 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto mx-auto">
            <h2 class="text-2xl sticky top-0 bg-white text-[green] font-bold p-2">Create Categories</h2>

            <!-- Modal Actions -->
            <div class="w-full gap-x-5">
                <section class="w-full grid grid-cols-1 gap-5 mb-10">
                    <div class="flex justify-between items-center" v-for="category in categoriesName" :key="category.id">
                        <input  :class="{'border-[red]' : isInvalidField(category.name)}"
                        type="text" placeholder="Expense name..." v-model="category.name" 
                        class="p-3 border-2 outline-none rounded-md w-11/12" />
                        <button @click="removeCategory(category.id)" class="rounded-full text-white h-5 w-5 bg-red-600 flex justify-center items-center">X</button>
                    </div>
                    <button class="bg-[green] text-white px-4 py-2 rounded w-full" @click="addNewCategory">Add More Category</button>
                </section>
                <div class="flex justify-between gap-x-5">
                    <p v-if="isCategoriesSaved" class="text-lg w-[40%] text-[green]">Categories saved</p>
                    <div class="gap-x-5 flex w-full justify-end">
                        <button @click="closeAddCategories" class="bg-red-500 text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button @click="saveCategories" class="bg-blue-500 text-white px-4 py-2 rounded">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
//interfaces
import type { Category } from '@/Interface/Interface';

//emits
const emit = defineEmits<{
    (event: 'addCategories', category: Category[]): void,
    (event: 'closeAddCategories'): void,
}>();

//reactive properties
const categoriesName = reactive<Category[]>([
    {
        id:generateId(),
        name:""
    }
]);
const isClickSaveBtn = ref<boolean>(false);
const isCategoriesSaved = ref<boolean>(false);
//methods
//save categories 
function saveCategories() {
    isClickSaveBtn.value = true;
    if(!isHasInvalidField()){
        emit('addCategories', categoriesName);
        isCategoriesSaved.value = true;
    }
    
}
//add new category input
function addNewCategory() {
    const category:Category = {
        id:generateId(),
        name:""
    }
    categoriesName.push(category)
}
//remove new category input
function removeCategory(id:string) {
    const index = categoriesName.findIndex(c => c.id === id);
    if(index !== -1) {
        categoriesName.splice(index, 1);
    }
}
//generate id
function generateId(): string {
    const chars = 'AB&CDEF-GHIJKLM$NOPQR[STUVW#XYZ@abc]defghijklmnopqrst?uvwx/yz0123456789'
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return id;
}

//close expanse
function closeAddCategories() {
    emit('closeAddCategories');
}

//check if has some fields valid
function isInvalidField(name:string = ""): boolean {
    return name.trim().length === 0 && isClickSaveBtn.value === true;
}
//check if has some fields valid
function isHasInvalidField():boolean {
    const index = categoriesName.findIndex(c => c.name.trim().length === 0);
    if(index !== -1){
        return true;
    }
    return false;
}


</script>
