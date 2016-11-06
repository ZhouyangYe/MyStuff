import { Component, ElementRef, ViewChild, OnInit,AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from './app.service';

@Component({
    moduleId: module.id,
    selector: 'cana-home',
    templateUrl: '../template/home.component.html',
    styleUrls: ['../style/css/home.component.css']
})


export class HomeComponent implements OnInit,AfterViewInit{
    @ViewChild('main') main:ElementRef;
    @ViewChild('banner') banner:ElementRef;
    @ViewChild('pic') oPic:ElementRef;

    private bannerState:string = 'banner1';
    private bannerNum:number = 1;
    private bannerAutoTimer:any = null;
    private scrollTimer:any = null;
    private subInfoTimer:any = null;
    private announcement:Promise<any> = null;
    private aBanner: Array<String> = null;
    private bannerSpeed: number = 8;
    private bannerClick: boolean = true;
    private status:number = 0;//this variable is used to take care of banner's reaction when window is re-sized.

    constructor(
        private appService:AppService,
        private http:Http,
        private elementRef:ElementRef
    ){}

    ngAfterViewInit(): void{
        //page fade in
        let oPage = this.elementRef.nativeElement;
        oPage.style.cssText = 'opacity:0;position:relative;display:block';
        this.appService.myMove_yzy(oPage,{'opacity':100},null,6);

        //handle banner's automatic animation
        this.continueBanner();

        //initialize the height of the banner
        this.banner.nativeElement.style.height = this.banner.nativeElement.offsetWidth*0.3+"px";
    }

    ngOnInit(): void{
        //get the content of announcement
        this.announcement = this.getAnnounce();

        //get and initialize banner pictures.
        this.getBanner().then(data=>{this.aBanner = data;},()=>{this.aBanner = [
            "app/images/banner/default/banner1.jpg",
            "app/images/banner/default/banner2.jpg",
            "app/images/banner/default/banner3.jpg",
            "app/images/banner/default/banner4.jpg",
            "app/images/banner/default/banner5.jpg"
        ];});
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getAnnounce(): Promise<String[]>{
        return this.http.get('api/announcement/')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getBanner(): Promise<String[]>{
        return this.http.get('api/banner/')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    onSubscribe(oInfo,oEmail): void{
        clearTimeout(this.subInfoTimer);
        if(oEmail.value){
            oInfo.innerHTML = 'Subscribing...';
        }else{
            oInfo.innerHTML = 'Please enter your email address.';
            this.subInfoTimer = setTimeout(function(){
                oInfo.innerHTML = '';
            },888);
        }
    }

    navClick(e): void{
        if(e.target.className!='buttons-nav'&&e.target.nodeName!='NAV'&&e.target.className!='option'&&e.target.nodeName!='UL'&&e.target.nodeName!='LI'){
            clearTimeout(this.scrollTimer);
            let contentTop = this.main.nativeElement.offsetTop;
            this.scrollTimer = setTimeout(function(){
                this.appService.myMove_yzy(document.documentElement,{'scrollTop':contentTop},function(){
                    clearInterval((<any>document.body).timer);
                },5);
                this.appService.myMove_yzy(document.body,{'scrollTop':contentTop},function(){
                    clearInterval((<any>document.documentElement).timer);
                },5);
            }.bind(this),288);
        }else{
            return;
        }
    }

    showLogin(elem): void{
        elem.style.display = "block";
        this.appService.myMove_yzy(elem,{opacity:100});
    }

    scrollDown(event): void{
        let oButton = null;
        let obj = event.target;
        //console.log(obj);
        if(obj.className == 'option'){
            oButton = obj.parentNode.parentNode.parentNode;
        }else if(obj.nodeName == 'H3'){
            oButton = obj.parentNode.parentNode;
            let aButtons = oButton.parentNode.querySelectorAll('.button');
            let count = parseInt(oButton.className.match(/[0-9]/))-1;
            for(let i=0;i<aButtons.length;i++){
                if(i!=count){
                    //console.log(count);
                    let oUl = aButtons[i].querySelector('ul');
                    clearInterval(oUl.timer);
                    oUl.style.height = 0;
                    oUl.style.opacity = 0;
                }
            }
        }else{
            return;
        }
        //console.log(oButton);
        let oUl = oButton.querySelector('ul');
        let aLi = oUl.querySelectorAll('li');
        let length = (aLi[0].clientHeight+1)*aLi.length+1;
        oUl.style.opacity = '1';
        clearTimeout(oButton.del);
        this.appService.myMove_yzy(oUl,{height:length},null,6);
    }

    scrollUp(button): void{
        let oUl = button.querySelector('ul');
        clearTimeout(button.del);
        button.del = setTimeout(function(){
            this.appService.myMove_yzy(oUl,{height:0},function(){
                oUl.style.opacity = '0';
            },8);
        }.bind(this),396);
    }

    bannerPlay(): void{
        let oPic = this.oPic.nativeElement;
        let aPics = oPic.querySelectorAll('img');
        let width = aPics[0].offsetWidth;
        if(this.bannerNum<5){
            this.status = 1;
            aPics[0].src = this.aBanner[this.bannerNum-1];
            oPic.style.left = 0;
            aPics[1].src = this.aBanner[this.bannerNum];
            this.appService.myMove_yzy(oPic,{left:-width},function(){
                this.status = 0;
            }.bind(this),this.bannerSpeed);
            this.bannerNum++;
            this.bannerState = 'banner'+this.bannerNum;
        }else{
            this.status = -1;
            aPics[0].src = this.aBanner[0];
            oPic.style.left = -width+'px';
            aPics[1].src = this.aBanner[this.bannerNum-1];
            this.appService.myMove_yzy(oPic,{left:0},function(){
                this.status = 0;
            }.bind(this),this.bannerSpeed);
            this.bannerNum = 1;
            this.bannerState = 'banner1';
        }
    }

    onToggleBanner(num): void{
        if(this.bannerClick){
            this.bannerClick = false;
            let oPic = this.oPic.nativeElement;
            clearInterval(this.bannerAutoTimer);
            let aPics = oPic.querySelectorAll('img');
            let width = aPics[0].offsetWidth;
            if(num>this.bannerNum){
                this.status = 1;
                aPics[0].src = this.aBanner[this.bannerNum-1];
                oPic.style.left = 0;
                aPics[1].src = this.aBanner[num-1];
                this.appService.myMove_yzy(oPic,{left:-width},function(){
                    this.status = 0;
                    this.bannerClick = true;
                }.bind(this),this.bannerSpeed);
            }else if(num<this.bannerNum){
                this.status = -1;
                aPics[0].src = this.aBanner[num-1];
                oPic.style.left = -width+'px';
                aPics[1].src = this.aBanner[this.bannerNum-1];
                this.appService.myMove_yzy(oPic,{left:0},function(){
                    this.status = 0;
                    this.bannerClick = true;
                }.bind(this),this.bannerSpeed);
            }else{
                return;
            }
            this.bannerState = 'banner'+num;
            this.bannerNum = num;
        }else{
            return;
        }
    }

    stopBanner():void {
        clearInterval(this.bannerAutoTimer);
    }

    continueBanner(): void{
        clearInterval(this.bannerAutoTimer);
        this.bannerAutoTimer = setInterval(function(){this.bannerPlay();}.bind(this),4777);
    }

    onResize(elem):void{
        //adjust banner's height when window is re-sized
        elem.style.height = elem.offsetWidth*0.3+"px";




        //handle banner's reaction to window re-size
        let oPic = this.oPic.nativeElement;
        let width = oPic.querySelector('img').offsetWidth;
        if(this.status == -1){
            this.appService.myMove_yzy(oPic,{left:0},function(){
                this.status = 0;
            }.bind(this));
        }else if(this.status == 1){
            this.appService.myMove_yzy(oPic,{left:-width},function(){
                this.status = 0;
            }.bind(this));
        }else{//adjust banner's position after window is re-sized.
            if(oPic.offsetLeft!=0){
                oPic.style.left = -width+'px';
            }
        }
    }
}