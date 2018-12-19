//tab切换
let lis = document.getElementsByClassName('a');
let divs = document.getElementsByClassName("b");
//循环
lis = Array.from(lis);
divs = Array.from(divs);


for(let i in lis){
   lis[i].index = i
    lis[i].onmousemove= function(){
        for(let i in lis){
            divs[i].style.display = "none"
           
        }
       divs[this.index].style.display = "block";
    }
    for(let m in divs){
        divs[m].style.display = "none"
    }
    lis[i].onmouseleave = function(){
        divs[i].style.display = "none";
    }
    
}