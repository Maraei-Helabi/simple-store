<template>
    <v-container class="pa-8" fluid>
        <!-- Breadcrumb -->
        <v-breadcrumbs class="mb-6">
            <v-breadcrumbs-item class="font-weight-bold text-subtitle-1" href="/">الرئيسية ></v-breadcrumbs-item>
            <v-breadcrumbs-item class="font-weight-bold text-subtitle-1" disabled>سلة المشتريات</v-breadcrumbs-item>
        </v-breadcrumbs>

        <v-row>
            <!-- السلة -->
            <v-col cols="12" md="8">
                <v-card elevation="1" class="rounded-lg pa-4 border-md border-opacity-100">
                    <div class="d-flex justify-space-between align-center mb-4">
                        <h3 class="text-h5 font-weight-bold">السلة <span
                                class="font-weight-bold text-subtitle-1 text-grey">({{ cartItems.length }}
                                منتجات)</span></h3>
                    </div>

                    <!-- المنتجات -->
                    <v-row class="align-center">

                        <v-col cols="7">
                            <div class="text-center text-subtitle-1 font-weight-medium">المنتج</div>
                        </v-col>

                        <v-col cols="2" class="d-flex align-center justify-center">

                            <span class="mx-2">الكمية</span>

                        </v-col>

                        <v-col cols="2" class="text-center text-right">السعر</v-col>

                    </v-row>
                    <div v-if="cartItems.length > 0">
                        <div v-for="(item, index) in cartItems" :key="index"
                            class="border-md border-opacity-25 pe-2 py-3 rounded-lg mb-2">
                            <v-row class="align-center">
                                <v-col cols="2">
                                    <v-img :src="item.image" height="60" contain class="rounded-lg"></v-img>
                                </v-col>

                                <v-col cols="5">
                                    <div class="text-subtitle-1 font-weight-medium">{{ item.title }}</div>
                                </v-col>

                                <v-col cols="2" class="d-flex align-center justify-center">

                                    <span class="mx-2">{{ item.quantity }}</span>

                                </v-col>

                                <v-col cols="2" class="text-right">${{ item.price }}</v-col>
                                <v-col cols="1" class="text-right">
                                    <v-icon color="red" @click="removeItem(item.id)">mdi-delete</v-icon>

                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <!-- السعر -->
            <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-lg bg-grey-lighten-2" color="#f5f5f5">
                    <h4 class=" mb-4 text-h5 font-weight-bold">المشتريات</h4>
                    <v-divider class="mb-4"></v-divider>
                    <div class="d-flex justify-space-between mb-2">
                        <span class="font-weight-bold text-subtitle-2">المجموع</span>
                        <span>${{ subtotal }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-2">
                        <span class="font-weight-bold text-subtitle-2">الخصم</span>
                        <span class="text-success">-${{ discount }}</span>
                    </div>
                    <div class="d-flex justify-space-between font-weight-bold mt-4 mb-6">
                        <span class="font-weight-bold text-subtitle-1">الاجمالي بعد الخصم</span>
                        <span>${{ total }}</span>
                    </div>

                    <v-btn block color="black" class="rounded-lg text-h6 font-weight-bold" dark>اكمال الطلب</v-btn>
                </v-card>
            </v-col>

            <v-card class="mt-6 pa-6 rounded-lg w-100" color="black" dark>
                <v-row>
                    <v-col cols="8">
                        <div class="text-h6 font-weight-bold mb-1">Check the Newest Apple Product</div>
                        <div class="text-caption mb-4">Official Apple retailer</div>
                        <v-btn color="white" text class="black--text font-weight-bold rounded-pill">SHOP NOW</v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" height="100"
                            contain></v-img>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from "~/stores/products";
import { useCartStore } from "~/stores/cart";

const cartItems = ref([]);
const productsStore = useProductsStore();
const cartStore = useCartStore();

onMounted(async () => {
    await productsStore.GetAllProducts();
    await cartStore.GetUserCart();

    if (cartStore?.getCart?.products.length > 0) {
        cartItems.value = cartStore?.getCart?.products.map(cartItem => {
            const product = productsStore.getProducts.find(p => p.id === cartItem.productId);
            if (product) {
                return {
                    ...product,
                    quantity: cartItem.quantity
                };
            }
            return null;

        })
    }
})
async function removeItem(id) {
    await cartStore.DeleteFromCart(id);
}
const subtotal = computed(() =>
    cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(1)
)
const discount = computed(() => (subtotal.value * 0.35).toFixed(1))
const total = computed(() => (subtotal.value - discount.value).toFixed(1))
</script>
