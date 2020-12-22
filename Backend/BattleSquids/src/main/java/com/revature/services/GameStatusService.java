package com.revature.services;

import java.util.Set;

import com.revature.beans.GameStatus;

public interface GameStatusService {
	
	public Integer addGameStatus(GameStatus gs);
	public Set<GameStatus> getallGameStatus();
	public GameStatus getgamestatusbyid(Integer id);
	public void updategamestatus(GameStatus gs);
	public void deletegamestatus(GameStatus gs);

}
