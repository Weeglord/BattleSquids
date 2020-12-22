package com.revature.services;

import java.util.Set;

import com.revature.beans.InviteType;
import com.revature.data.DAOFactory;
import com.revature.data.InviteTypeDAO;

public class InviteTypeServiceImpl implements InviteTypeService{
	InviteTypeDAO dao = DAOFactory.getInviteTypeDAO();
	
	@Override
	public Integer addInviteType(InviteType i) {
		return dao.add(i);
	}

	@Override
	public Set<InviteType> getAllInviteTypes() {
		return dao.getAll();
	}

	@Override
	public InviteType getInviteTypeById(Integer id) {
		return dao.getById(id);
	}

	@Override
	public void updateInviteType(InviteType i) {
		dao.update(i);
	}

	@Override
	public void deleteInviteType(InviteType i) {
		dao.delete(i);	
	}

}
