function saveStorage(id){
var data = document.getElementById(id).value;
var time = new Date().getTime();
localStorage.setItem(time,data);
alert("記事已經被保存！");
loadStorage('msg');
}
function loadStorage(id){
var reselt = '<table border="1">';
for(var i=0;i<localStorage.length;i++)
{
var value = localStorage.getItem( localStorage.key(i));
var date = new Date();
date.setTime( localStorage.key(i));
var datestr = date.toGMTString();
reselt += '<tr><td>'+'這是第'+i+'條記事</td><td>'+ localStorage.getItem( localStorage.key(i))+'</td><td>'+datestr+'</td></tr>';
}
reselt += '</table>';
var target = document.getElementById(id);
target.innerHTML = reselt;
}
function clearStorage(id){
localStorage.clear();
alert("記事已經被成功刪除！");
loadStorage('msg');
}