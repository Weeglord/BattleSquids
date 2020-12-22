package com.revature.services;

import java.util.Set;

import com.revature.beans.MatchHistory;
import com.revature.data.DAOFactory;
import com.revature.data.MatchHistoryDAO;

public class MatchHistoryServiceImpl implements MatchHistoryService {
	MatchHistoryDAO dao = DAOFactory.getMatchHistoryDAO();

	@Override
	public Integer addMatchHistory(MatchHistory b) {
		return dao.add(b);
	}

	@Override
	public Set<MatchHistory> getAllMatchHistory() {
		return dao.getAll();
	}

	@Override
	public MatchHistory getMatchHistoryById(Integer id) {
		return dao.getById(id);
	}

	@Override
	public void updateMatchHistory(MatchHistory b) {
		dao.update(b);

	}

	@Override
	public void deleteMatchHistory(MatchHistory b) {
		dao.delete(b);

	}

}
