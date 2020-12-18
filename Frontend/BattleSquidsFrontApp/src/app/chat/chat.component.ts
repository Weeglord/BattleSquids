import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatWebsocketService } from '../services/chat-websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: ChatWebsocketService) { }

  ngOnInit(): void {
    this.webSocketService.testSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

}
