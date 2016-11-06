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
//this service is used to store some of my own tools and globally used functions.
var AppService = (function () {
    function AppService() {
    }
    //my custom function of animation
    AppService.prototype.myMove_yzy = function (obj, json, endFn, speed, type) {
        if (endFn === void 0) { endFn = null; }
        if (speed === void 0) { speed = 3; }
        if (type === void 0) { type = 'ease'; }
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //console.log('running');
            var bBtn = true;
            for (var attr in json) {
                var iCur = 0;
                if (attr == 'opacity') {
                    iCur = Math.round(getStyle(obj, attr) * 100);
                }
                else if (attr == 'scrollTop') {
                    iCur = Math.floor(obj.scrollTop);
                }
                else {
                    iCur = parseInt(getStyle(obj, attr)) || 0;
                }
                var iSpeed;
                if (type == 'ease') {
                    iSpeed = (json[attr] - iCur) / speed;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    if (iCur != json[attr]) {
                        bBtn = false;
                    }
                }
                else if (type == 'linear') {
                    iSpeed = speed;
                    iSpeed = (json[attr] - iCur) > 0 ? iSpeed : -iSpeed;
                    if ((iCur - json[attr]) > speed) {
                        bBtn = false;
                    }
                }
                if (bBtn) {
                    iCur = json[attr];
                }
                if (attr == 'opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                }
                else if (attr == 'scrollTop') {
                    obj[attr] = iCur + iSpeed;
                }
                else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
            if (bBtn) {
                clearInterval(obj.timer);
                if (endFn) {
                    endFn.call(obj);
                }
            }
        }, 30);
        function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            }
            else {
                return getComputedStyle(obj)[attr];
            }
        }
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map