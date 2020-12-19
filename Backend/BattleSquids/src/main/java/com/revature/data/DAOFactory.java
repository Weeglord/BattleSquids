package com.revature.data;


public class DAOFactory {

	private static DAOFactory self = null;
	
	private static TileDAO tileDAO = null;
	
	private static TileStatusDAO tStatDAO = null;
	
	private static ChatDAO chatDAO = null;
	
	private static GameDAO gameDAO= null;
	
	private static GameStatusDAO gamestatusDAO= null;
	
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
	
	public static ChatDAO getchatDAO()
	{
		if(chatDAO == null)
		{
			chatDAO = new ChatHibernate();
		}
		return chatDAO;
	}
	public static GameDAO getGameDAO()
	{
		if(gameDAO == null)
		{
			gameDAO = new GameHibernate();
		}
		return gameDAO;
	}
	
	public static GameStatusDAO getgameStatusDAO() {
		if(gamestatusDAO==null) 
		{
			gamestatusDAO= new GameStatusHibernate();
		}
		return gamestatusDAO;
	}
	
	
}
