package com.revature.data;

import com.revature.beans.InviteType;

public class InviteTypeHibernate extends GenericHibernate<InviteType> implements InviteTypeDAO {

	public InviteTypeHibernate() {
		super(InviteType.class);
	}
}
