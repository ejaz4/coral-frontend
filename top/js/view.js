var flsestrings = {
    "title":{
        "default": "Video on Coral"
    }
}

function loadcall(){
    setInterval(resizeLocal, 50);
}




var videoId = new URL(window.location).searchParams.get("v");
window["fs"] = 0;

fetch('/deepcontent/videoplayer.html')
.then(function(response){
    if (response.status == 200){
        var header = document.createElement('div');
        header.id ='v2';
        response.text().then(function (data) {
        header.innerHTML = data;
        document.getElementById('v1c').appendChild(header);
        window["vid"] = document.getElementById("vvpl");
        document.getElementById("v1c").setAttribute("style", "height: " + (document.getElementById("v1c").offsetWidth*0.5625) + "px;")
        document.getElementById("vvpl").setAttribute("width", document.getElementById("v1c").offsetWidth);
        document.getElementById("vvpl").setAttribute("height", document.getElementById("v1c").offsetHeight);
        fetch('https://api.coral.video/videos/' + videoId)
        .then(function(response){
            if (response.status == 200){
                response.text().then(function (data){
                var source = document.createElement('source');
                source.setAttribute("src", JSON.parse(data).cdnLocation);
                source.setAttribute("type", "video/mp4");
                document.getElementById("vvpl").appendChild(source);
                document.getElementById("vt1").innerText = JSON.parse(data).title;
                document.getElementById("title").innerText = JSON.parse(data).title + " - Coral";
                document.getElementById("vd1").innerText = JSON.parse(data).description;
                document.getElementById("loadingdatals").setAttribute("style","display: none;")
                document.getElementById("p1b").addEventListener("click", function (e){
                    if (window["vid"].paused) {
                        document.getElementById("p1bimg").setAttribute("src", "/images/pause.svg");
                        window["vid"].play(); 
                    } else { 
                        document.getElementById("p1bimg").setAttribute("src", "/images/play.svg");
                        window["vid"].pause(); 
                    } 
                    });
                document.getElementById("p2b").addEventListener("click", function (e){
                    if (window["fs"] == 1){
                        window["fs"] = 0;
                        document.getElementById("p2bimg").setAttribute("src", "/images/maximize.svg");
                        var elem = document.getElementsByClassName("vplayer1")[0]
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                          } else if (document.webkitExitFullscreen) { /* Safari */
                            document.webkitExitFullscreen();
                          } else if (document.msExitFullscreen) { /* IE11 */
                            document.msExitFullscreen();
                          }
                        resizeLocal();
                    } else{
                        window["fs"] = 1;
                        document.getElementById("p2bimg").setAttribute("src", "/images/minimize.svg");
                        var elem = document.getElementsByClassName("vplayer1")[0]
                        if (elem.requestFullscreen) {
                            elem.requestFullscreen();
                          } else if (elem.webkitRequestFullscreen) { /* Safari */
                            elem.webkitRequestFullscreen();
                          } else if (elem.msRequestFullscreen) { /* IE11 */
                            elem.msRequestFullscreen();
                          }
                        resizeLocal();
                    }
                });
            });
            } else{
                window.location.replace("404.html?cb=" + btoa(window.location));
            }
        })
        document.getElementById("vvpl").play();
        if (window["vid"].paused) {
            document.getElementById("p1bimg").setAttribute("src", "/images/pause.svg");
            window["vid"].play(); 
        } else { 
            document.getElementById("p1bimg").setAttribute("src", "/images/play.svg");
            window["vid"].pause(); 
        } 
        resizeLocal();
        });
    }
});

function resizeLocal(){
    try{
    if (window["fs"] == 0){
        if(document.getElementsByClassName("vplayer1")[0].offsetHeight == window.innerHeight){
            window["fs"] = 1;
            resizeLocal();
           } else{
    document.getElementById("v1c").setAttribute("style", "height: " + (document.getElementById("v1c").offsetWidth*0.5625) + "px;");
    document.getElementById("vvpl").setAttribute("width", document.getElementById("v1c").offsetWidth);
    document.getElementById("vvpl").setAttribute("height", document.getElementById("v1c").offsetHeight);
           }
    }
    if (window["fs"] == 1){
        if(document.getElementsByClassName("vplayer1")[0].offsetHeight != window.innerHeight){
            window["fs"] = 0;
            resizeLocal();
           } else{
        document.getElementById("v1c").setAttribute("style", "height: " + (window.innerHeight) + "px; width: "+ (window.innerWidth) + "px;");
        document.getElementById("vvpl").setAttribute("width", document.getElementById("v1c").offsetWidth);
        document.getElementById("vvpl").setAttribute("height", document.getElementById("v1c").offsetHeight);
           }
    }
}catch(error){

}
}
