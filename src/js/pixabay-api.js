import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export { getPictures };

const perPage = 15; // Установлено значение 15, как требуется

async function getPictures(name, page) {
    const KEY = '46767628-a1a0fbec2a5b02d371c47f484';

    try {
        // Кодируем имя для корректного запроса
        const formattedName = encodeURIComponent(name);

        console.log('Searching for:', formattedName);
        console.log('Page:', page);

        const response = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: KEY,
                q: formattedName,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: perPage,
            }
        });

        // Проверка наличия данных
        if (response.data.hits) {
            console.log('Received data:', response.data.hits);
            return response.data; // Возвращаем только данные
        } else {
            console.error('No hits found.');
            return null; // Возвращаем null, если нет данных
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry! The site is currently unavailable. Please try later!',
        });
        console.error('Error message:', error.message); // Выводим сообщение об ошибке в консоль
    }
}
