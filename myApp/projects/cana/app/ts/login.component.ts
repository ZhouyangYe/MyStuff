import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

import { AppService } from './app.service';

@Component({
    moduleId: module.id,
    selector: 'cana-login',
    inputs:['loginElem'],
    templateUrl: '../template/login.component.html',
    styleUrls: ['../style/css/login.component.css']
})

export class LoginComponent implements AfterViewInit{
    @ViewChild('login') login:ElementRef;

    private processing:boolean = false;

    constructor(
        private appService: AppService
    ){
    }

    ngAfterViewInit(): void{
        let oLogin = this.login.nativeElement;
        oLogin.style.top = (document.documentElement.clientHeight-456)/2+'px';
    }

    onResize(elem): void{
        elem.style.top = (document.documentElement.clientHeight-456)/2+'px';
    }

    onClose(): void{
        if(this.processing){
            return;
        }else{
            let oLogin = this.loginElem;
            this.appService.myMove_yzy(oLogin,{opacity:0},function(){
                this.style.display = "none";
            });
        }
    }

    onSignIn(loading,button,close,info): void{
        if(this.processing){
            return;
        }else{
            loading.style.opacity = "1";
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            close.style.cursor = 'not-allowed';
            info.style.display = 'none';
            this.processing = true;
        }
    }

    loginElem: any;
}