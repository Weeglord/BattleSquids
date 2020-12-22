package com.revature.services;

import java.util.Set;

import com.revature.beans.InviteStatus;
import com.revature.data.DAOFactory;
import com.revature.data.InviteStatusDAO;

public class InviteStatusServiceImpl implements InviteStatusService {
	InviteStatusDAO dao = DAOFactory.getInviteStatusDAO();
	
	@Override
	public Integer addInviteStatus(InviteStatus i) {
		return dao.add(i);
	}

	@Override
	public Set<InviteStatus> getAllInviteStatuses() {
		return dao.getAll();
	}

	@Override
	public InviteStatus getInviteStatusById(Integer id) {
		return dao.getById(id);
	}

	@Override
	public void updateInviteStatus(InviteStatus i) {
		dao.update(i);
	}

	@Override
	public void deleteInviteStatus(InviteStatus i) {
		dao.delete(i);	
	}
}