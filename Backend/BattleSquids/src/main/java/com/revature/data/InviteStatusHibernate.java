package com.revature.data;

import com.revature.beans.InviteStatus;

public class InviteStatusHibernate extends GenericHibernate<InviteStatus> implements InviteStatusDAO{

	public InviteStatusHibernate() {
		super(InviteStatus.class);
	}

}
