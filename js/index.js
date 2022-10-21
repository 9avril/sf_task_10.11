// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = [
    {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
    {"kind": "Дуриан", "color": "зеленый", "weight": 35},
    {"kind": "Карамбола", "color": "желтый", "weight": 28},
    {"kind": "Личи", "color": "розово-красный", "weight": 17},
    {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
];

const colorMap = new Map([
    ['фиолетовый', 'fruit_violet'],
    ['зеленый', 'fruit_green'],
    ['розово-красный', 'fruit_carmazin'],
    ['желтый', 'fruit_yellow'],
    ['светло-коричневый', 'fruit_lightbrown']
]);


const display = () => {
    const ul = document.querySelector("ul");
    ul.innerHTML = '';
    fruitsJSON.forEach(elem => {
        const newLi = document.createElement("li");
        newLi.setAttribute('class', 'fruit__item');
        const div = document.createElement("div");
        newLi.classList.add(colorMap.get(elem.color));
        div.classList.add('fruit__info');
        const div2 = document.createElement("div");
        const index = fruitsJSON.indexOf(elem);
        div.appendChild(div2).innerHTML += `index: ${index}`
        for (const [key, value] of Object.entries(elem)) {
            const divInfo = div.appendChild(div2.cloneNode());
            divInfo.innerHTML += `${key}: ${value}`;
        }
        newLi.appendChild(div);
        ul.innerHTML += newLi.outerHTML;
    })
}

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
    let result = [];
    while (fruitsJSON.length > 0) {
        result.push(fruitsJSON.splice(getRandomInt(0, fruitsJSON.length - 1), 1));
    }
    fruitsJSON = result.flat()
};

shuffleButton.addEventListener('click', () => {
    shuffleFruits();
    display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
    const FILTERED = fruitsJSON.filter(item => item.weight <= 22 && item.weight >= 12);
    fruitsJSON = FILTERED
    return FILTERED
};


filterButton.addEventListener('click', () => {
    filterFruits().flat();
    console.log(filterFruits().flat())
    display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
    const priority = ['желтый', 'зеленый', 'розово-красный', 'светло-коричнеый', 'фиолетовый'];
    const priority1 = priority.indexOf(a.color);
    const priority2 = priority.indexOf(b.color);
    return priority1 - priority2;
};

const sortAPI = {
    bubbleSort(arr, comparation) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < arr.length - 1; j++) {
                if (comparation(arr[j], arr[j + 1] > 0)) {
                    let buff = arr[j + 1];
                    arr[j] = arr[j + 1];
                    arr[j] = buff;
                }
            }
        }
    },

    quickSort(arr, comparation) {
        fruitsJSON.sort((a, b) => comparation(a - b))
    },

    // выполняет сортировку и производит замер времени
    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sort(arr, comparation);
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;
    },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
    // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
    // TODO: вывести в sortTimeLabel значение 'sorting...'
    sortTimeLabel.textContent = 'sorting...'
    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruitsJSON, comparationColor);
    display();
    // TODO: вывести в sortTimeLabel значение sortTime
    sortTimeLabel.textContent = sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
    // TODO: создание и добавление нового фрукта в массив fruits
    // необходимые значения берем из kindInput, colorInput, weightInput
    display();
});
