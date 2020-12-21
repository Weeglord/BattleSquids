package com.revature.data;

import com.revature.beans.Board;

public class BoardHibernate extends GenericHibernate<Board> implements BoardDAO {

	public BoardHibernate() {
		super(Board.class);
		// TODO Auto-generated constructor stub
	}

}
