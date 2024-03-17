const BASE_URL = 'https://fakestoreapi.com/products';

// Создаем тип для продукта
type Product = {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
};

// Создаем тип для ответа от API, ожидаемого от getCards
type ApiResponse = Product[];

// Указываем тип возвращаемого значения функции getCards
const getCards = (): Promise<ApiResponse> => {
	return fetch(BASE_URL, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Что-то пошло не так ${res.status}`);
		});
};

export default getCards;