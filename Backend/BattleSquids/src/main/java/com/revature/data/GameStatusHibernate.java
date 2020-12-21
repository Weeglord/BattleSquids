package com.revature.data;

import com.revature.beans.GameStatus;

public class GameStatusHibernate extends GenericHibernate<GameStatus> implements GameStatusDAO{

	public GameStatusHibernate() {
		super(GameStatus.class);
		// TODO Auto-generated constructor stub
	}

}
