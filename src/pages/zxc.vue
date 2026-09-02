<template>
    ssss
</template>

<script setup lang="ts">

const students = [
  { id: 1, name: 'Анна', course: 'JavaScript', grade: 85, isActive: true },
  { id: 2, name: 'Борис', course: 'Python', grade: 42, isActive: false },
  { id: 3, name: 'Вика', course: 'JavaScript', grade: 91, isActive: true },
  { id: 4, name: 'Глеб', course: 'HTML/CSS', grade: 67, isActive: true },
  { id: 5, name: 'Дина', course: 'Python', grade: 34, isActive: false },
  { id: 6, name: 'Егор', course: 'JavaScript', grade: 75, isActive: true },
  { id: 7, name: 'Жанна', course: 'HTML/CSS', grade: 88, isActive: true },
];


// Find. ОН короче ищет первый объкт в массиве, который подходит под выбранные условия. Если ничего не нашел, выдаст undefined
// Не создает новый массив, а возвращает один объект
function findBadStudent () {
    const badStudent = students.find(student => student.isActive === true && student.grade < 50)
    return badStudent
}
console.log(findBadStudent());


// Filter. Возвращает новый массив, но уже отфильтрованный. Если ни один объкт не подходит под условия, возвращает пустой массив
// Исходный массив не меняется
// Меняет длину массива
function filterMvpStudents () {
    const mvpStudents = students.filter(student => student.isActive === true && student.grade >= 75)
    return mvpStudents    
}
console.log(filterMvpStudents());


// Тут отфильтрованные объекты
function status (grade) {
    if (grade >= 80) {
        return "Отлично"
    } else if (grade < 80 && grade >= 60){
        return "Хорошо"
    } else {
        return "Нужно подтянуть"
    }
}


// Map. Создает новый массив, применяя функцию к каждому элементу
// Длина нового массива всегда равна длине исходника 
// Нужен, чтобы преобразовать данные в другой формат 
function mapAnaliticStudent() {
    const isActiveStudents = students.filter(student => student.isActive === true)
    
    const result = isActiveStudents.map(student => {
        return `${student.name} — ${status(student.grade)}`
    })
    
    return result
}
console.log(mapAnaliticStudent());


// FindIndex. Возвращает ИНДЕКС ПЕРВОГО подходящего по условию. первый начинается с 0, а не с 1. типо Анна-0, Борис-1, Вика-2 и т.д
// Если ничего не нашел, возвращает -1
// Splice удаляет объкт из массива. Он изменяет ИСХОДНЫЙ массив 
function findIndexDeleteStudent() {
    const index = students.findIndex(student => student.isActive === false && student.course === 'Python')
    
        if (index !== -1) {
        students.splice(index, 1);
        console.log(`Студент удален!`);
    } else {
        console.log('Студент не найден');
    }

    return index 
}
console.log(findIndexDeleteStudent());


// forEach. Итерация без возврата значения
students.forEach( student =>{
    console.log(`Студент: ${student.name}  Курс: ${student.course} Оценка: ${student.grade}`);
    
})


const warehouse = [
  { id: 1, name: 'Ноутбук', category: 'Электроника', price: 1500, quantity: 5, inStock: true },
  { id: 2, name: 'Наушники', category: 'Электроника', price: 200, quantity: 0, inStock: false },
  { id: 3, name: 'Книга "JavaScript"', category: 'Книги', price: 30, quantity: 10, inStock: true },
  { id: 4, name: 'Футболка', category: 'Одежда', price: 25, quantity: 20, inStock: true },
  { id: 5, name: 'Телефон', category: 'Электроника', price: 800, quantity: 3, inStock: true },
  { id: 6, name: 'Кроссовки', category: 'Одежда', price: 120, quantity: 0, inStock: false },
  { id: 7, name: 'Планшет', category: 'Электроника', price: 600, quantity: 7, inStock: true },
  { id: 8, name: 'Ручка', category: 'Канцтовары', price: 2, quantity: 100, inStock: true },
  { id: 9, name: 'Стул', category: 'Мебель', price: 200, quantity: 4, inStock: true },
  { id: 10, name: 'Стол', category: 'Мебель', price: 350, quantity: 0, inStock: false },
];


// Push. Добавляет еще один продукт в конец ИСХОДНОГО массива. 
function pushProduct() {
    const newProduct = {
        id: 11, 
        name: 'Монитор', 
        category: 'Электроника', 
        price: 400, 
        quantity: 6, 
        inStock: true 
    }

    const newLenght = warehouse.push(newProduct)

    return newLenght
}
console.log(pushProduct())
console.log(warehouse)  


// Pop. Удаляет ПОСЛЕДНИЙ товар из ИСХОДНОГО массива
    const lastProduct = warehouse.pop()
console.log(warehouse)
console.log(`удален товар ${lastProduct?.name} из категории ${lastProduct?.category} по цене ${lastProduct?.price} `);

// Shift. Удаляет ПЕРВЫЙ товар из ИСХОДНОГО массива
    const firstProduct = warehouse.shift()
console.log(warehouse)
console.log(`удален товар ${firstProduct?.name} из категории ${firstProduct?.category} по цене ${firstProduct?.price} `);


// Unshift. Добавляет еще один товар в НАЧАЛО ИСХОДНОГО массива
const newProduct = {
        id: 0, 
        name: 'Клавиатура', 
        category: 'Электроника', 
        price: 100, 
        quantity: 15, 
        inStock: true 
    }
const arrayLength = warehouse.unshift(newProduct)
console.log(arrayLength)
console.log(warehouse);

// Sort.  Сортирует объекты в ИСХОДНОМ массиве. toSorted создает отлеьный массив
// Используем функцию КОМПОРАТОР. В нее передаются два аргумента a, b. и Мы эти аргументы сравниваем. 
warehouse.sort((a, b) => a.price - b.price)
console.log(warehouse);

// Reverse. Переворачивает массив
// Метод изменяет массив, по отношению к которому вызван, и возвращает ссылку на изменённый массив
warehouse.reverse()
console.log(warehouse);


// Some. Проходится по каждому элементу в массиве, пока не найдет первый подходящий и вернет true, если ничего не найдет, вернет false
function someProduct(){
    const searcProduct = warehouse.some(warehouse => warehouse.price > 700)
    return searcProduct
}
console.log(someProduct())

function someProduct2(){
    const searcProduct = warehouse.some(warehouse => warehouse.category === 'Книги')
    return searcProduct
}
console.log(someProduct2())


//aksdfkcask
function reduceProduct(){
    const inStockProduct = warehouse.filter(warehouse => warehouse.inStock === true)
    const totalPrice = inStockProduct.reduce((sum, warehouse) => sum + warehouse.price * warehouse.quantity, 0)
    return totalPrice
}
console.log(reduceProduct());


const categories = [
  ['Ноутбук', 'Наушники', 'Телефон'],
  ['Книга "JavaScript"', 'Ручка'],
  ['Футболка', 'Кроссовки'],
  ['Стул', 'Стол']
];

// Flat.  Объединяет 
const flat = categories.flat()
console.log(flat);

</script>