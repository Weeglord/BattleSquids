package com.revature.controllers;

import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.revature.beans.Invite;
import com.revature.services.InviteService;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")
@RequestMapping(path="/invites")
public class InviteController {
	private InviteService inviteService;
	
	@Autowired
	public InviteController(InviteService i){
		inviteService = i;
	}
	
	@GetMapping(path="/{id}")
	public ResponseEntity<Invite> getInviteById(HttpSession session, @PathVariable("id") Integer id){
		Invite invite = inviteService.getInviteById(id);
		if (invite == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(invite);
	}
	
	@GetMapping(path="?game_id={game_id}")
	public ResponseEntity<Set<Invite>> getInviteById(HttpSession session, @RequestParam("game_id") Integer gameId){
		Set<Invite> invites = inviteService.getAllInvitesForGameWithId(gameId);
		if (invites == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(invites);
	}
	
	@GetMapping(path="?sender_id={sender_id}")
	public ResponseEntity<Set<Invite>> getInviteById(HttpSession session, @RequestParam("sender_id") Integer senderId){
		Set<Invite> invites = inviteService.getAllInvitesForGameWithId(senderId);
		if (invites == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(invites);
	}
	
	@GetMapping(path="?receiver_id={receiver_id}")
	public ResponseEntity<Set<Invite>> getInviteById(HttpSession session, @RequestParam("receiver_id") Integer receiverId){
		Set<Invite> invites = inviteService.getAllInvitesForGameWithId(receiverId);
		if (invites == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(invites);
	}
	
	@PutMapping
	public ResponseEntity<Void> updateInvite(HttpSession session, @PathVariable("id") Integer id, @RequestBody Invite Invite){
		//save an invite in session?
		inviteService.updateInvite(Invite); //nothing to return... how to handle failed update?
		return ResponseEntity.ok().build();
	}
	
	@PostMapping
	public ResponseEntity<Integer> addInvite(HttpSession session, @RequestBody Invite Invite){
		Integer newId = inviteService.addInvite(Invite);
		if (newId == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(newId);
	}
	
	
	
	@DeleteMapping
	public ResponseEntity<Void> deleteInvite(HttpSession session, @RequestBody Invite Invite){
		inviteService.deleteInvite(Invite); //how to handle failed delete?
		return ResponseEntity.ok().build();
	}
}
