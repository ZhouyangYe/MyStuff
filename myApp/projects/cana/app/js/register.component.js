"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_service_1 = require('./app.service');
var RegisterComponent = (function () {
    function RegisterComponent(elementRef, appService) {
        this.elementRef = elementRef;
        this.appService = appService;
    }
    RegisterComponent.prototype.ngAfterViewInit = function () {
        //page fade in
        var oPage = this.elementRef.nativeElement;
        oPage.style.cssText = 'opacity:0;position:relative;display:block';
        this.appService.myMove_yzy(oPage, { 'opacity': 100 }, null, 6);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cana-register',
            templateUrl: '../template/register.component.html',
            styleUrls: ['../style/css/register.component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, app_service_1.AppService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map