import { defineStore } from 'pinia';
import { useFetchApi } from '~/composables/useFetchApi';
import { useToast } from 'vue-toastification';

export const useProductsStore = defineStore('products', () => {
    const toast = useToast();

    //States
    const AllProducts = ref([]);
    const Products = ref([]);
    const Categories = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const noDate = ref(null);

    // getters
    const getProducts = computed(() => Products.value);
    const getCategories = computed(() => Categories.value);

    // Actions
    async function GetAllProducts() {
        loading.value = true;
        try {
            const { data, error } = await useFetchApi('products');

            if (error.value) {
                toast.error('حدث خطأ أثناء جلب المنتجات');
                return;
            }

            Products.value = data.value;
            AllProducts.value = data.value;
        } catch (err) {
            toast.error('فشل في الاتصال بالخادم');
        } finally {
            loading.value = false;
        }
    }

    function FilterProducts(searchValue = "", filterValue = {}) {
        loading.value = true;

        let results = [...AllProducts.value]; 

        //
        if (searchValue.trim()) {
            const query = searchValue.toLowerCase();
            results = results.filter((product) =>
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }
        //
        const {
            category,
            priceFrom,
            priceTo,
            ratingFrom,
            ratingTo
        } = filterValue || {};

        // 
        if (
            category ||
            priceFrom ||
            priceTo ||
            ratingFrom ||
            ratingTo
        ) {
            results = results.filter((product) => {
                const matchesCategory = category ? product.category === category : true;
                const matchesPriceFrom = priceFrom ? product.price >= parseFloat(priceFrom) : true;
                const matchesPriceTo = priceTo ? product.price <= parseFloat(priceTo) : true;
                const matchesRatingFrom = ratingFrom ? product.rating?.rate >= parseFloat(ratingFrom) : true;
                const matchesRatingTo = ratingTo ? product.rating?.rate <= parseFloat(ratingTo) : true;

                return (
                    matchesCategory &&
                    matchesPriceFrom &&
                    matchesPriceTo &&
                    matchesRatingFrom &&
                    matchesRatingTo
                );
            });
        }

        Products.value = results;
        loading.value = false;
    }


    async function AddProduct(newProduct) {
        try {
            const data = await useFetchApi('products', {
                method: 'POST',
                body: newProduct
            });
            toast.success('تم اضافة المنتج بنجاح');
            GetAllProducts();
        } catch (err) {
            error.value = err;
        }
    }

    async function UpdateProduct(id, updatedProduct) {
        try {
            const data = await useFetchApi(`products/${id}`, {
                method: 'PUT',
                body: updatedProduct
            });
            toast.success('تم تعديل المنتج بنجاح');
            GetAllProducts();
        } catch (err) {
            error.value = err;
        }
    }

    async function DeleteProduct(id) {
        loading.value = true;
        try {
            const { data, error } = await useFetchApi(`products/${id}`, {
                method: 'DELETE'
            });
            if (error.value) {
                toast.error('حدث خطأ أثناء حذف المنتج');
                return;
            }
            toast.success('تم حذف المنتج بنجاح');
            GetAllProducts();
        } catch (error) {
            toast.error('فشل في الاتصال بالخادم');
        } finally {
            loading.value = false;
        }
    }

    async function GetProductsCategory() {
        loading.value = true;
        try {
            const { data, error } = await useFetchApi('products/categories');
            if (error.value) {
                toast.error('حدث خطأ أثناء جلب التصنيفات');
                return;
            }

            Categories.value = data.value;
        } catch (err) {
            toast.error('فشل في الاتصال بالخادم');
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        error,
        noDate,
        Products,
        getProducts,
        Categories,
        getCategories,
        GetAllProducts,
        FilterProducts,
        AddProduct,
        UpdateProduct,
        DeleteProduct,
        GetProductsCategory
    };
});
