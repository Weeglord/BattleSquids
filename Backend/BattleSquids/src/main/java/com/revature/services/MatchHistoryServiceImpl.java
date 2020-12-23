package com.revature.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.beans.MatchHistory;
import com.revature.data.MatchHistoryDAO;

@Service
public class MatchHistoryServiceImpl implements MatchHistoryService {
	private MatchHistoryDAO dao;

	
	@Autowired
	public MatchHistoryServiceImpl(MatchHistoryDAO dao) {
		this.dao = dao;
	}

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
