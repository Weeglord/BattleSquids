package com.revature.handlers;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.beans.Chat;
import com.revature.services.ChatService;
import com.revature.services.ChatServiceImp;

public class ChatWebSocketHandler extends TextWebSocketHandler {
	

	private ChatService chatserv;
	
	public ChatWebSocketHandler() {
		chatserv= new ChatServiceImp();
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Connection made invite");
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String strMessage = message.getPayload();
		System.out.println(strMessage);
		//incomplete - add functionality here
		ObjectMapper mapper= new ObjectMapper();
		Chat c=mapper.readValue(strMessage,Chat.class);
		int id= chatserv.addChat(c);
		Chat c2=chatserv.getChatbyId(id);
		String msg=mapper.writeValueAsString(c2);
		System.out.println(msg);
		TextMessage msgsMessage= new TextMessage(msg);
		session.sendMessage(msgsMessage);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
	}


}
