import { defineStore } from 'pinia';
import { useFetchApi } from '~/composables/useFetchApi';
import { useToast } from 'vue-toastification';

export const useProductsStore = defineStore('products', () => {
	const toast = useToast();

	//States
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
		} catch (err) {
			toast.error('فشل في الاتصال بالخادم');
		} finally {
			loading.value = false;
		}
	}

	async function AddProduct(newProduct) {
		try {
			const data = await $fetch('products', {
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
			const data = await $fetch(`products/${id}`, {
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
			console.log('id--', id);
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
            console.log('GetProductsCategorydata--', data.value);
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
		AddProduct,
		UpdateProduct,
		DeleteProduct,
		GetProductsCategory
	};
});
