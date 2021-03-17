function createCookie(name,valued,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+valued+expires+"; path=/; SameSite=Strict; Secure";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

if (readCookie("t1") == null || readCookie("t1") == ''){
    document.getElementById("styles").innerText = ":root{ --headercolor:rgba(256,256,256,0.75); --backcolor: rgba(255,255,255,1); --backcolordark: rgba(0,0,0,0.2); --backcolordarkdark: rgba(0,0,0,0.3); --controlcolor: #FFFFFF; --controlshadow: #888888; --controlcolorlight: #f0f9ff; --imgfilter: invert(0); --textcolor: black; --accentcolor: royalblue; --accentcolorcomp: rgba(255,255,255,1)} @media(prefers-color-scheme:dark){ :root{ --headercolor: rgba(26,31,44,0.75); --backcolor: rgba(0,0,0,1); --backcolordark: rgba(255,255,255,0.2); --backcolordarkdark: rgba(255,255,255,0.3); --controlcolor: #1A1F2C; --controlcolorlight: #2e374f; --controlshadow: #1e1e1e; --imgfilter: invert(100%); --textcolor: white; } }"

}

var s = window.localStorage;
if (s.getItem("locale") != null){
    var locale = document.createElement('locale');
    locale.setAttribute("value", s.getItem("locale"));
    document.body.appendChild(locale);
} else{
    if (s.getItem("id") != null){
        s.removeItem("locale");
        fetch('https://api.coral.video/users/' + s.getItem("id")).then((response) => {
            if (response.status == 200){
                response.json().then((data) =>{
                    s.setItem("locale", data.language);
                    var locales = data.language;
                    if (locales != null){
                        try{
                        document.getElementsByTagName('locale')[0].setAttribute("value", document.getElementById('language').value);
                        } catch (err){
                        var locale = document.createElement('locale');
                        locale.setAttribute("value", document.getElementById('language').value);
                        document.body.appendChild(locale);
                        }
                    } else{
                        try{
                            document.getElementsByTagName('locale')[0].remove();
                            } catch (err){
                            
                            }
                    }
                })
            } else{
                errHandler('noRefresh');
            }
        })
    }
}
function resize(){
    try{
        resizeLocal();
    } catch(error){

    }
}

window.onresize = resize;
try{
    resizeLocal();
} catch(error){

}

function errHandler(errorcode){
    console.log(errorcode);
}

console.log("%cSTOP ⛔", "color: red; font-size: 40px;");
console.log("%cIf you have been asked to paste anything here, don't do it. \nThis console can allow anyone to do all sorts of things under your account.", "color: red; font-size: 20px;");