import { Component,ElementRef,AfterViewInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
    moduleId: module.id,
    selector: 'cana-register',
    templateUrl: '../template/register.component.html',
    styleUrls: ['../style/css/register.component.css']
})

export class RegisterComponent implements AfterViewInit{
    constructor(
        private elementRef:ElementRef,
        private appService:AppService
    ){}

    ngAfterViewInit(): void{
        //page fade in
        let oPage = this.elementRef.nativeElement;
        oPage.style.cssText = 'opacity:0;position:relative;display:block';
        this.appService.myMove_yzy(oPage,{'opacity':100},null,6);
    }
}