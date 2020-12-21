package com.revature.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.revature.beans.Board;
import com.revature.beans.Person;
import com.revature.data.BoardDAO;
import com.revature.data.DAOFactory;

public class BoardDAOTest {

	@Test
	public void testAddGetByIdDelete()
	{
		BoardDAO dao = DAOFactory.getBoardDAO();
		
		Board b = new Board();
		b.setGameId(1);
		b.setOwner(new Person());
		
		b.setId(dao.add(b));
		
		assertTrue(b.getId() != -1);
		
		Board c = dao.getById(b.getId());
		
		assertEquals(c,b);
		
		dao.delete(b);
		
		assertTrue(dao.getById(c.getId()) == null);
		
	}
	
	@Test
	public void testUpdate()
	{
		BoardDAO dao = DAOFactory.getBoardDAO();
		
		Board b = new Board();
		b.setGameId(1);
		b.setOwner(new Person());
		
		b.setId(dao.add(b));
		
		b.setGameId(2);
		
		dao.update(b);
		
		Board c = dao.getById(b.getId());
		
		assertNotEquals(b,c);
		
		dao.delete(c);
	}
	
	@Test
	public void testGetAll()
	{
		BoardDAO dao = DAOFactory.getBoardDAO();
		
		Board b = new Board();
		b.setGameId(1);
		b.setOwner(new Person());
		
		b.setId(dao.add(b));
		
		Set<Board> res = dao.getAll();
		
		assertTrue(res.contains(b));
		dao.delete(b);
	}
}
