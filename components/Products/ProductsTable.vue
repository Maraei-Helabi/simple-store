<template>
    <v-btn @click="openAddDialog(item)" icon>
        +
    </v-btn>
    <v-data-table-virtual v-if="getProducts" hover class="mt-md-2" no-data-text="لا توجد بيانات متاحة."
        loading-text="يتم جلب المنتجات..." :headers="headers" :items="getProducts" :loading="loading" height="400"
        item-value="id" fixed-header>
        <template #item="{ item, index }">
            <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.category }}</td>
                <td>
                    <img :src="item.image" alt="صورة المنتج" style="width: 50px; height: 50px; object-fit: contain;" />
                </td>
                <td>{{ item.rating?.rate ?? '-' }}</td>
                <td>{{ item.rating?.count ?? '-' }}</td>
                <td>
                    <v-btn @click="addToCart(item)" icon>
                        <v-icon>mdi-cart-plus</v-icon>
                    </v-btn>
                    <v-btn @click="openEditDialog(item)" icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="openDeleteDialog(item)" icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>
    </v-data-table-virtual>
    <DeleteDialog v-model:dialog="deleteDialog" :item="itemSelected" />
    <EditDialog v-model:dialog="editDialog" :item="itemSelected"/>
    <AddDialog v-model:dialog="addDialog" :item="itemSelected" />
</template>
<script setup>
import { useProductsStore } from "~/stores/products";
import DeleteDialog from "~/components/Products/DeleteDialog.vue";
import AddDialog from "~/components/Products/AddDialog.vue";
import EditDialog from "~/components/Products/EditDialog.vue";

const headers = [
    { title: "ID", key: "id" },
    { title: "العنوان", key: "title" },
    { title: "السعر", key: "price" },
    { title: "الوصف", key: "description" },
    { title: "التصنيف", key: "category" },
    { title: "الصورة", key: "image" },
    { title: "التقييم", key: "rating.rate" },
    { title: "عدد التقييمات", key: "rating.count" },
    { title: "خيارات", key: "options", sortable: false },
];

const productsStore = useProductsStore();
const { products, loading, getProducts } = storeToRefs(productsStore);

import { ref } from 'vue';
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const itemSelected = ref(null);

function addToCart(item) {
    // هنا تضع منطق إضافة المنتج للسلة
    alert(`تمت إضافة المنتج (${item.title}) للسلة!`);
}
function openEditDialog(item) {
    editDialog.value = true;
    itemSelected.value = item;
}
function openAddDialog(item) {
    addDialog.value = true;
    itemSelected.value = item;
}
function openDeleteDialog(item) {
    deleteDialog.value = true;
    itemSelected.value = item;
    console.log(itemSelected.value);
}


onMounted(async () => {
    await productsStore.GetAllProducts();
});

</script>
