import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatWebsocketService } from './services/chat-websocket.service';
import { TestconnectionComponent } from './testconnection/testconnection.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PersonService } from './services/person.service'
import { TileService } from './services/tile.service';
import { UrlService } from './services/url.service'

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    TestconnectionComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PersonService, 
    TileService,
    UrlService
  ],
  providers: [ChatWebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
