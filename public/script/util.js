
window.onload =  function(){
    //window.getElementById('container').style.opacity = 1
    fade('container', 0.6)
    fade('container', 1, 0, 100);
}

const fadeInOut = (path, id) => {
    window.location.href= path;
}
 
const fade = (id, time, ini, fin) => {
    let target = document.getElementById(id);
    let alpha = ini;
    let inc;
    if (fin >= ini) { 
        inc = 2; 
    } else {
        inc = -2;
    }
    timer = (time * 1000) / 50;
    let i = setInterval(
        function() {
            if ((inc > 0 && alpha >= fin) || (inc < 0 && alpha <= fin)) {
                clearInterval(i);
            }
            setAlpha(target, alpha);
            alpha += inc;
        }, timer);
}

const setAlpha = (target, alpha) => {
    target.style.filter = "alpha(opacity="+ alpha +")";
    target.style.opacity = alpha/100;
}