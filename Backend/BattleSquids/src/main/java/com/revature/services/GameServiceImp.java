package com.revature.services;

import java.util.Set;

import com.revature.beans.Game;
import com.revature.data.DAOFactory;
import com.revature.data.GameDAO;

public class GameServiceImp implements GameService{
		
	GameDAO dao=DAOFactory.getGameDAO();
	
		
	@Override
	public Integer addGame(Game g) {
		
		return dao.add(g);
	}

	@Override
	public Set<Game> getallgames() {
		
		Set<Game> games= dao.getAll();
		for(Game game: games) {
			games.add(game);
		//	return games;
		}
		return games;
	}

	@Override
	public Game getgamebyid(Integer id) {
	return dao.getById(id);
	}

	@Override
	public void updateGame(Game g) {
		// TODO Auto-generated method stub
		dao.update(g);
	}

	@Override
	public void deletegame(Game g) {
		// TODO Auto-generated method stub
		dao.delete(g);
	}

}
