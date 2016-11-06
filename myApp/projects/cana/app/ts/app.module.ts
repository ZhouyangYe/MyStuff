import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-extensions';

import { AppService } from './app.service';
import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from "./dashboard.component";
import { CanaComponent } from "./cana.component";
import { UserSearchComponent } from './user-search.component';
import { ServiceComponent } from './service.component';
import { MemberComponent } from './member.component';
import { DonationComponent } from './donation.component';
import { NewsComponent } from './news.component';
import { UserComponent } from './user.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';
import { AdminLoginComponent } from './admin-login.component';
import { NoAccessComponent } from './noaccess.component';
import { StudentProfileComponent } from './student-profile.component';
import { TeacherProfileComponent } from './teacher-profile.component';
import { AdminProfileComponent } from './admin-profile.component';
import { NotFoundComponent } from './notfound.component';
import { AdminComponent } from './admin.component';

import { ScrollingDirective } from './scrolling.directive';

import { routing } from './app.routing';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        ScrollingDirective,
        NotFoundComponent,
        AdminProfileComponent,
        TeacherProfileComponent,
        StudentProfileComponent,
        NoAccessComponent,
        AdminLoginComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        NewsComponent,
        DonationComponent,
        MemberComponent,
        ServiceComponent,
        CanaComponent,
        AppComponent,
        UserDetailComponent,
        HomeComponent,
        DashboardComponent,
        UserSearchComponent,
        AdminComponent
    ],
    providers:[
        AppService,
        UserService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
