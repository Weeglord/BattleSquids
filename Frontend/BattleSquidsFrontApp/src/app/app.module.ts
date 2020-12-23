import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatWebsocketService } from './services/chat-websocket.service';
import { TestconnectionComponent } from './testconnection/testconnection.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    TestconnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ChatWebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
