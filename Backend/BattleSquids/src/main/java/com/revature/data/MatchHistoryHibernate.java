package com.revature.data;

import org.springframework.stereotype.Repository;

import com.revature.beans.MatchHistory;

@Repository
public class MatchHistoryHibernate extends GenericHibernate<MatchHistory> implements MatchHistoryDAO {

	public MatchHistoryHibernate() {
		super(MatchHistory.class);
	}
}
