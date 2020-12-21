package com.revature.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import com.revature.data.DAOFactory;
import com.revature.data.InviteDAO;

import exceptions.InviteToFullGameException;
import exceptions.SameSenderAndReceiverException;

import com.revature.beans.Invite;
import com.revature.beans.InviteStatus;
import com.revature.beans.InviteType;
import com.revature.beans.Person;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;


@TestMethodOrder(OrderAnnotation.class)
public class InviteDAOTest /* extends GenericDAOTest<Invite>*/{
	private static InviteDAO inviteDao;
	private static Person sender;
	private static Person receiver;
	private static Invite invite;
	private static Invite updatedInvite;
	private static InviteType inviteType;
	private static InviteStatus inviteStatus;
	private static Integer inviteId;
	
	@BeforeAll
	static void initializeSubjects() throws Exception {
		inviteDao = DAOFactory.getInviteDAO();
		sender = new Person();
		sender.setId(1);	
		
		receiver = new Person();
		receiver.setId(2);
		
//		game = new Game();
//		game.setId(1);
		
		//assuming invite types are "play" and "spectate"
		inviteType = new InviteType();
		inviteType.setId(1);
		
		//assuming invite statuses are "sent", "received", "accepted", "rejected"
		inviteStatus = new InviteStatus();
		inviteStatus.setId(1);
		
		invite = new Invite();
		invite.setSender(sender);
		invite.setReceiver(receiver);
		invite.setGameId(1);
		
		inviteId = -1;
		
		updatedInvite = invite;
		updatedInvite.setId(-2);
	}
	
	//@Override
//	void setDao() {
//		this.dao = InviteDAOTest.inviteDao;
//	}
//	
//	//@Override
//	void setSample() {
//		this.invite = InviteDAOTest.invite;
//	}
//	
//	//@Override
//	void setUpdatedSample() {
//		this.updatedSample = InviteDAOTest.invite;
//		this.updatedSample.setId(4);
//	}

	@Order(1)
	@Test
	void testCannotAddInviteWithSameSenderAndReceiver() {
		invite.setReceiver(sender);
		assertThrows(SameSenderAndReceiverException.class, () -> {
			inviteDao.addInvite(invite);
		});
	}

	@Order(2)
	//@Override
	@Test
	void testAdd() {
		invite.setReceiver(receiver);
		//setSample();
		//super.testAdd();
		try {
			inviteId = inviteDao.addInvite(invite);
		} catch (SameSenderAndReceiverException | InviteToFullGameException e) {
			e.printStackTrace();
		}
		assertNotNull(inviteId);
		assertNotEquals(inviteId, -1);
//		setSampleId(newId);
	}
	
	@Order(3)
	//@Override
	@Test
	void testGetById() {
		System.out.println("id: " + inviteId);
		invite = inviteDao.getById(inviteId);
		assertNotNull(invite);
	}
	
	@Order(4)
	//@Override
	@Test
	void testGetAll() {
		//super.testGetAll();
		Set<Invite> all = inviteDao.getAll();
		assertTrue(all.contains(invite));
	}
	
	@Order(5)
	//@Override
	@Test
	void testUpdate() {
		//super.testUpdate();
		inviteDao.update(updatedInvite);
		updatedInvite = inviteDao.getById(inviteId);
		assertNotEquals(invite, updatedInvite);
	}
	
	@Order(6)
	//@Override
	@Test
	void testDelete() {
		//super.testDelete();
		inviteDao.delete(invite);
		assertFalse(inviteDao.getAll().contains(updatedInvite));
	}
}
