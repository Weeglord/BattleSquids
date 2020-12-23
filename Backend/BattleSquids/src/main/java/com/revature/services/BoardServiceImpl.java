package com.revature.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.beans.Board;
import com.revature.beans.Tile;
import com.revature.data.BoardDAO;
import com.revature.data.DAOFactory;

@Service
public class BoardServiceImpl implements BoardService {
	private BoardDAO dao;
	
	@Autowired
	public BoardServiceImpl(BoardDAO d)
	{
		dao = d;
	}
	
	@Override
	public Integer addBoard(Board b) {
		Tile[][] tiles = b.getTiles();
		Integer boardId = dao.add(b);
		for(int i = 0; i < tiles.length; i++)
		{
			for(int j = 0; j < tiles[i].length; j++)
			{
				tiles[i][j].setBoardId(boardId);
				DAOFactory.getTileDAO().add(tiles[i][j]);
			}
		}
		return boardId;
	}

	@Override
	public Set<Board> getAllBoard() {
		Set<Board> all = dao.getAll();
		for(Board b: all)
		{
			List<Tile> allTiles = new ArrayList<>();
			allTiles.addAll(DAOFactory.getTileDAO().getByBoardId(b.getId()));
			
			Tile[][] tiles = new Tile[10][10];
			
			for(Tile t : allTiles)
			{
				tiles[t.getX()][t.getY()] = t;
			}
			b.setTiles(tiles);
		}
		return all;
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
			boa.setTiles(tiles);
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
