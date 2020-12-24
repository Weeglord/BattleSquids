import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestconnectionComponent } from './testconnection/testconnection.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PersonService } from './services/person.service'
import { TileService } from './services/tile.service';
import { UrlService } from './services/url.service';
import { GamescreenComponent } from './gamescreen/gamescreen.component'

@NgModule({
  declarations: [
    AppComponent,
    TestconnectionComponent,
    HomeComponent,
    NavbarComponent,
    GamescreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    PersonService, 
    TileService,
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
