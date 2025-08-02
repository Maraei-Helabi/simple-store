<template>
    <!-- الادوات -->
    <v-row class="mb-4 align-center" justify="space-between">

        <v-col cols="12" md="4" class="text-right">
            <v-btn color="primary" @click="openAddDialog()" prepend-icon="mdi-plus" elevation="2">
                إضافة منتج
            </v-btn>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="بحث" hide-details dense outlined
                rounded :clearable="true" @click:clear="clearFiltering()" color="primary"></v-text-field>
        </v-col>


        <v-col cols="12" md="4" class="text-left">
            <v-btn color="secondary" @click="openFilterDialog()" prepend-icon="mdi-filter-variant" elevation="2">
                فلترة
            </v-btn>
        </v-col>
    </v-row>
        <AddDialog v-model:dialog="addDialog"/>
        <FilterDialog v-model:dialog="filterDialog" @filter="setFilter"/>

</template>

<script setup>
import AddDialog from '~/components/Products/AddDialog.vue';
import FilterDialog from '~/components/Products/FilterDialog.vue';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();
const addDialog = ref(false);
const filterDialog = ref(false);
const filterData = ref(false);
const search = ref("");
let searchTimeout = null;

function openAddDialog() {
  addDialog.value = true;
}
function openFilterDialog() {
  filterDialog.value = true;
}
function setFilter(filter) {
  filterData.value = filter.value;
  filtering()
}
function filtering() {
  productsStore.FilterProducts(search.value || "", filterData.value);
}
function clearFiltering() {
  // إذا كان البحث فارغ أو null ولا يوجد فلترة، فقط جلب كل المنتجات
//   const isSearchEmpty = !search.value || search.value === '';
//   const isFilterEmpty = !filterData.value || Object.values(filterData.value).every(v => v === '' || v === null || v === undefined);
//   if (isSearchEmpty && isFilterEmpty) {
//     productsStore.GetAllProducts();
//   }
      if (!search.value && !filterData.value) {
        console.log("clearFiltering");
    productsStore.GetAllProducts();
  }
}

watch(search, (val) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    filtering();
  }, 500);
});
</script>

<style></style>