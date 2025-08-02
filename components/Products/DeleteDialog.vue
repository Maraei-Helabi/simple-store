<script setup>
import { watch, ref } from 'vue';
import { useProductsStore } from '~/stores/products';
const productsStore = useProductsStore();
const props = defineProps(['item']);
const dialog = defineModel('dialog');

const productId = ref();
watch(() => props.item, (value) => {
  if (value) {
    productId.value = value.id;
  }
});
async function Delete() {
  console.log(productId.value);
  await productsStore.DeleteProduct(productId.value);
  Close()
}
function Close() {
  dialog.value = false;
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-row class="ma-0 align-center justify-space-between pa-2">
        <v-card-title style="text-align: center; color: black">
          حذف منتج
        </v-card-title>
        <v-btn icon="mdi-close" size="small" variant="flat"  @click="Close"></v-btn>
      </v-row>
      <v-card-text>
        هل فعلاً تريد حذف المنتج => <strong>({{ props.item ? props.item.title : '' }}) ؟</strong>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn  @click="Close" class="ml-5">إلغاء</v-btn>
        <v-btn @click="Delete" variant="flat" color="error">تأكيد</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
