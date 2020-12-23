package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	//@GetMapping
	

}
