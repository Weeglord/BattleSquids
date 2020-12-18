package com.revature.data;


public class DAOFactory {

	private static DAOFactory self = null;
	
	private static TileDAO tileDAO = null;
	
	private static TileStatusDAO tStatDAO = null;
	
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
}
