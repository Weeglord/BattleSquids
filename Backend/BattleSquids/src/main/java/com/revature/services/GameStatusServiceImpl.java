package com.revature.services;

import java.util.Set;

import com.revature.beans.GameStatus;
import com.revature.data.DAOFactory;
import com.revature.data.GameStatusDAO;

public class GameStatusServiceImpl implements GameStatusService{
		
	GameStatusDAO dao=DAOFactory.getGameStatusDAO();
		
	@Override
	public Integer addGameStatus(GameStatus gs) {
		// TODO Auto-generated method stub
		return dao.add(gs);
	}

	@Override
	public Set<GameStatus> getAllGameStatus() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	public GameStatus getGameStatusById(Integer id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public void updateGameStatus(GameStatus gs) {
		// TODO Auto-generated method stub
		dao.update(gs);
	}

	@Override
	public void deleteGameStatus(GameStatus gs) {
		// TODO Auto-generated method stub
		dao.delete(gs);
	}

}
