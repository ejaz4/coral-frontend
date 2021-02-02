

if (flsestrings == undefined || flsestrings == null){

} else{
  flsestrings["logout"]={
    "default":"Log out",
    "es": "Cerrar sesión",
    "fr": "Se déconnecter",
    "ja": "ログアウト"
  };
  flsestrings["createanaccount"]={
    "default":"Create a Coral account",
    "es": "Crea una cuenta Coral",
    "fr": "Créer un compte Coral",
    "ja": "Coralアカウントを作成する"
  };
  flsestrings["signintocoral"]={
    "default":"Sign in to Coral",
    "es": "Iniciar sesión en Coral",
    "fr": "Connectez-vous à Coral",
    "ja": "Coralにサインインする"
  };
  flsestrings["privacy"]={
    "default":"Privacy",
    "es": "Intimidad",
    "fr": "Intimité",
    "ja": "プライバシー"
  };
  flsestrings["about"]={
    "default":"About",
    "es": "Acerca de",
    "fr": "À propos",
    "ja": "約"
  };
  flsestrings["guidelines"]={
    "default":"Guidelines",
    "en-GB":"Platform Rules",
    "es": "Directrices",
    "fr": "Des lignes directrices",
    "ja": "ガイドライン"
  };
}

function acmen(){
    document.getElementsByClassName("acmen")[0].setAttribute("style","");
}
window["nameget"] = null

function getName(){
  var s = window.localStorage;
  if (s.getItem('id') == null || s.getItem('id') == ''){
    document.getElementById("acmennli").setAttribute("style", "")
    document.getElementById("acmenli").setAttribute("style", "display: none;");
    document.getElementById("mobacmennli").setAttribute("style", "")
    document.getElementById("mobacmenli").setAttribute("style", "display: none;");
    return;
  }
  fetch('https://api.coral.video/users/' + s.getItem('id'))
  .then(function (response){
    if(response.status == 200){
      response.text()
        .then(function (data){
          document.getElementById("acmennli").setAttribute("style", "display: none;")
          document.getElementById("acmendynnades").innerText = JSON.parse(data).name
          document.getElementById("mobacmennli").setAttribute("style", "display: none;");
          document.getElementById("mobacmendynnades").innerText = JSON.parse(data).name
          window["nameget"] = JSON.parse(data).name
        })
    }
  })
}

function logout(){
  var s = window.localStorage;
  s.removeItem("token");
  s.removeItem("id");
  s.removeItem("idname");
  s.removeItem("locale");
  window.location = window.location;
}

window.addEventListener("click", function (e){
    if(isDescendant(e.target, "acmen") || isDescendant(e.target, "acmentr1")){} else{  document.getElementsByClassName("acmen")[0].setAttribute("style","display: none;");}
    if(isDescendant(e.target, "mobileacmen") || isDescendant(e.target, "mobileacmentr1")){} else{  document.getElementById("mobileacmen").setAttribute("class","mobileacmen-h"); setTimeout(function (){ document.getElementById("mobileacmen").setAttribute("style","display: none;"); }, 300); }
});

function mobileacmen(){
  document.getElementById("mobileacmen").setAttribute("style","");
  setTimeout(function (){document.getElementById("mobileacmen").setAttribute("class","mobileacmen")}, 50);
}

window.addEventListener("touchstart", function (e){
  if(isDescendant(e.target, "mobileacmen") || isDescendant(e.target, "mobileacmentr1")){} else{  document.getElementById("mobileacmen").setAttribute("class","mobileacmen-h"); setTimeout(function (){ document.getElementById("mobileacmen").setAttribute("style","display: none;"); }, 300); }
});

const isDescendant = (el, parentId) => {
    let isChild = false
  
    if (el.id === parentId) {
      isChild = true
    }
  
    while (el = el.parentNode) {
      if (el.id == parentId) {
        isChild = true
      }
    }
    
    return isChild
  }

function flseLoadcall(){
  setInterval(()=>{
    if (window["nameget"] == null){
    if (document.readyState == 'complete'){
  getName();
    }}}, 1000);
}