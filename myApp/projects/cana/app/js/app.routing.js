"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home.component');
var user_detail_component_1 = require('./user-detail.component');
var cana_component_1 = require('./cana.component');
var service_component_1 = require('./service.component');
var member_component_1 = require('./member.component');
var donation_component_1 = require('./donation.component');
var news_component_1 = require('./news.component');
var register_component_1 = require('./register.component');
var profile_component_1 = require('./profile.component');
var admin_login_component_1 = require('./admin-login.component');
var noaccess_component_1 = require('./noaccess.component');
var student_profile_component_1 = require('./student-profile.component');
var teacher_profile_component_1 = require('./teacher-profile.component');
var admin_profile_component_1 = require('./admin-profile.component');
var notfound_component_1 = require('./notfound.component');
var admin_component_1 = require('./admin.component');
var appRoutes = [
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        children: [
            { path: '', redirectTo: 'cana', pathMatch: 'full' },
            { path: 'cana', component: cana_component_1.CanaComponent },
            { path: 'service', component: service_component_1.ServiceComponent },
            { path: 'member', component: member_component_1.MemberComponent },
            { path: 'donation', component: donation_component_1.DonationComponent },
            { path: 'news', component: news_component_1.NewsComponent }
        ]
    },
    {
        path: 'user/:id',
        component: user_detail_component_1.UserDetailComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        children: [
            { path: '', redirectTo: 'error', pathMatch: 'full' },
            { path: 'error', component: noaccess_component_1.NoAccessComponent },
            { path: 'student', component: student_profile_component_1.StudentProfileComponent },
            { path: 'teacher', component: teacher_profile_component_1.TeacherProfileComponent }
        ]
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: admin_login_component_1.AdminLoginComponent },
            { path: 'profile', component: admin_profile_component_1.AdminProfileComponent }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }, {
        path: '**',
        component: notfound_component_1.NotFoundComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map