package exceptions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import com.revature.data.DAOFactory;
import com.revature.data.InviteDAO;	
import com.revature.beans.Invite;
import com.revature.beans.InviteStatus;
import com.revature.beans.InviteType;
import com.revature.beans.Person;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;


@TestMethodOrder(OrderAnnotation.class)
public class InviteDAOTest extends GenericDAOTest<Invite>{
	private static InviteDAO inviteDao;
	private static Person sender;
	private static Person receiver;
	private static Invite invite;
	private static InviteType inviteType;
	private static InviteStatus inviteStatus;
	
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
	}
	
	@Override
	void setDao() {
		this.dao = InviteDAOTest.inviteDao;
	}
	
	@Override
	void setSample() {
		this.sample = InviteDAOTest.invite;
	}
	
	@Override
	void setUpdatedSample() {
		this.updatedSample = InviteDAOTest.invite;
		this.updatedSample.setId(4);
	}

	@Order(1)
	@Test
	void testCannotAddInviteWithSameSenderAndReceiver() {
		invite.setReceiver(sender);
		assertThrows(SameSenderAndReceiverException.class, () -> {
			dao.add(invite);
		});
	}

	@Order(2)
	@Override
	@Test
	void testAdd() {
		invite.setReceiver(receiver);
		setSample();
		super.testAdd();
	}
	
	@Order(3)
	@Override
	@Test
	void testGetById() {
		super.testGetById();
	}
	
	@Order(4)
	@Override
	@Test
	void testGetAll() {
		super.testGetAll();
	}
	
	@Order(5)
	@Override
	@Test
	void testUpdate() {
		super.testUpdate();
	}
	
	@Order(6)
	@Override
	@Test
	void testDelete() {
		super.testDelete();
	}
}
