package com.revature.handlers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.beans.Chat;
import com.revature.beans.Game;
import com.revature.data.DAOFactory;
import com.revature.services.ChatService;
import com.revature.services.ChatServiceImp;
import com.revature.services.GameService;
import com.revature.services.GameServiceImp;

public class ChatWebSocketHandler extends TextWebSocketHandler {
private ChatService chatserv;
private GameService gameserv= new GameServiceImp(DAOFactory.getGameDAO());

public static Map<Integer, WebSocketSession> websockets = new HashMap<>();
	
	public ChatWebSocketHandler() {
		chatserv= new ChatServiceImp();
		
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Connection made invite");
		if (getQueryValue(session.getUri().getQuery(),"persid")!=null)
		{
			websockets.put(Integer.parseInt(getQueryValue(session.getUri().getQuery(),"persid")), session);
			//System.out.println("Connection made invite");
			//System.out.println(websockets);
		}
		else
		{
			System.out.println("Invalid ID provied for tile websocket, cancelling");
			session.close(CloseStatus.BAD_DATA);
		}

		System.out.println("websockts 1"+websockets);
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	
		
		String strMessage = message.getPayload();
		
		System.out.println("msg is "+strMessage);
		//incomplete - add functionality here
		ObjectMapper mapper= new ObjectMapper();
		Chat c=mapper.readValue(strMessage,Chat.class);
		Game g=gameserv.getGameById(c.getGameId());
		System.out.println("sender"+c.getSender()+" player1 "+g.getPlayer1()+"  player 2"+g.getPlayer2());;
		int id= chatserv.addChat(c);
		Chat c2=chatserv.getChatbyId(id);
		System.out.println("boolean"+c.getSender().equals(g.getPlayer2()));

		if(c.getSender().equals(g.getPlayer1())) {
			websockets.get(g.getPlayer2().getId()).sendMessage(message);

			System.out.println("websockt 2"+websockets+" getting "+websockets.get(g.getPlayer2().getId()));
		}
		else if(c.getSender().equals(g.getPlayer2())) {
			websockets.get(g.getPlayer1().getId()).sendMessage(message);

			//websockets.get(g.getPlayer1().getId()).sendMessage(message);
			
			System.out.println("websockt 2"+websockets+" getting "+websockets.get(g.getPlayer1().getId()));
		}
//		String msg=mapper.writeValueAsString(c2);
//		System.out.println(msg);
//		TextMessage msgsMessage= new TextMessage(msg);
//		System.out.println("this is secpnd"+msgsMessage);
//		
//		session.sendMessage(msgsMessage);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
		if (websockets.containsValue(session))
		{
			for (Map.Entry<Integer, WebSocketSession> entry: websockets.entrySet())
			{
				if(entry.getValue().equals(session))
				{
					websockets.remove(entry.getKey());
				}
			}
		}
	}
	private String getQueryValue(String query, String param)
	{
		if(query.contains(param))
		{
			return query.substring(query.indexOf(param) + param.length() + 1);
		}
		return null;
		
		
	}

}
