package com.revature.data;

import com.revature.beans.Game;

public class GameHibernate extends GenericHibernate<Game> implements GameDAO{

	public GameHibernate() {
		super(Game.class);
		// TODO Auto-generated constructor stub
	}

}
