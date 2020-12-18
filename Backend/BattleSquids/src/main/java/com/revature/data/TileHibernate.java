package com.revature.data;

import com.revature.beans.Tile;

public class TileHibernate extends GenericHibernate<Tile> implements TileDAO{

	//must implement any methods in TileDAO, but if these methods are already
	//implemented in GenericHibernate, you're good to go
	
	public TileHibernate() {
		super(Tile.class);
	}

	//if any additional work is meeded, override abstract methods of GenericHibernate
	//or TileDAO if TileDAO specifies additional methods beyond what GenericHibernate has
}
