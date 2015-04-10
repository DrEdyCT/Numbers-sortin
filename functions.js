//В этом файле находятся все функции, выполняющие основной функционал

function generate() { //Функция генерации массива случайных чисел

    var stop = 0;
    symbols = document.getElementById("symbols").value;             //Тут берутся значения, определяющие количество чисел
    numbers = parseFloat(document.getElementById("numbers").value); //в массиве и цифр в каждом из числа (a и b на странице)

    switch (symbols) {
        case '1' : symbols = 10; break;   //Проверка на соответствие параметра a предъявленным требованиям и
        case '2' : symbols = 100; break;  //присваивание значения 10, 100 или 1000 для последующей случайной генерации числа
        case '3' : symbols = 1000; break;
        default : alert('Введите корректное количество символов в числе (от 1 до 3)'), stop = 1;
    }

    if (numbers > 10 || numbers <= 0) {alert('Введите корректное количество чисел в массиве (от 1 до 10)'), stop = 1} //Проверка на соответствие параметра b предъявленным требованиям
    else if (isNaN(numbers)) {alert('Введите корректное количество чисел в массиве (от 1 до 10)'), stop = 1};

    if (stop != 1){ //Если хоть одно из требований не будет выполнено, то дальше программа не выполняется

        clear() //Функция отчистки существующего массива (если он есть)

        var start_list = []; //Создаём пустой массив
        for (var i = 0; i < numbers; i++) { //Цикл генерации чисел в массиве

            var append_number = Math.floor((Math.random() * symbols) + 1); //Генерируем случайное число
            start_list[i] = append_number; //Добавляем его в массив

            var div = document.createElement("div"); //Создаём объект div с указанными атрибутами
            div.setAttribute('id', 'element' + i);
            div.setAttribute('class', 'list');
            div.setAttribute('style', 'background-color:' + color() + '; border: 3px solid' + color()); //color() - функция для генерации случайного цвета
            div.style.opacity = '0.1';

            document.body.appendChild(div); //Добавляем объект div на на страницу
            $("#element"+i+":hidden").show().animate({opacity:"1"}, 400); //Анимация постепенного появления объекта
            div.innerHTML = append_number; //Добавляем в div только что сгенерированное число
        }
        return start_list; //По завершению цикла генерации, фозвращаем готовый масив чисел
    }
}

function a_generate() { //Это требуется, что бы вернуть массив start_list
    my_list = generate()
}

function color() { //Функция для генерации случайного цвета
    var c = "#" + rand() + rand() + rand();
    return c;
}

function rand() { //Функция для генерации случайного числа, используемого для генерации цвета
    var r = parseInt(Math.random()*255).toString(16);
    return (""+r).length == 1 ? '0' + r:r;
}

function clear() { //Функция для удаления со страницы существующего массива чисел
    for (var i = 0; i < 10; i++) {
        if (created_div = document.getElementById('element' + i)) {
            document.body.removeChild(created_div)
        }
    }
}


function sort() { //Функция сортировки чисел
    var r = 30; //Параметр, определяющий расстояние, на которе элементы движутся в сторону

    var i = 0;
    while ((i+1) < my_list.length) { //Основной цикл функции, сортирующий числа и в массиве, и на странице
        if (my_list[i] > my_list[i+1]) { //Если число больше следующего за ним
            my_list.splice(i,2,my_list[i+1],my_list[i]); //то меняем их местами в массиве

            $("#element"+i).animate({"left": "-=" + r}, 100); //Эти строки анимируют движение элементов
            $("#element"+(i+1)).animate({"left": "+=" + r}, 100); //на странице,и в конечном итоге меняет их местами

            $("#element"+i).animate({"bottom": "-=51px"}, 100);
            $("#element"+(i+1)).animate({"bottom": "+=51px"}, 100);

            $("#element"+i).animate({"left": "+=" + r}, 100);
            $("#element"+(i+1)).animate({"left": "-=" + r}, 100);


            document.getElementById("element"+i).id = "element"; //Замена id у объектов div, которые поменялись местами,
            document.getElementById("element"+(i+1)).id = "element"+i; //требуется для того, чтобы числовой порядок чисел в массиве
            document.getElementById("element").id = "element"+(i+1); //совпадал с порядком объектов, для корректной анимации

            i = 0; //Если какие-то числа пришлось поменять местами, то проверку требуется провести с самого начала массива
        }
        else {i++} //Если же нет, то сравниваем следующие числа
    }
}

function help() { //Функция для открытия справочного окна на странице

    n = document.getElementById('text1').style.opacity; //Проверяем яркость спревочных окон
    if (n==1) {
        $("#text1").hide().animate({opacity: "0"}, 400); //Прячем два справочных окна
        $("#text2").hide().animate({opacity: "0"}, 400);
    }
    else {$("#text1").show().animate({opacity: "1"}, 400); //Выводим два справочных окна
        $("#text2").show().animate({opacity: "1"}, 400);
    }


    text = "'a' - количество цифр в числах массива\r\n'b' - количество чисел в массиве" //Добавляем в окна них текс
    document.getElementById("text1").innerHTML = text
    text = "Нажмите 'Генерировать', для создания массива из 'b' 'a'-значных чисел, " +
    "'Сортировать' для запуска процесса сортировки чисел и 'Отчистить', для " +
    "удаления массива. При генерации нового массива, существующий удалится автоматически"
    document.getElementById("text2").innerHTML = text
}