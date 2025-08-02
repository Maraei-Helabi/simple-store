<template>
    <v-container fluid class="pa-4">
        <TableHeader/>

        <!-- جدول المنتجات -->
        <v-data-table-virtual v-if="getProducts" hover :headers="headers" :items="filteredProducts" :loading="loading"
            item-value="id" fixed-header  class="elevation-2 rounded-lg"
            no-data-text="لا توجد بيانات متاحة." loading-text="يتم جلب المنتجات...">
            <template #item="{ item, index }">
                <tr>
                    <td>{{ index + 1 }}</td>
                    <td class="ellipsis-text mxw-100">
                        <v-tooltip activator="parent" :text="item.title" location="top"></v-tooltip>
                        {{ item.title }}
                    </td>
                    <td>{{ item.price }}</td>
                    <td class="ellipsis-text mxw-200">
                        <v-tooltip activator="parent" :text="item.description" location="top"></v-tooltip>
                        {{ item.description }}
                    </td>
                    <td>{{ item.category }}</td>
                    <td>
                        <v-img :src="item.image" alt="صورة المنتج" max-width="50" max-height="50" class="rounded"
                            contain></v-img>
                    </td>
                    <td>{{ item.rating?.rate ?? '-' }}</td>
                    <td>{{ item.rating?.count ?? '-' }}</td>
                    <td>
                        <button @click="addToCart(item)" class="px-2" >
                            <v-icon color="primary">mdi-cart-plus</v-icon>
                        </button>
                        <button @click="openEditDialog(item)" class="px-2" >
                            <v-icon color="orange">mdi-pencil</v-icon>
                        </button>
                        <button @click="openDeleteDialog(item)" class="px-2">
                            <v-icon color="red">mdi-delete</v-icon>
                        </button>
                    </td>
                </tr>
            </template>
        </v-data-table-virtual>

        <!--  -->
        <DeleteDialog v-model:dialog="deleteDialog" :item="itemSelected" />
        <EditDialog v-model:dialog="editDialog" :item="itemSelected" />
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '~/stores/products';
import DeleteDialog from '~/components/Products/DeleteDialog.vue';
import TableHeader from '~/components/Products/TableHeader.vue';
import EditDialog from '~/components/Products/EditDialog.vue';

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


const editDialog = ref(false);
const deleteDialog = ref(false);

const itemSelected = ref(null);
const search = ref('');

function addToCart(item) {
    alert(`تمت إضافة المنتج (${item.title}) للسلة!`);
}

function openEditDialog(item) {
    editDialog.value = true;
    itemSelected.value = item;
}

function openDeleteDialog(item) {
    deleteDialog.value = true;
    itemSelected.value = item;
}

// تصفية النتائج حسب البحث
const filteredProducts = computed(() => {
    if (!search.value) return getProducts.value;
    return getProducts.value.filter(p =>
        p.title.toLowerCase().includes(search.value.toLowerCase())
    );
});

onMounted(async () => {
    await productsStore.GetAllProducts();
});
</script>
<style scoped>
.mxw-200 {
    max-width: 200px;
}

.mxw-100 {
    max-width: 100px;
}

.ellipsis-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
th, td {
    padding: 4px 6px !important;
}
</style>
