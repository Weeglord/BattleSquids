package com.revature.data;

import com.revature.beans.MatchHistory;

public class MatchHistoryHibernate extends GenericHibernate<MatchHistory> implements MatchHistoryDAO {

	public MatchHistoryHibernate() {
		super(MatchHistory.class);
	}
}
