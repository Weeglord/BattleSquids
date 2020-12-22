package com.revature.services;

import java.util.Set;

import com.revature.beans.Game;

public interface GameService {

	public Integer addGame(Game g);
	public Set<Game> getallgames();
	public Game getgamebyid(Integer id);
	public void updateGame(Game g);
	public void deletegame(Game g);
}
