import { defineStore } from 'pinia';
import { useFetchApi } from '~/composables/useFetchApi';
import { useToast } from 'vue-toastification';

export const useCartStore = defineStore('cart', () => {
	const toast = useToast();
	// states
	const Cart = ref([]);
	const loading = ref(false);

	// getters
	const getCart = computed(() => Cart.value);

	// actions
	async function GetUserCart(id = 1) {
		loading.value = true;
		try {
			const { data, error } = await useFetchApi(`carts/${id}`, 'GET');
			if (error.value) {
				toast.error('حصل خطاء اثناء جلب البيانات');
			}
			Cart.value = data.value;
		} catch (error) {
			toast.error(error.data.message);
		} finally {
			loading.value = false;
		}
	}
	async function AddToCart(productId, userId = 1, quantity = 1) {
		loading.value = true;
		try {
			const payload = {
				userId: userId,
				date: new Date().toISOString().split('T')[0], // تاريخ اليوم بصيغة YYYY-MM-DD
				products: [
					{
						productId,
						quantity: parseInt(quantity)
					}
				]
			};

			const { data, error } = await useFetchApi(`carts`, {
                method: 'POST',
                body: payload
            });

			if (error.value) {
				toast.error('حدث خطأ أثناء إضافة المنتج إلى السلة');
				return;
			}

			toast.success('تمت إضافة المنتج إلى السلة');
		} catch (err) {
			toast.error('فشل في الاتصال بالخادم');
		} finally {
			loading.value = false;
		}
	}

	async function DeleteFromCart(id) {
		loading.value = true;
		try {
			const { data, error } = await useFetchApi(`carts/${id}`, 'DELETE');
			if (error.value) {
				toast.error('حصل خطاء اثناء جلب البيانات');
			}
			toast.success('تم حذف المنتج من السلة');
			GetUserCart();
		} catch (error) {
			toast.error(error.data.message);
		} finally {
			loading.value = false;
		}
	}

	return {
		Cart,
		loading,
		getCart,
		GetUserCart,
		AddToCart,
		DeleteFromCart
	};
});
