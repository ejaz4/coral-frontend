var flsestrings = {
    "signup":{
        "default": "Sign Up",
        "es": "Regístrate",
        "fr": "S'inscrire",
        "ja": "サインアップ"
    },
    "signupwitha":{
        "default": "Create an account to get access to personalized features and more.",
        "en-GB": "Create an account to get access to personalised features and more.",
        "es":"Cree una cuenta para acceder a funciones personalizadas y más.",
        "fr":"Créez un compte pour accéder à des fonctionnalités personnalisées et plus encore.",
        "ja":"アカウントを作成して、パーソナライズされた機能などにアクセスします。"
    },
    "email":{
        "default": "Email Address",
        "es": "Dirección de correo electrónico",
        "fr":"Adresse e-mail",
        "ja": "電子メールアドレス"
    },
    "fullname":{
        "default": "Full Name",
        "es": "Nombre completo",
        "fr": "Nom complet",
        "ja": "フルネーム"
    },
    "password":{
        "default": "Password",
        "es":"Contraseña",
        "fr":"Mot de passe",
        "ja": "パスワード"
    },
    "confirmpassword":{
        "default": "Confirm Password",
        "es":"Confirmar contraseña",
        "fr":"Confirmez le mot de passe",
        "ja": "パスワードを認証する"
    },
    "title":{
        "default":"Sign Up - Coral Video",
        "es": "Regístrate - Coral Video",
        "fr": "S'inscrire - Coral Video",
        "ja": "サインアップ - Coral Video"
    },
    "inputaname":{
        "default": "Please enter a name.",
        "es":"Ingrese un nombre.",
        "fr": "Veuillez saisir un nom.",
        "ja": "名前を入力してください。"
    },
    "novalidmail":{
        "default": "Please enter a valid email address.",
        "es": "Por favor, introduce una dirección de correo electrónico válida.",
        "fr": "S'il vous plaît, mettez une adresse email valide.",
        "ja":"有効なメールアドレスを入力してください。"
    },
    "nopasswdmatch":{
        "default": "These passwords do not match.",
        "es": "Estas contraseñas no coinciden.",
        "fr": "Ces mots de passe ne correspondent pas.",
        "ja": "これらのパスワードは一致しません。"
    },
    "passwdlimitreq": {
        "default": "Your password has not met the requirements.",
        "es":"Su contraseña no cumple con los requisitos.",
        "fr": "Votre mot de passe ne répond pas aux exigences.",
        "ja": "パスワードが要件を満たしていません。"
    },
    "unlimitreq": {
        "default": "Your username has not met the requirements.",
        "es":"Su nombre de usuario no coincide con los requisitos.",
        "fr": "Votre nom d'utilisateur ne correspond pas aux exigences.",
        "ja": "ユーザー名が要件と一致しません。"
    },
    "username": {
        "default": "Username",
        "es":"Nombre de usuario",
        "fr": "Nom d'utilisateur",
        "ja":"ユーザー名"
    },
    "": {
        "default":""
    },
    "haoa":{
        "default":"Login to existing account",
        "es": "Iniciar sesión en una cuenta existente",
        "fr": "Connectez-vous au compte existant",
        "ja": "既存のアカウントにログインします"
    },
    "agreement":{
        "default":"By signing up for an account, you agree to our ",
        "es": "Al suscribirse a una cuenta, usted acepta nuestra ",
        "fr": "En vous inscrivant à un compte, vous acceptez notre ",
        "ja": "アカウントにサインアップすることにより、あなたは私たちに同意します"
    },
    "agreementbetween":{
        "default":" and our ",
        "es": " y nuestra ",
        "fr": " et notre ",
        "ja": "と私たちの"
    },
    "guidelines2":{
        "default":"guidelines",
        "es": "pautas",
        "fr": "des lignes directrices",
        "ja": "ガイドライン"
    },
    "privacypolicy":{
        "default":"privacy policy",
        "es": "política de privacidad",
        "fr": "politique de confidentialité",
        "ja": "個人情報保護方針"
    },
    "error":{
        "default": "There was an error, check your fields and try again.",
        "es": "Hubo un error, verifique sus campos e intente nuevamente.",
        "fr":"Une erreur s'est produite, vérifiez vos champs et réessayez.",
        "ja":"エラーが発生しました。フィールドを確認して、再試行してください。"
    }
};

document.getElementsByClassName("bigsignupbtn")[0].addEventListener("click", hba);

function hba(){
    var problem = 0;
const name = document.getElementById("tb1").value;
if(name == ''){
    document.getElementById("tb1s").setAttribute("flsestring", "inputaname");
    problem = 1;
} else{
    document.getElementById("tb1s").setAttribute("flsestring", "");
}
const email = document.getElementById("tb2").value;
const pw = document.getElementById("tb3").value;
const pw2 = document.getElementById("tb4").value;
if (pw != pw2){
    document.getElementById("tb4s").setAttribute("flsestring", "nopasswdmatch");
    problem = 1;
} else{
    document.getElementById("tb4s").setAttribute("flsestring", "");
}
const un = document.getElementById("tb5").value;

if (problem == 0){
    fetch('https://api.coral.video/users/',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=\'UTF-8\''
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({ 
        username: un,
        email: email,
        password: pw,
        name: name
    })}).then(function(response){
        if (response){
            response.json()
            .then(function(json){
                if (json.success == true){
                    login();
                    window.location = cb;
                }
                if (json.statusCode == 400){
                    document.getElementById("tb4s").setAttribute("flsestring", "error");
                }
             });
        }
    });
} else{
    return;
}
}

function loadcall(){
    resize();
}

function login(){
    const email = document.getElementById("tb2").value;
    const pw = document.getElementById("tb4").value;
    fetch('https://api.coral.video/users/login',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=\'UTF-8\''
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({ 
        email: email,
        password: pw,
    })}).then(function(response){
        if (response.status == 200){
            response.json()
            .then(function(json){
                if (json.success == true){
                    var s = window.localStorage;
                    s.setItem("token", json.token);
                    var id = JSON.parse(atob(s.getItem("token").split(".")[1])).sub;
                    s.setItem("id", id);
                }
             });
        }
    });
}