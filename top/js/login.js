var flsestrings = {
    "login":{
        "default": "Log In",
        "es": "Iniciar sesión",
        "fr": "S'identifier",
        "ja": "ログインする"
    },
    "loginwitha":{
        "default": "Get back to your account to experience the best of Coral.",
        "es": "Regrese a su cuenta para experimentar lo mejor de Coral.",
        "fr": "Revenez à votre compte pour découvrir le meilleur de Coral.",
        "ja": "アカウントに戻って、最高のコーラルを体験してください。"
    },
    "email":{
        "default": "Email Address",
        "es": "Dirección de correo electrónico",
        "fr":"Adresse e-mail",
        "ja": "電子メールアドレス"
    },
    "password":{
        "default": "Password",
        "es":"Contraseña",
        "fr":"Mot de passe",
        "ja": "パスワード"
    },
    "title":{
        "default":"Log In - Coral Video",
        "es": "Iniciar sesión - Coral Video",
        "fr": "S'identifier - Coral Video",
        "ja": "ログインする - Coral Video"
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
    "orcaa":{
        "default": "Create an account",
        "es": "Crea una cuenta",
        "fr": "Créer un compte",
        "ja": "アカウントを作成する"
    },
    "error":{
        "default": "There was an error, check your fields and try again.",
        "es": "Hubo un error, verifique sus campos e intente nuevamente.",
        "fr":"Une erreur s'est produite, vérifiez vos champs et réessayez.",
        "ja":"エラーが発生しました。フィールドを確認して、再試行してください。"
    }
};

document.getElementsByClassName("bigsignupbtn")[0].addEventListener("click", login);

function loadcall(){
    resize();
}

function login(){
    const email = document.getElementById("tb2").value;
    const pw = document.getElementById("tb3").value;
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
        if (response){
            response.json()
            .then(function(json){
                if (json.success == true){
                    var s = window.localStorage;
                    s.setItem("token", json.token);
                    var id = JSON.parse(atob(s.getItem("token").split(".")[1])).sub;
                    s.setItem("id", id);
                    window.location = cb;
                }
                if (json.statusCode == 400){
                    document.getElementById("tb3s").setAttribute("flsestring", "error");
                }
             });
        }
    });
}