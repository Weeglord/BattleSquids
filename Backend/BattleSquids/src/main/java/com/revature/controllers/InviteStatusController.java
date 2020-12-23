package com.revature.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.revature.beans.InviteStatus;
import com.revature.services.InviteStatusService;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")
@RequestMapping(path="/invite_statuses")
public class InviteStatusController {
	private InviteStatusService service;
	
	@Autowired
	public InviteStatusController(InviteStatusService i){
		service = i;
	}
	
	@GetMapping(path="/{id}")
	public ResponseEntity<InviteStatus> getInviteStatusById(HttpSession session, @PathVariable("id") Integer id){
		InviteStatus invite = service.getInviteStatusById(id);
		if (invite == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(invite);
	}
	
	@PutMapping
	public ResponseEntity<Void> updateInviteStatus(HttpSession session, @PathVariable("id") Integer id, @RequestBody InviteStatus InviteStatus){
		service.updateInviteStatus(InviteStatus); //nothing to return... how to handle failed update?
		return ResponseEntity.ok().build();
	}
	
	@PostMapping
	public ResponseEntity<Integer> addInviteStatus(HttpSession session, @RequestBody InviteStatus InviteStatus){
		Integer newId = service.addInviteStatus(InviteStatus);
		if (newId == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(newId);
	}
	
	@DeleteMapping
	public ResponseEntity<Void> deleteInviteStatus(HttpSession session, @RequestBody InviteStatus InviteStatus){
		service.deleteInviteStatus(InviteStatus); //how to handle failed delete?
		return ResponseEntity.ok().build();
	}
}
