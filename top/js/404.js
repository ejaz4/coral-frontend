var cb = new URL(window.location).searchParams.get("cb");
if (cb != null && cb != "" && cb != undefined){ cb = atob(cb); window.history.replaceState("","",cb); }
/* Set up your strings here, it's recommended if you want multilingual language support. */
var flsestrings = {
    "title":{
        "default": "Error 404",
        "es": "Error 404",
        "fr": "Erreur 404",
        "ja": "エラー 404"
    },
    "error":{
        "default": "Error",
        "es": "Error",
        "fr": "Erreur",
        "ja": "エラー"
    },
    "404":{
        "default": "404",
        "es": "404",
        "fr": "404",
        "ja": "404"
    },
    "errorinfo":{
        "default": "The requested page could not be found.",
        "es": "La página solicitada no pudo ser encontrada.",
        "fr": "La page demandée n'a pu être trouvée.",
        "ja": "要求されたページが見つかりませんでした。"
    },
    "instruction":{
        "default": "Go home",
        "es": "Volver a casa",
        "fr": "Revenir à la page d'accueil",
        "ja": "帰宅"
    }
}
function loadcall(){
    resize();
    /* JS to run after page loaded, you can still run JS normally. */    
}
