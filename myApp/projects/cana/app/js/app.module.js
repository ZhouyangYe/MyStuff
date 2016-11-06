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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
require('./rxjs-extensions');
var app_service_1 = require('./app.service');
var user_service_1 = require('./user.service');
var user_detail_component_1 = require('./user-detail.component');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home.component');
var dashboard_component_1 = require("./dashboard.component");
var cana_component_1 = require("./cana.component");
var user_search_component_1 = require('./user-search.component');
var service_component_1 = require('./service.component');
var member_component_1 = require('./member.component');
var donation_component_1 = require('./donation.component');
var news_component_1 = require('./news.component');
var user_component_1 = require('./user.component');
var register_component_1 = require('./register.component');
var login_component_1 = require('./login.component');
var profile_component_1 = require('./profile.component');
var admin_login_component_1 = require('./admin-login.component');
var noaccess_component_1 = require('./noaccess.component');
var student_profile_component_1 = require('./student-profile.component');
var teacher_profile_component_1 = require('./teacher-profile.component');
var admin_profile_component_1 = require('./admin-profile.component');
var notfound_component_1 = require('./notfound.component');
var admin_component_1 = require('./admin.component');
var scrolling_directive_1 = require('./scrolling.directive');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                scrolling_directive_1.ScrollingDirective,
                notfound_component_1.NotFoundComponent,
                admin_profile_component_1.AdminProfileComponent,
                teacher_profile_component_1.TeacherProfileComponent,
                student_profile_component_1.StudentProfileComponent,
                noaccess_component_1.NoAccessComponent,
                admin_login_component_1.AdminLoginComponent,
                profile_component_1.ProfileComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                user_component_1.UserComponent,
                news_component_1.NewsComponent,
                donation_component_1.DonationComponent,
                member_component_1.MemberComponent,
                service_component_1.ServiceComponent,
                cana_component_1.CanaComponent,
                app_component_1.AppComponent,
                user_detail_component_1.UserDetailComponent,
                home_component_1.HomeComponent,
                dashboard_component_1.DashboardComponent,
                user_search_component_1.UserSearchComponent,
                admin_component_1.AdminComponent
            ],
            providers: [
                app_service_1.AppService,
                user_service_1.UserService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map