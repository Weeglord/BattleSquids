package com.revature.test;

import com.revature.beans.Chat;
import com.revature.beans.Game;
import com.revature.beans.GameStatus;
import com.revature.beans.Person;
import com.revature.data.ChatDAO;
import com.revature.data.DAOFactory;
import com.revature.data.GameDAO;
import com.revature.data.GameStatusDAO;
import com.revature.data.PersonDAO;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class ChatDAOTest {
	
	private static ChatDAO chatdao;
	private static Chat chat;
	private static PersonDAO persondao;
	private static Person person1,person2;
	private static GameDAO gamedao;
	private static Game game;
	private static GameStatus gamestatus;
	private static GameStatusDAO gamestatusdao;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		person1= new Person();
		persondao= DAOFactory.getPersonDAO();
		gamedao=DAOFactory.getGameDAO();
		gamestatusdao= DAOFactory.getgameStatusDAO();
		gamestatus= new GameStatus();
		gamestatus.setName("running");
		gamestatus.setId(gamestatusdao.add(gamestatus));
		person2= new Person();
	
		person1.setPassword("pass");
		person1.setUsername("person1");
		person1.setId(persondao.add(person1));
		
		person2.setPassword("pass");
		person2.setUsername("person2");
		person2.setId(persondao.add(person2));
		
		chatdao = DAOFactory.getchatDAO();
		game= new Game();
		chat= new Chat();
		//gamedao= new GameDAO();
		gamedao=DAOFactory.getGameDAO();
		game.setPlayer1(person1);
		game.setPlayer2(person2);
		game.setActivePlayerId(person1.getId());
		
		game.setStatus(gamestatus);
		game.setBoard1(null);
		game.setBoard2(null);	
		game.setId(gamedao.add(game));
		chat = new Chat();
		chat.setId(-1);
		chat.setGameId(game.getId());
		chat.setMessage("message");
		chat.setSender(person1);
		
		
	}
	

	@Test
	void testAdd() {
		System.out.println(chat+"   "+game);
		Integer newId = chatdao.add(chat);
		assertNotEquals(newId, -1);
	//	chat.setId(newId);
		chatdao.delete(chat);
		gamedao.delete(game);
		gamestatusdao.delete(gamestatus);
		
		persondao.delete(person1);
		persondao.delete(person2);
	
		
		
	}

}
