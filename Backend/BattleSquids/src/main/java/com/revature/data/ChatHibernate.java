package com.revature.data;

import com.revature.beans.Chat;

public class ChatHibernate extends GenericHibernate<Chat> implements ChatDAO {

	public ChatHibernate() {
		super(Chat.class);
		// TODO Auto-generated constructor stub
	}

}
