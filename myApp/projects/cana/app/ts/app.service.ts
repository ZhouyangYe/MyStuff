import { Injectable } from '@angular/core';

//this service is used to store some of my own tools and globally used functions.
@Injectable()
export class AppService{
    //my custom function of animation
    myMove_yzy(obj,json,endFn=null,speed=3,type='ease'): void{
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            //console.log('running');
            var bBtn = true;
            for(var attr in json){
                var iCur = 0;
                if(attr == 'opacity'){
                    iCur = Math.round(getStyle(obj,attr)*100);
                }else if(attr == 'scrollTop'){
                    iCur = Math.floor(obj.scrollTop);
                }else{
                    iCur = parseInt(getStyle(obj,attr)) || 0;
                }
                var iSpeed;
                if(type == 'ease'){
                    iSpeed = (json[attr] - iCur)/speed;
                    iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    if(iCur!=json[attr]){
                        bBtn = false;
                    }
                }else if(type == 'linear'){
                    iSpeed = speed;
                    iSpeed = (json[attr] - iCur) >0 ? iSpeed : -iSpeed;
                    if((iCur-json[attr])>speed){
                        bBtn = false;
                    }
                }
                if(bBtn){
                    iCur = json[attr];
                }
                if(attr == 'opacity'){
                    obj.style.opacity = (iCur + iSpeed)/100;
                }else if(attr == 'scrollTop'){
                    obj[attr] = iCur + iSpeed;
                }
                else{
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
            if(bBtn){
                clearInterval(obj.timer);
                if(endFn){
                    endFn.call(obj);
                }
            }
        },30);
        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj)[attr];
            }
        }
    }
}