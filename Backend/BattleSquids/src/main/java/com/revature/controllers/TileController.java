package com.revature.controllers;

import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.beans.Squid;
import com.revature.beans.Tile;
import com.revature.beans.TileStatus;
import com.revature.services.TileService;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")
@RequestMapping(path="/tile")
public class TileController {
	private TileService tileServ;
	
	@Autowired
	public TileController(TileService t) {
		tileServ = t;
	}
	
	@PostMapping
	public ResponseEntity<Integer> addTile(HttpSession session, @RequestBody Tile tile) {
		Integer result = tileServ.addTile(tile);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(path="/{id}")
	public ResponseEntity<Tile> getTileById(HttpSession session, @PathVariable("id") Integer id) {
		Tile result = tileServ.getTileById(id);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(path="/{board}")
	public ResponseEntity<Tile> getTileByXY(HttpSession session, @PathVariable("board") Integer boardId,
			@RequestParam("x") Integer xPos, @RequestParam("y") Integer yPos) {
		Tile result = tileServ.getTileByXY(boardId, xPos, yPos);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(path="/{board}")
	public ResponseEntity<Set<Tile>> getTileByX(HttpSession session, @PathVariable("board") Integer boardId,
			@RequestParam("x") Integer xPos) {
		Set<Tile> result = tileServ.getTileByX(boardId, xPos);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(path="/{board}")
	public ResponseEntity<Set<Tile>> getTileByY(HttpSession session, @PathVariable("board") Integer boardId,
			@RequestParam("y") Integer yPos) {
		Set<Tile> result = tileServ.getTileByY(boardId, yPos);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(path="/{board}")
	public ResponseEntity<Set<Tile>> getTileByBoardId(HttpSession session, @PathVariable("board") Integer boardId) {
		Set<Tile> result = tileServ.getTileByBoardId(boardId);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping("/{board}")
	public ResponseEntity<Set<Tile>> getTileByStatus(HttpSession session, @PathVariable("board") Integer boardId,
			@RequestParam("status") TileStatus status) {
		Set<Tile> result = tileServ.getTileByStatus(boardId, status);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/{board}")
	public ResponseEntity<Set<Tile>> getTileBySquid(HttpSession session, @PathVariable("board") Integer boardId,
			@RequestParam("squid") Squid squid) {
		Set<Tile> result = tileServ.getTileBySquid(boardId, squid);
		if (result == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(result);
	}
	
	@PutMapping(path="/{id}")
	public ResponseEntity<Void> updateTile(HttpSession session, @PathVariable("id") Integer id,
			@RequestBody Tile tile) {
		Tile toUpdate = tileServ.getTileById(id);
		if (!toUpdate.equals(tile)) {
			tileServ.updateTile(tile);
			if (!toUpdate.equals(tile)) return ResponseEntity.ok().build();
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@DeleteMapping
	public ResponseEntity<Void> deleteTile(HttpSession session, @RequestBody Tile tile) {
		tileServ.deleteTile(tile);
		return ResponseEntity.ok().build();
	}
	
}
