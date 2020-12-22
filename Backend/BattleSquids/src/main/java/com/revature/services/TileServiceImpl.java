package com.revature.services;

import java.util.Set;

import com.revature.beans.Squid;
import com.revature.beans.Tile;
import com.revature.beans.TileStatus;
import com.revature.data.DAOFactory;
import com.revature.data.TileDAO;

public class TileServiceImpl implements TileService {
	private TileDAO tileDao;
	
	public TileServiceImpl() {
		tileDao = DAOFactory.getTileDAO();
	}

	@Override
	public Integer addTile(Tile t) {
		return tileDao.add(t);
	}

	@Override
	public Tile getTileById(Integer id) {
		return tileDao.getById(id);
	}

	@Override
	public Tile getTileByXY(Integer boardId, Integer x, Integer y) {
		return tileDao.getByXY(boardId, x, y);
	}

	@Override
	public Set<Tile> getTileByX(Integer boardId, Integer x) {
		return tileDao.getByX(boardId, x);
	}

	@Override
	public Set<Tile> getTileByY(Integer boardId, Integer y) {
		return tileDao.getByY(boardId, y);
	}

	@Override
	public Set<Tile> getTileByBoardId(Integer boardId) {
		return tileDao.getByBoardId(boardId);
	}

	@Override
	public Set<Tile> getTileByStatus(Integer boardId, TileStatus status) {
		return tileDao.getByStatus(boardId, status);
	}

	@Override
	public Set<Tile> getTileBySquid(Integer boardId, Squid squid) {
		return tileDao.getBySquid(boardId, squid);
	}

	@Override
	public void updateTile(Tile t) {
		tileDao.update(t);
	}

	@Override
	public void deleteTile(Tile t) {
		tileDao.delete(t);
	}
}