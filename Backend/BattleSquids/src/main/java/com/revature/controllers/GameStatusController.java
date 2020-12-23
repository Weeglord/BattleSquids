package com.revature.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.beans.GameStatus;
import com.revature.beans.TileStatus;
import com.revature.services.GameStatusService;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")
@RequestMapping(path="/game/status")
public class GameStatusController {
	
	private GameStatusService serv;

	public GameStatusController(GameStatusService t) {
		serv=t;
	}
	
	@GetMapping(path="/{id}")
	public ResponseEntity<GameStatus> getGameStatusById(HttpSession session, @PathVariable("id") Integer id)
	{
		System.out.println("Reached");
		GameStatus result = serv.getGameStatusById(id);
		if (result == null)
		{
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
}
