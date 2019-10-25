import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PlanetComponent } from './planet/planet.component';
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {  }
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    data: {  }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { }
  },
  {
    path: 'planet',
    component: PlanetComponent,
    data: { }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    CatalogComponent,
    PlanetComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
