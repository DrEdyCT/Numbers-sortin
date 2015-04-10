/*В этом файле организован процесс нажатия на управляющие кнопки
* и создания элементов для предоставления справочной информации на странице*/

var text = document.getElementById("button1");
text.onclick = sort;

var text = document.getElementById("button2");
text.onclick = a_generate;

var text = document.getElementById("button3");
text.onclick = clear;

document.write('<button id="help">Справка</button>');
document.getElementById("help").onclick = help;

document.write('<p id="text1" class="helptext"><p>')
document.write('<p id="text2" class="helptext"><p>')





