import './Card.css';
import { Headline, Text } from '@vkontakte/vkui';
import { Icon16Add, Icon16Dash, Icon28DeleteOutline } from '@vkontakte/icons';
import { useState } from 'react';

function Card ({card, category, image, title, price, onDelete}) {
	// Состояние для хранения количества товаров
	const [isCount, setIsCount] = useState(1);

	// Состояние для хранения общей цены за все товары в копейках
	const [totalPrice, setTotalPrice] = useState(price * 100);


	// Функция для форматирования цены из копеек в рубли
	const formatPrice = (priceInCents) => {
		const rubles = Math.floor(priceInCents / 100);
		const cents = priceInCents % 100;
		return `${rubles},${cents < 10 ? '0' : ''}${cents} ₽`; // Форматируем цену для отображения
	}

	// Функция для увеличения количества товаров
	const handleAdd = () => {
		setIsCount(prevCount => {
			if (prevCount < 10) { // Проверяем, не превышено ли максимальное количество товаров
				setTotalPrice((prevPrice) => prevPrice + price * 100); // Увеличиваем общую цену на цену одного товара
				return prevCount + 1; // Увеличиваем количество товаров на 1
			} else {
				return prevCount; // Если уже достигнуто максимальное количество товаров, возвращаем текущее значение без изменений
			}
		});
	}

	// Функция для уменьшения количества товаров
	const handleDash = () => {
		setIsCount(prevCount => {
			if (prevCount > 1) { // Проверяем, что количество товаров больше 1
				setTotalPrice((prevPrice) => prevPrice - price * 100); // Уменьшаем общую цену на цену одного товара
				return prevCount - 1; // Уменьшаем количество товаров на 1
			} else {
				return prevCount; // Если количество товаров равно 1, возвращаем текущее значение без изменений
			}
		});
	}

	// Функция для удаления товара
	const handleDelete =() => {
		onDelete(card);
	}

	return (
		<div className='container'>
			<div className='card__header'>{category}</div>
			<div className='card__column'>
				<div className='card__column-left'>
					<img src={image} alt='одежда' className='card__photo' />
					<div className='card__content-box'>
						<div style={{ padding: 0 }}>
							<Headline level="1" weight="1" normalize={true} style={{ marginBottom: 8 }}>
								{price} &#8381;
							</Headline>
							<Headline level="2" normalize={true}>{title}</Headline>
						</div>

						<div className='card__item'>
							<div className='count'>
								<button className='count__button' onClick={handleAdd}>
									<Icon16Add width={16} heigh={16}/>
								</button>
								<p className='count__text'>
									{isCount}
								</p>
								<button className='count__button' onClick={handleDash}>
									<Icon16Dash width={16} heigh={16}/>
								</button>
							</div>

							<button className='delete__button' onClick={handleDelete}>
								<Icon28DeleteOutline  width={24} heigh={24}/>
								<div style={{ padding: 4 }}>
									<Text>Удалить</Text>
								</div>
							</button>
						</div>

					</div>
				</div>

				<div className='card__column-right'>
					<div className='card__total'>
						<Headline Component="h4" weight="1" level="3">
							Итого: {isCount} товаров
						</Headline>
						<Text weight="1">{formatPrice(totalPrice)} &#8381;</Text>
					</div>

					<button className='card__button-sell'>
						Оформить
					</button>
				</div>
			</div>
		</div>
	);
}

export default Card;
