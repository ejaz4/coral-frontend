
/* Set up your strings here, it's recommended if you want multilingual language support. */
var flsestrings = {
    "title":{
        "default": "Account - Coral",
        "es": "Cuenta - Coral",
        "fr": "Compte - Coral",
        "ja": "アカウント - Coral"
    },
    "youracc":{
        "default": "Your account",
        "es": "Su cuenta",
        "fr": "Votre compte",
        "ja": "貴方のアカウント"
    },
    "coralsettings":{
        "default": "Settings",
        "en-GB": "Preferences",
        "es": "Configuraciones",
        "fr": "Réglages",
        "ja": "設定"
    },
    "lannreg":{
        "default":"Language and Region",
        "es":"Idioma y región",
        "fr": "Langue et région",
        "ja":"言語と地域"
    },
    "accinfo":{
        "default": "Account Info",
        "es": "Informacion de cuenta",
        "fr": "Informations de compte",
        "ja": "アカウント情報"
    },
    "paynsubs":{
        "default": "Payment and Subscriptions",
        "en-US":"Coral Payments",
        "es": "Pagos y suscripciones",
        "fr": "Paiements et abonnements",
        "ja": "支払いとサブスクリプション"
    },
    "prfc":{
        "default":"Products from Team Coral",
        "es": "Productos de Team Coral",
        "fr": "Produits de Team Coral",
        "ja": "Team Coralの製品"
    },
    "fullname":{
        "default": "Full Name",
        "es": "Nombre completo",
        "fr": "Nom complet",
        "ja": "フルネーム"
    },
    "back":{
        "default": "Back",
        "es":"Atrás",
        "fr":"Retour",
        "ja":"バック"
    },
    "language":{
        "default":"Language",
        "es": "Idioma",
        "fr": "Langue",
        "ja": "言語"
    },
    "yjcawnbh":{
        "default": "You joined Coral and we've never been happier. \nThanks for doing your part in keeping Coral safe and fun for everyone.",
        "es":"Te uniste a Coral y nunca hemos sido más felices. \nGracias por hacer su parte para mantener a Coral seguro y divertido para todos.",
        "fr": "Vous avez rejoint Coral et nous n'avons jamais été aussi heureux. \nMerci d'avoir contribué à assurer la sécurité et l'amusement de Coral pour tous.",
        "ja":"あなたは私たちに加わりました、そして私たちはこれまでになく幸せでした。 \nプラットフォームを安全で楽しいものに保つためにご協力いただきありがとうございます。"
    },
    "email":{
        "default": "Email Address",
        "es": "Dirección de correo electrónico",
        "fr":"Adresse e-mail",
        "ja": "電子メールアドレス"
    },
    "username": {
        "default": "Username",
        "es":"Nombre de usuario",
        "fr": "Nom d'utilisateur",
        "ja":"ユーザー名"
    },
    "savenback":{
        "default":"Save & Back",
        "es": "Guardar y volver",
        "fr": "Enregistrer et revenir",
        "ja": "保存して戻る"
    }
}

var s = window.localStorage;
if (s.getItem('id') == null || s.getItem('id') == ''){
    document.getElementsByClassName("settingpageflexitm")[0].setAttribute("style", "display: none;");
} else{
refreshName();
}

function refreshName(){
    fetch('https://api.coral.video/users/' + s.getItem('id'))
    .then(function (response){
      if(response.status == 200){
        response.text()
          .then(function (data){
              console.log(data);
              s.setItem("idname",btoa(JSON.parse(data).name));
              s.setItem("idusr",btoa(JSON.parse(data).username));
              return;
          })
      }
    })
  }

function loadcall(){
    resize();
    /* JS to run after page loaded, you can still run JS normally. */    
}

function goTo(hide,show){
    document.getElementById(hide).setAttribute("style","display: none");
    document.getElementById(show).setAttribute("style","");
    if(show == "ai"){
        document.getElementById("tb1").value = atob(s.getItem("idname"));
        document.getElementById("tb2").value = atob(s.getItem("idusr"));
        document.getElementById("cpn").innerText = "C 🤍 " +  atob(s.getItem("idname")).split('')[0];
    }
    if(show == "lr"){
        if (s.getItem("locale") != null)
        document.getElementById("language").value = s.getItem("locale");
    } else{
        document.getElementById("language").value = "default";
    }
    }

function updateName(){
    if(document.getElementById("tb1").value != atob(s.getItem("idname")) || document.getElementById("tb2").value != atob(s.getItem("idusr"))){
        fetch('https://api.coral.video/users/' + s.getItem("id"), {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json; charset=\'UTF-8\'',
                'Authorization': 'Bearer ' + s.getItem("token")
            },
            body: JSON.stringify({ name: document.getElementById("tb1").value, username: document.getElementById("tb2").value })
        }).then((response)=>{
            if(response.status == 200){
                response.json().then((data)=>{
                    console.log(data);
                    s.setItem("idname",btoa(document.getElementById("tb1").value));
                    s.setItem("idusr",btoa(document.getElementById("tb2").value));
                })
            }else{
                errHandler('noRefresh');
            }
        })
    }
}

document.getElementById('language').addEventListener('change', function(e){
    var s = window.localStorage;
    var locale = document.getElementById('language').value;
    if (document.getElementById('language').value != 'default'){
        s.setItem("locale", document.getElementById('language').value);
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
            s.removeItem('locale');
            locale = null;
            } catch (err){
            
            }
    }
    if (s.getItem("id") != null){
        fetch('https://api.coral.video/users/' + s.getItem("id"), {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json; charset=\'UTF-8\'',
                'Authorization': 'Bearer ' + s.getItem("token")
             },
            body: JSON.stringify({ language: locale })
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {
                    console.log(data);
                })
            } else{
                errHandler('noRefresh');
            }
        })
    }
});