import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { UserDetailComponent } from './user-detail.component';
import { CanaComponent } from './cana.component';
import { ServiceComponent } from './service.component';
import { MemberComponent } from './member.component';
import { DonationComponent } from './donation.component';
import { NewsComponent } from './news.component';
import { RegisterComponent } from './register.component';
import { ProfileComponent } from './profile.component';
import { AdminLoginComponent } from './admin-login.component';
import { NoAccessComponent } from './noaccess.component';
import { StudentProfileComponent } from './student-profile.component';
import { TeacherProfileComponent } from './teacher-profile.component';
import { AdminProfileComponent } from './admin-profile.component';
import { NotFoundComponent } from './notfound.component';
import { AdminComponent } from './admin.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children:[
            {path:'',redirectTo:'cana',pathMatch:'full'},
            {path:'cana',component:CanaComponent},
            {path:'service',component:ServiceComponent},
            {path:'member',component:MemberComponent},
            {path:'donation',component:DonationComponent},
            {path:'news',component:NewsComponent}
        ]
    },
    {
        path: 'user/:id',
        component: UserDetailComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        children:[
            {path:'',redirectTo:'error',pathMatch:'full'},
            {path:'error',component:NoAccessComponent},
            {path:'student',component:StudentProfileComponent},
            {path:'teacher',component:TeacherProfileComponent}
        ]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        children:[
            {path:'',redirectTo:'login',pathMatch:'full'},
            {path:'login',component:AdminLoginComponent},
            {path:'profile',component:AdminProfileComponent}
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },{
        path: '**',
        component: NotFoundComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
