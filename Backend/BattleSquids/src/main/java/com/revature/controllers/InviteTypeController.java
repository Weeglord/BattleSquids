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

import com.revature.beans.InviteType;
import com.revature.services.InviteTypeService;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")
@RequestMapping(path="/invite_statuses")
public class InviteTypeController {
	private InviteTypeService service;
	
	@Autowired
	public InviteTypeController(InviteTypeService i){
		service = i;
	}
	
	@GetMapping(path="/{id}")
	public ResponseEntity<InviteType> getInviteTypeById(HttpSession session, @PathVariable("id") Integer id){
		InviteType invite = service.getInviteTypeById(id);
		if (invite == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(invite);
	}
	
	@PutMapping
	public ResponseEntity<Void> updateInviteType(HttpSession session, @PathVariable("id") Integer id, @RequestBody InviteType InviteType){
		service.updateInviteType(InviteType); //nothing to return... how to handle failed update?
		return ResponseEntity.ok().build();
	}
	
	@PostMapping
	public ResponseEntity<Integer> addInviteType(HttpSession session, @RequestBody InviteType InviteType){
		Integer newId = service.addInviteType(InviteType);
		if (newId == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(newId);
	}
	
	@DeleteMapping
	public ResponseEntity<Void> deleteInviteType(HttpSession session, @RequestBody InviteType InviteType){
		service.deleteInviteType(InviteType); //how to handle failed delete?
		return ResponseEntity.ok().build();
	}
}