function takvim(hedef,event)
{
var e = event || window.event;
var pos = getRelativeCoordinates(event, document.body);
if(document.getElementById('oTakvim')) 
{
rmvr('oTakvim');
}
var tasiyiciElement = document.createElement('DIV');
tasiyiciElement.id = 'oTakvim';
with(tasiyiciElement){
					style.width =380 +'px';
					style.position='absolute';
					style.top=pos.y+'px';
					style.left=pos.x+'px';
					style.backgroundColor='#BBBBBB';
					}
document.body.appendChild(tasiyiciElement);
var ag = document.createElement('INPUT');
ag.id='ay_gezer';
with(ag){
		type='TEXT';
		style.visibility='hidden';
		value='0';
		style.position='absolute';
		style.top=60;
		style.left=0;
		style.zIndex=-1;
		}
document.body.appendChild(ag);
var hi = document.createElement('INPUT');
hi.id='hedef_id';
with(hi){
		type='TEXT';
		style.visibility='hidden';
		value=hedef;
		style.position='absolute';
		style.top=80;
		style.left=0;
		style.zIndex=-2;
		}
document.body.appendChild(hi);

takvimDoldur(0);
							}
function isinlan(uzaklik)
{
document.getElementById('ay_gezer').value = parseInt(document.getElementById('ay_gezer').value) + uzaklik;
takvimDoldur(document.getElementById('ay_gezer').value);
}
function rmvr(rID){document.body.removeChild(document.getElementById(rID))}
function hedefe_tarihver(tarih)
{
document.getElementById(document.getElementById("hedef_id").value).value=tarih;
rmvr('oTakvim');rmvr('ay_gezer');rmvr('hedef_id');
}
function kapat(){
rmvr('oTakvim');rmvr('ay_gezer');rmvr('hedef_id');

}
function takvimDoldur(kayanAy){
if(!document.getElementById('oTakvim')){return false;}
if(kayanAy==0){document.getElementById("ay_gezer").value=0;}
var gunumuz = new Date();
artiYil = parseInt(kayanAy/12);
gunumuz.setFullYear(gunumuz.getFullYear()+artiYil);
artiAy = parseInt(kayanAy % 12);
gunumuz.setMonth(gunumuz.getMonth()+artiAy);
aktifTarih = gunumuz.toLocaleDateString();
var ilkGunTasiyici = new Date(gunumuz); 

ilkGunTasiyici.setDate(1);

var sonGunTasiyici = new Date(ilkGunTasiyici);
//var kacGun;

for(gunTakipcisi=28;gunTakipcisi<32;gunTakipcisi++){
sonGunTasiyici.setDate(gunTakipcisi);
if(gunumuz.getMonth()<sonGunTasiyici.getMonth()){kacGun=(gunTakipcisi-1);break;}else{kacGun = 31;}
}


var ayDongusu='';
var degerG='';
var haftaninGunu = ilkGunTasiyici.getDay();
var bosGun = haftaninGunu+1;
var maksGun = kacGun+bosGun;
var gunSayaci=1;
for(ayGunu=1;ayGunu<maksGun;ayGunu++)
{
if(ayGunu%7==1){ayDongusu = ayDongusu + '<tr>';}
if(bosGun>ayGunu){
var degerG='&nbsp;';
var degerT='';
				}
else
{
var degerG=gunSayaci;
gunSayaci++;
var isteOgun = new Date(ilkGunTasiyici.setDate(degerG));

iOg = isteOgun.getDate();
iOa = (parseInt(isteOgun.getMonth())+1).toString();
iOy = isteOgun.getFullYear();


var degerT = ikiYap(iOg) +"."+ ikiYap(iOa) +'.'+ iOy ;


var klas = 'ic_gunler';
if(isteOgun.getDay()%7==0){klas='ic_gunler_tatil';}
if(isteOgun.getDay()%7==6){klas='ic_gunler_tatil';}
if(isteOgun.getDate()==gunumuz.getDate()){klas='ic_gunler_bugun';}
}
ayDongusu = ayDongusu + '<td class="'+klas+'" onclick="hedefe_tarihver(\' '+ degerT+' \')">'+ degerG +'</td>';
if(ayGunu%7==0){ayDongusu = ayDongusu + '</tr>';}
}
icerik='<table width=100% cellpadding=0 cellspacing=1 border=0 style=\"border-style:solid;border-width:1px;\"><tr><td class="ic" colspan="4"><input type="button" onclick="isinlan(-12)" title="Önceki Yıl" class="textbox1" value="&lt;&lt;"><input type="button" onclick="isinlan(-1)" title="Önceki Ay" class="textbox1" value="&lt;">&nbsp;<input type="button" onclick="takvimDoldur(0)" class="textbox1" value="Bu Gün\'e Gel">&nbsp;<input type="button" onclick="isinlan(1)" title="Sonraki Ay" class="textbox1" value="&gt;"><input type="button" onclick="isinlan(12)" title="Sonraki Yıl" class="textbox1" value="&gt;&gt;"></td><td class="ic" style="text-align:center;" colspan="2">'+ aktifTarih +'</td><td class="ic" style="text-align:right;"><input type="button" class="textbox1" value="X" onclick="kapat()"></td></tr><tr><td class="ic_gunler">Pazar</td><td class="ic_gunler">Ptesi</td><td class="ic_gunler">Salı/td><td class="ic_gunler" >Çarşamba</td><td class="ic_gunler">Perşembe</td><td class="ic_gunler">Cuma</td><td class="ic_gunler">Ctesi</td></tr>'+ ayDongusu +'</table>';
if(document.getElementById('oTakvim')){document.getElementById('oTakvim').innerHTML = icerik;}else{return false}
						}

function ikiYap(gonderilenSayi)
{
	var gelenSayi = gonderilenSayi.toString();
	//alert(gelenSayi +'\n'+gelenSayi.length);
	if(gelenSayi.length<2){return "0"+gelenSayi.toString();}
	else{return gelenSayi.toString();}
}


// Asagidaki kodun otoru - Author of the code below: Steven Wittens (www.acko.net)
function getAbsolutePosition(element) {
 var r = { x: element.offsetLeft, y: element.offsetTop };
 if (element.offsetParent) {
  var tmp = getAbsolutePosition(element.offsetParent);
  r.x += tmp.x;
  r.y += tmp.y;
 }
 return r;
};
function getRelativeCoordinates(event, reference) {
 var x, y;
 event = event || window.event;
 var el = event.target || event.srcElement;
 if (!window.opera && typeof event.offsetX != 'undefined') {
  var pos = { x: event.offsetX, y: event.offsetY };
  var e = el;
  while (e) {
   e.mouseX = pos.x;
   e.mouseY = pos.y;
   pos.x += e.offsetLeft;
   pos.y += e.offsetTop;
   e = e.offsetParent;
  }
  var e = reference;
  var offset = { x: 0, y: 0 }
  while (e) {
   if (typeof e.mouseX != 'undefined') {
    x = e.mouseX - offset.x;
    y = e.mouseY - offset.y;
    break;
   }
   offset.x += e.offsetLeft;
   offset.y += e.offsetTop;
   e = e.offsetParent;
  }
  e = el;
  while (e) {
   e.mouseX = undefined;
   e.mouseY = undefined;
   e = e.offsetParent;
  }
 }
 else {
  var pos = getAbsolutePosition(reference);
  x = event.pageX - pos.x;
  y = event.pageY - pos.y;
 }
 return { x: x, y: y };
}