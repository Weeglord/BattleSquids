package com.revature.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.revature.beans.Board;
import com.revature.beans.Tile;
import com.revature.data.BoardDAO;
import com.revature.data.DAOFactory;

public class BoardSericeImpl implements BoardService {
	BoardDAO dao = DAOFactory.getBoardDAO();

	@Override
	public Integer addBoard(Board b) {
		return dao.add(b);
	}

	@Override
	public Set<Board> getAllBoard() {
		return dao.getAll();
	}

	@Override
	public Board getBoardById(Integer id) {
		Board boa = dao.getById(id);
		if (boa != null)
		{
			List<Tile> allTiles = new ArrayList<>();
			allTiles.addAll(DAOFactory.getTileDAO().getByBoardId(id));
			
			Tile[][] tiles = new Tile[10][10];
			
			for(Tile t : allTiles)
			{
				tiles[t.getX()][t.getY()] = t;
			}
		}
		return boa;
	}

	@Override
	public void updateBoard(Board b) {
		dao.update(b);

	}

	@Override
	public void deleteBoard(Board b) {
		dao.delete(b);

	}

}
