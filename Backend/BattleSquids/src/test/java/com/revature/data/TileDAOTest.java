package com.revature.data;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import com.revature.beans.Squid;
import com.revature.beans.Tile;
import com.revature.beans.TileStatus;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;


@TestMethodOrder(OrderAnnotation.class)
public class TileDAOTest {
	private static TileDAO tileDao;
	private static Tile sampleTile;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		tileDao = DAOFactory.getTileDAO();
		sampleTile = new Tile();
		sampleTile.setId(-1);
		sampleTile.setBoardId(1);
		TileStatus status = new TileStatus();
		status.setId(1);
		sampleTile.setStatus(status);
		Squid calamari = new Squid();
		calamari.setId(1);
		sampleTile.setCalamari(calamari);
		sampleTile.setX(0);
		sampleTile.setY(0);
		
	}
	
	@Order(1)
	@Test
	void testAdd()
	{
		Integer newId = tileDao.add(sampleTile);
		assertNotEquals(newId, sampleTile.getId());
		sampleTile.setId(newId);
	}
	
	@Order(2)
	@Test
	void testGetById() {
		Tile a = tileDao.getById(sampleTile.getId());
		assertEquals(a, sampleTile);
	}
	
	@Order(3)
	@Test
	void testGetByXY() {
		Tile a = tileDao.getByXY(sampleTile.getBoardId(), sampleTile.getX(), sampleTile.getY());
		assertEquals(a, sampleTile);
	}
	
	@Order(4)
	@Test
	void testGetByX() {
		Set<Tile> xTiles = tileDao.getByX(sampleTile.getBoardId(), sampleTile.getX());
		assertTrue(xTiles.contains(sampleTile));
		assertEquals(xTiles.size(), 10);
	}
	
	@Order(5)
	@Test
	void testGetByY() {
		Set<Tile> yTiles = tileDao.getByY(sampleTile.getBoardId(), sampleTile.getY());
		assertTrue(yTiles.contains(sampleTile));
		assertEquals(yTiles.size(), 10);
	}
	
	@Order(6)
	@Test
	void testGetByBoardId() {
		Set<Tile> boardTiles = tileDao.getByBoardId(sampleTile.getBoardId());
		assertTrue(boardTiles.contains(sampleTile));
		assertEquals(boardTiles.size(), 100);
	}
	
	@Order(7)
	@Test
	void testGetByStatus() {
		Set<Tile> statusTiles = tileDao.getByStatus(sampleTile.getBoardId(), sampleTile.getStatus());
		assertTrue(statusTiles.contains(sampleTile));
	}
	
	@Order(8)
	@Test
	void testGetBySquid() {
		Set<Tile> squidTiles = tileDao.getBySquid(sampleTile.getBoardId(), sampleTile.getCalamari());
		assertTrue(squidTiles.contains(sampleTile));
	}
	
	@Order(9)
	@Test
	void testGetAll() {
		Set<Tile> tiles = tileDao.getAll();
		assertTrue(tiles.contains(sampleTile));
	}
	
	@Order(10)
	@Test
	void testUpdate() {
		Tile a = new Tile();
		a.setId(sampleTile.getId());
		a.setBoardId(sampleTile.getBoardId());
		TileStatus status = new TileStatus();
		status.setId(2);
		a.setStatus(status);
		a.setCalamari(sampleTile.getCalamari());
		a.setX(sampleTile.getX());
		a.setY(sampleTile.getY());
		
		tileDao.update(a);
		assertNotEquals(sampleTile, tileDao.getById(sampleTile.getId()));
	}
	
	@Order(11)
	@Test
	void testDelete() {
		tileDao.delete(sampleTile);
		assertFalse(tileDao.getAll().contains(sampleTile));
	}
}
