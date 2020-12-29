<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestconnectionComponent } from './testconnection/testconnection.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PersonService } from './services/person.service'
import { TileService } from './services/tile.service';
import { UrlService } from './services/url.service';
import { TileComponent } from './tile/tile.component';
import { GamescreenComponent } from './gamescreen/gamescreen.component';
import { ChatComponent } from './chat/chat.component';
import { GamestatusComponent } from './gamestatus/gamestatus.component'

@NgModule({
  declarations: [
    AppComponent,
    TestconnectionComponent,
    HomeComponent,
    NavbarComponent,
    TileComponent,
    GamescreenComponent,
    ChatComponent,
    GamestatusComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestconnectionComponent } from './testconnection/testconnection.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PersonService } from './services/person.service'
import { TileService } from './services/tile.service';
import { UrlService } from './services/url.service';
import { TileComponent } from './tile/tile.component';
import { ReactToInviteComponent } from './invites/react-to-invite/react-to-invite.component';
// import { InviteListComponent } from './invites/invite-list/invite-list.component';
import { InviteComponent } from './invites/invite/invite.component';
import { BoardComponent } from './board/board.component';
import { GamescreenComponent } from './gamescreen/gamescreen.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { InviteService } from './services/invite.service';

@NgModule({
  declarations: [
    AppComponent,
    TestconnectionComponent,
    HomeComponent,
    NavbarComponent,
    TileComponent,
    ReactToInviteComponent,
    // InviteListComponent,
    InviteComponent,
    BoardComponent,
    GamescreenComponent,
    NotificationsComponent
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
    UrlService,
    InviteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> a8be3085223e4c8709f345b42bfb1636899cffd7
