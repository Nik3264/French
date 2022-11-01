const head = window.document.getElementsByTagName('head')[0];
const themeForm=document.querySelector('.form1');
//document.querySelector('[name="sex"]:checked').value


function includeCSS(aFile){
  let style = window.document.createElement('link');
  style.href = aFile;
  style.rel = 'stylesheet';
  head.appendChild(style);
}

includeCSS('css/day.css');
themeForm.addEventListener("click",(e)=>{
    console.log(e.target);
    let target = e.target;
    console.log(target.checked);

    if(target.checked){ 
            includeCSS('css/day.css');
        } else {
            includeCSS('css/night.css');
        }
});
