package com.revature.handlers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.beans.Tile;
import com.revature.services.TileService;
import com.revature.services.TileServiceImpl;

public class TileWebSocketHandler extends TextWebSocketHandler {
	private TileServiceImpl tileServ;
	private final List<WebSocketSession> tileSocketSessions = new ArrayList<>();
	
	public TileWebSocketHandler() {
		tileServ = new TileServiceImpl();
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Connection made");
		tileSocketSessions.add(session);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String strMessage = message.getPayload();
		System.out.println(strMessage);
		ObjectMapper mapper = new ObjectMapper();
		Tile t = mapper.readValue(strMessage, Tile.class);
		tileServ.updateTile(t);
		System.out.println(t);
		for (WebSocketSession tileSocketSession : tileSocketSessions) {
			tileSocketSession.sendMessage(message);
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
		tileSocketSessions.remove(session);
	}
}
