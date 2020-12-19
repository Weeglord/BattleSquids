package com.revature.test;

import com.revature.beans.Chat;
import com.revature.beans.Game;
import com.revature.data.ChatDAO;
import com.revature.data.DAOFactory;
import com.revature.data.GameDAO;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class ChatDAOTest {
	
	private static ChatDAO chatdao;
	private static Chat chat;
	//private static PersonDAO persondao;
	
	private static GameDAO gamedao;
	private static Game game;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		chatdao = DAOFactory.getchatDAO();
		chat = new Chat();
		chat.setId(-1);
		chat.setGameId(gamedao.add(game));
		chat.setMessage("message");
	//	chat.setSender(sender);
		
	}
	

	@Test
	void testAdd() {
		Integer newId = chatdao.add(chat);
		assertNotEquals(newId, chat.getId());
		chat.setId(newId);
	}

}
