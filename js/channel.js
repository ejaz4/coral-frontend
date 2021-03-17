
/* Set up your strings here, it's recommended if you want multilingual language support. */
var flsestrings = {
    "subscribe":{
        "default": "Subscribe",
        "en-GB": "Subscription+",
        "ja": "申し込む",
        "es": "Suscribir",
        "fr": "Souscrire"
    }
}

function loadcall(){
    resize(); 
}


var channelId = new URL(window.location).searchParams.get("id");
fetch('https://api.coral.video/channels/' + channelId).then((response)=>{
    if (response.status == 200){
        response.json().then((data)=>{
            /* document.getElementById("p1i").setAttribute("src", data.profilePicture); */
            document.getElementById("p1h").innerText = data.name;
            var d = document.createElement('div');
            data.videos.slice().reverse().forEach((item,index)=>{
                d.innerHTML += '<div onclick="window.location = \'/view?v=' + item.id + '\'" class="vtb"><image src="' + item.thumbnail + '"></image><p>' + item.title + '</p></div>';
            });
            document.getElementsByClassName("fl3")[0].appendChild(d);
        })
    } else{
        errHandler('noRefresh');
    }
})