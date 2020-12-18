package com.revature.data;

import com.revature.beans.TileStatus;

public class TileStatusHibernate extends GenericHibernate<TileStatus> implements TileStatusDAO {

	public TileStatusHibernate() {
		super(TileStatus.class);
	}

}
