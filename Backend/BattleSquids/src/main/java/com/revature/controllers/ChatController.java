package com.revature.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.beans.Chat;
import com.revature.beans.TileStatus;
import com.revature.services.ChatService;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")
@RequestMapping(path="/chat")
public class ChatController {
	
	private ChatService serv;
	
	@Autowired
	public ChatController(ChatService s) {
		serv=s;
	} 
	
	@GetMapping(path="/{game_id}")
	public ResponseEntity<Chat> getGameChat(HttpSession session, @PathVariable("game_id") Integer id)
	{
		System.out.println("Reached");
		Chat result = serv.getChatbyId(id);
		if (result == null)
		{
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@PostMapping
	public ResponseEntity<Integer> addChat(HttpSession session, @RequestBody Chat chat)
	{
		Integer result = serv.addChat(chat);
		if (result == null)
		{
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}

}
