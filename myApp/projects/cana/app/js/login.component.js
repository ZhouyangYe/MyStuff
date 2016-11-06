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
var LoginComponent = (function () {
    function LoginComponent(appService) {
        this.appService = appService;
        this.processing = false;
    }
    LoginComponent.prototype.ngAfterViewInit = function () {
        var oLogin = this.login.nativeElement;
        oLogin.style.top = (document.documentElement.clientHeight - 456) / 2 + 'px';
    };
    LoginComponent.prototype.onResize = function (elem) {
        elem.style.top = (document.documentElement.clientHeight - 456) / 2 + 'px';
    };
    LoginComponent.prototype.onClose = function () {
        if (this.processing) {
            return;
        }
        else {
            var oLogin = this.loginElem;
            this.appService.myMove_yzy(oLogin, { opacity: 0 }, function () {
                this.style.display = "none";
            });
        }
    };
    LoginComponent.prototype.onSignIn = function (loading, button, close, info) {
        if (this.processing) {
            return;
        }
        else {
            loading.style.opacity = "1";
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            close.style.cursor = 'not-allowed';
            info.style.display = 'none';
            this.processing = true;
        }
    };
    __decorate([
        core_1.ViewChild('login'), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "login", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cana-login',
            inputs: ['loginElem'],
            templateUrl: '../template/login.component.html',
            styleUrls: ['../style/css/login.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map