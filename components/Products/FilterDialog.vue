<script setup>
import { ref } from "vue";
import { useProductsStore } from "~/stores/products";

const dialog = defineModel("dialog");
// const categories = defineProps({ categories: Array }); // مرر التصنيفات من الأب
const emit = defineEmits(["filter"]);
const productsStore = useProductsStore();

const filterData = ref({
  category: "",
  priceFrom: "",
  priceTo: "",
  ratingFrom: "",
  ratingTo: ""
});

function applyFilter() {
//   emit("filter", { ...filterData.value });
  emit("filter", filterData);
  dialog.value = false;
}
onMounted(async ()=>{
    await productsStore.GetProductsCategory();
})
function closeDialog() {
  dialog.value = false;
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-row class="ma-0 justify-space-between align-center px-2">
        <v-card-title style="text-align: center; color: black">
          فلترة المنتجات
        </v-card-title>
        <v-btn icon="mdi-close" size="small" variant="flat" @click="closeDialog()" />
      </v-row>
      <v-form @submit.prevent="applyFilter">
        <v-card-text>
          <v-combobox
            label="التصنيف"
            :items="productsStore.getCategories"
            variant="outlined"
            v-model="filterData.category"
            density="compact"
            color="primary"
            :return-object="false"
            :loading="productsStore.loading"
            class="my-2"
          ></v-combobox>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="السعر من"
                v-model="filterData.priceFrom"
                type="number"
                variant="outlined"
                density="compact"
                color="primary"
                class="my-2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="السعر إلى"
                v-model="filterData.priceTo"
                type="number"
                variant="outlined"
                density="compact"
                color="primary"
                class="my-2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="التقييم من"
                v-model="filterData.ratingFrom"
                type="number"
                variant="outlined"
                density="compact"
                color="primary"
                class="my-2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="التقييم إلى"
                v-model="filterData.ratingTo"
                type="number"
                variant="outlined"
                density="compact"
                color="primary"
                class="my-2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="closeDialog()" class="ml-3">إغلاق</v-btn>
          <v-btn type="submit" color="primary" variant="flat">تطبيق الفلتر</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
