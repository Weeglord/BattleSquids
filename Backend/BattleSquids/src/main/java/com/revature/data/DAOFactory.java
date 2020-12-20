package com.revature.data;

import com.revature.beans.Invite;

public class DAOFactory {

	private static DAOFactory self = null;
	
	private static TileDAO tileDAO = null;
	
	private static TileStatusDAO tStatDAO = null;
	
	private static InviteDAO inviteDAO = null;
	
	private static InviteDAO inviteStatusDAO = null;
	
	private static InviteDAO inviteTypeDAO = null;
	
	private DAOFactory()
	{
	}
	
	public static DAOFactory getDAOFactory()
	{
		if (self == null)
		{
			self = new DAOFactory();
		}
		return self;
	}
	
	public static TileDAO getTileDAO()
	{
		if(tileDAO == null)
		{
			tileDAO = new TileHibernate();
		}
		return tileDAO;
	}
	
	public static TileStatusDAO getTileStatusDAO()
	{
		if(tStatDAO == null)
		{
			tStatDAO = new TileStatusHibernate();
		}
		return tStatDAO;
	}

	public static InviteDAO getInviteDAO() {
		if(inviteDAO == null)
		{
			inviteDAO = new InviteHibernate();
		}
		return inviteDAO;
	}
	
	public static InviteStatusDAO getInviteStatusDAO() {
		if(inviteDAO == null)
		{
			inviteStatusDAO = new InviteStatusHibernate();
		}
		return inviteStatusDAO;
	}
	
	public static InviteTypeDAO getInviteTypeDAO() {
		if(inviteDAO == null)
		{
			inviteTypeDAO = new InviteTypeHibernate();
		}
		return inviteTypeDAO;
	}
}
