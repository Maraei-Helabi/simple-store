<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useProductsStore } from "~/stores/products";

const productsStore = useProductsStore();
const loading = productsStore.loading;
const dialog = defineModel("dialog");
const form = ref(null);
const props = defineProps({ item: Object });

const formData = reactive({
  title: "",
  price: "",
  description: "",
  category: "",
  image: ""
});

watch(() => props.item, (value) => {
  if (value) {
    formData.title = value.title || "";
    formData.price = value.price?.toString() || "";
    formData.description = value.description || "";
    formData.category = value.category || "";
    formData.image = value.image || "";
  }
});

const handleEdit = async () => {
  await productsStore.UpdateProduct(props.item.id, {
    ...formData,
    price: parseFloat(formData.price)
  });
  dialog.value = false;
};

onMounted(async () => {
  await productsStore.GetProductsCategory();
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-row class="ma-0 justify-space-between align-center px-2">
        <v-card-title style="text-align: center; color: black">
          تعديل منتج
        </v-card-title>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="flat"
          @click="dialog.value = false"
        />
      </v-row>
      <v-form ref="form" @submit.prevent="handleEdit">
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
          <v-btn @click="dialog.value = false" class="ml-3">إغلاق</v-btn>
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
