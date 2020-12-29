package com.revature.handlers;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.beans.Invite;

public class InviteWebSocketHandler extends TextWebSocketHandler {
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Connection made invite");
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String strMessage = message.getPayload();
		System.out.println(strMessage);
		ObjectMapper mapper = new ObjectMapper();
		Invite i = mapper.readValue(strMessage, Invite.class);
		System.out.println(i);
		//incomplete - add functionality here
		session.sendMessage(message);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
	}
}
