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
var router_1 = require('@angular/router');
var user_service_1 = require('./user.service');
var UserComponent = (function () {
    function UserComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    UserComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UserComponent.prototype.getUseres = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    UserComponent.prototype.ngOnInit = function () {
        this.getUseres();
    };
    UserComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedUser.id]);
    };
    UserComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.userService.create(name)
            .then(function (user) {
            _this.users.push(user);
            _this.selectedUser = null;
        });
    };
    UserComponent.prototype.delete = function (user) {
        var _this = this;
        this.userService
            .delete(user.id)
            .then(function () {
            _this.users = _this.users.filter(function (h) { return h !== user; });
            if (_this.selectedUser === user) {
                _this.selectedUser = null;
            }
        });
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cana-useres',
            templateUrl: '../template/user.component.html',
            styleUrls: ['../style/css/user.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map