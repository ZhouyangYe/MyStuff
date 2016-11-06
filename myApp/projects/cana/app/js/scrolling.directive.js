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
var ScrollingDirective = (function () {
    function ScrollingDirective(el, appService) {
        this.el = el;
        this.appService = appService;
        this.i = 0;
        this.num = 0;
        this.defautContent = 'Hello everybody, welcome to CANA!';
        this.content = null;
        this.oElem = el.nativeElement;
    }
    ScrollingDirective.prototype.ngOnInit = function () {
        this.announcement.then(function success(data) {
            if (data) {
                this.content = data;
                this.num = this.content.length;
                this.oElem.innerHTML = this.content[this.i];
                setTimeout(function () { this.rolling(this.oElem); }.bind(this), 888);
            }
            else {
                this.content = [this.defautContent];
                this.num = this.content.length;
                this.oElem.innerHTML = this.defautContent;
                setTimeout(function () { this.rolling(this.oElem); }.bind(this), 888);
            }
        }.bind(this), function fail() {
            this.content = [this.defautContent];
            this.num = this.content.length;
            this.oElem.innerHTML = this.defautContent;
            setTimeout(function () { this.rolling(this.oElem); }.bind(this), 888);
        }.bind(this));
    };
    ScrollingDirective.prototype.onMouseEnter = function () {
        clearInterval(this.oElem.timer);
    };
    ScrollingDirective.prototype.onMouseLeave = function () {
        this.rolling(this.oElem);
    };
    ScrollingDirective.prototype.rolling = function (oElem) {
        var length = oElem.offsetWidth;
        this.appService.myMove_yzy(oElem, { left: (-length - 18) }, function () {
            this.i++;
            if (this.i >= this.num) {
                this.i = 0;
            }
            oElem.style.left = 500 + 'px';
            oElem.innerHTML = this.content[this.i];
            setTimeout(function () { this.rolling(oElem); }.bind(this), 1888);
        }.bind(this), 2, 'linear');
    };
    __decorate([
        core_1.Input('scrolling'), 
        __metadata('design:type', Promise)
    ], ScrollingDirective.prototype, "announcement", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ScrollingDirective.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ScrollingDirective.prototype, "onMouseLeave", null);
    ScrollingDirective = __decorate([
        core_1.Directive({
            selector: '[scrolling]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, app_service_1.AppService])
    ], ScrollingDirective);
    return ScrollingDirective;
}());
exports.ScrollingDirective = ScrollingDirective;
//# sourceMappingURL=scrolling.directive.js.map