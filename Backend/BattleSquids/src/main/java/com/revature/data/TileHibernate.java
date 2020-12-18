package com.revature.data;

import com.revature.beans.Tile;

public class TileHibernate extends GenericHibernate<Tile> implements TileDAO {

	public TileHibernate() {
		super(Tile.class);
	}

}
