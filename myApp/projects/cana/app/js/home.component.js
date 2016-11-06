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
var http_1 = require('@angular/http');
var app_service_1 = require('./app.service');
var HomeComponent = (function () {
    function HomeComponent(appService, http, elementRef) {
        this.appService = appService;
        this.http = http;
        this.elementRef = elementRef;
        this.bannerState = 'banner1';
        this.bannerNum = 1;
        this.bannerAutoTimer = null;
        this.scrollTimer = null;
        this.subInfoTimer = null;
        this.announcement = null;
        this.aBanner = null;
        this.bannerSpeed = 8;
        this.bannerClick = true;
        this.status = 0; //this variable is used to take care of banner's reaction when window is re-sized.
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        //page fade in
        var oPage = this.elementRef.nativeElement;
        oPage.style.cssText = 'opacity:0;position:relative;display:block';
        this.appService.myMove_yzy(oPage, { 'opacity': 100 }, null, 6);
        //handle banner's automatic animation
        this.continueBanner();
        //initialize the height of the banner
        this.banner.nativeElement.style.height = this.banner.nativeElement.offsetWidth * 0.3 + "px";
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get the content of announcement
        this.announcement = this.getAnnounce();
        //get and initialize banner pictures.
        this.getBanner().then(function (data) { _this.aBanner = data; }, function () {
            _this.aBanner = [
                "app/images/banner/default/banner1.jpg",
                "app/images/banner/default/banner2.jpg",
                "app/images/banner/default/banner3.jpg",
                "app/images/banner/default/banner4.jpg",
                "app/images/banner/default/banner5.jpg"
            ];
        });
    };
    HomeComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HomeComponent.prototype.getAnnounce = function () {
        return this.http.get('api/announcement/')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HomeComponent.prototype.getBanner = function () {
        return this.http.get('api/banner/')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HomeComponent.prototype.onSubscribe = function (oInfo, oEmail) {
        clearTimeout(this.subInfoTimer);
        if (oEmail.value) {
            oInfo.innerHTML = 'Subscribing...';
        }
        else {
            oInfo.innerHTML = 'Please enter your email address.';
            this.subInfoTimer = setTimeout(function () {
                oInfo.innerHTML = '';
            }, 888);
        }
    };
    HomeComponent.prototype.navClick = function (e) {
        if (e.target.className != 'buttons-nav' && e.target.nodeName != 'NAV' && e.target.className != 'option' && e.target.nodeName != 'UL' && e.target.nodeName != 'LI') {
            clearTimeout(this.scrollTimer);
            var contentTop_1 = this.main.nativeElement.offsetTop;
            this.scrollTimer = setTimeout(function () {
                this.appService.myMove_yzy(document.documentElement, { 'scrollTop': contentTop_1 }, function () {
                    clearInterval(document.body.timer);
                }, 5);
                this.appService.myMove_yzy(document.body, { 'scrollTop': contentTop_1 }, function () {
                    clearInterval(document.documentElement.timer);
                }, 5);
            }.bind(this), 288);
        }
        else {
            return;
        }
    };
    HomeComponent.prototype.showLogin = function (elem) {
        elem.style.display = "block";
        this.appService.myMove_yzy(elem, { opacity: 100 });
    };
    HomeComponent.prototype.scrollDown = function (event) {
        var oButton = null;
        var obj = event.target;
        //console.log(obj);
        if (obj.className == 'option') {
            oButton = obj.parentNode.parentNode.parentNode;
        }
        else if (obj.nodeName == 'H3') {
            oButton = obj.parentNode.parentNode;
            var aButtons = oButton.parentNode.querySelectorAll('.button');
            var count = parseInt(oButton.className.match(/[0-9]/)) - 1;
            for (var i = 0; i < aButtons.length; i++) {
                if (i != count) {
                    //console.log(count);
                    var oUl_1 = aButtons[i].querySelector('ul');
                    clearInterval(oUl_1.timer);
                    oUl_1.style.height = 0;
                    oUl_1.style.opacity = 0;
                }
            }
        }
        else {
            return;
        }
        //console.log(oButton);
        var oUl = oButton.querySelector('ul');
        var aLi = oUl.querySelectorAll('li');
        var length = (aLi[0].clientHeight + 1) * aLi.length + 1;
        oUl.style.opacity = '1';
        clearTimeout(oButton.del);
        this.appService.myMove_yzy(oUl, { height: length }, null, 6);
    };
    HomeComponent.prototype.scrollUp = function (button) {
        var oUl = button.querySelector('ul');
        clearTimeout(button.del);
        button.del = setTimeout(function () {
            this.appService.myMove_yzy(oUl, { height: 0 }, function () {
                oUl.style.opacity = '0';
            }, 8);
        }.bind(this), 396);
    };
    HomeComponent.prototype.bannerPlay = function () {
        var oPic = this.oPic.nativeElement;
        var aPics = oPic.querySelectorAll('img');
        var width = aPics[0].offsetWidth;
        if (this.bannerNum < 5) {
            this.status = 1;
            aPics[0].src = this.aBanner[this.bannerNum - 1];
            oPic.style.left = 0;
            aPics[1].src = this.aBanner[this.bannerNum];
            this.appService.myMove_yzy(oPic, { left: -width }, function () {
                this.status = 0;
            }.bind(this), this.bannerSpeed);
            this.bannerNum++;
            this.bannerState = 'banner' + this.bannerNum;
        }
        else {
            this.status = -1;
            aPics[0].src = this.aBanner[0];
            oPic.style.left = -width + 'px';
            aPics[1].src = this.aBanner[this.bannerNum - 1];
            this.appService.myMove_yzy(oPic, { left: 0 }, function () {
                this.status = 0;
            }.bind(this), this.bannerSpeed);
            this.bannerNum = 1;
            this.bannerState = 'banner1';
        }
    };
    HomeComponent.prototype.onToggleBanner = function (num) {
        if (this.bannerClick) {
            this.bannerClick = false;
            var oPic = this.oPic.nativeElement;
            clearInterval(this.bannerAutoTimer);
            var aPics = oPic.querySelectorAll('img');
            var width = aPics[0].offsetWidth;
            if (num > this.bannerNum) {
                this.status = 1;
                aPics[0].src = this.aBanner[this.bannerNum - 1];
                oPic.style.left = 0;
                aPics[1].src = this.aBanner[num - 1];
                this.appService.myMove_yzy(oPic, { left: -width }, function () {
                    this.status = 0;
                    this.bannerClick = true;
                }.bind(this), this.bannerSpeed);
            }
            else if (num < this.bannerNum) {
                this.status = -1;
                aPics[0].src = this.aBanner[num - 1];
                oPic.style.left = -width + 'px';
                aPics[1].src = this.aBanner[this.bannerNum - 1];
                this.appService.myMove_yzy(oPic, { left: 0 }, function () {
                    this.status = 0;
                    this.bannerClick = true;
                }.bind(this), this.bannerSpeed);
            }
            else {
                return;
            }
            this.bannerState = 'banner' + num;
            this.bannerNum = num;
        }
        else {
            return;
        }
    };
    HomeComponent.prototype.stopBanner = function () {
        clearInterval(this.bannerAutoTimer);
    };
    HomeComponent.prototype.continueBanner = function () {
        clearInterval(this.bannerAutoTimer);
        this.bannerAutoTimer = setInterval(function () { this.bannerPlay(); }.bind(this), 4777);
    };
    HomeComponent.prototype.onResize = function (elem) {
        //adjust banner's height when window is re-sized
        elem.style.height = elem.offsetWidth * 0.3 + "px";
        //handle banner's reaction to window re-size
        var oPic = this.oPic.nativeElement;
        var width = oPic.querySelector('img').offsetWidth;
        if (this.status == -1) {
            this.appService.myMove_yzy(oPic, { left: 0 }, function () {
                this.status = 0;
            }.bind(this));
        }
        else if (this.status == 1) {
            this.appService.myMove_yzy(oPic, { left: -width }, function () {
                this.status = 0;
            }.bind(this));
        }
        else {
            if (oPic.offsetLeft != 0) {
                oPic.style.left = -width + 'px';
            }
        }
    };
    __decorate([
        core_1.ViewChild('main'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomeComponent.prototype, "main", void 0);
    __decorate([
        core_1.ViewChild('banner'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomeComponent.prototype, "banner", void 0);
    __decorate([
        core_1.ViewChild('pic'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomeComponent.prototype, "oPic", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cana-home',
            templateUrl: '../template/home.component.html',
            styleUrls: ['../style/css/home.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, http_1.Http, core_1.ElementRef])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map