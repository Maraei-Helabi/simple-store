<script setup>
import { ref, reactive } from "vue";
import { useProductsStore } from "~/stores/products";

const productsStore = useProductsStore();
const loading = productsStore.loading;

const dialog = defineModel("dialog");
const form = ref(null);

const formData = reactive({
  title: "",
  price: "",
  description: "",
  category: "",
  image: ""
});

const handleAdd = async () => {
  await productsStore.AddProduct({
    ...formData,
    price: parseFloat(formData.price)
  });
  // إعادة تعيين الحقول
  Object.keys(formData).forEach(key => formData[key] = "");
  dialog.value = false;
};
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
          إضافة منتج
        </v-card-title>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="flat"
          @click="closeDialog()"
        />
      </v-row>
      <v-form ref="form" @submit.prevent="handleAdd">
        <v-card-text style="justify-content: center">
          <v-text-field
            label="اسم المنتج"
            variant="outlined"
            v-model.trim="formData.title"
            density="compact"
            color="primary"
            class="my-2"
          ></v-text-field>
          <v-text-field
            label="السعر"
            variant="outlined"
            v-model.trim="formData.price"
            density="compact"
            color="primary"
            type="number"
            class="my-2"
          ></v-text-field>
          <v-text-field
            label="الوصف"
            variant="outlined"
            v-model.trim="formData.description"
            density="compact"
            color="primary"
            class="my-2"
          ></v-text-field>
          <v-combobox
            label="التصنيف"
            required
            :items="productsStore.getCategories"
            variant="outlined"
            v-model="formData.category"
            density="compact"
            color="primary"
            :return-object="false"
            class="my-2"
          ></v-combobox>
          <v-text-field
            label="رابط الصورة"
            variant="outlined"
            v-model.trim="formData.image"
            density="compact"
            color="primary"
            class="my-2"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="closeDialog()" class="ml-3">إغلاق</v-btn>
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            :loading="loading"
          >حفظ</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
