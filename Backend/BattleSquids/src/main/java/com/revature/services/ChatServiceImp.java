package com.revature.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.revature.beans.Chat;
import com.revature.data.ChatDAO;
import com.revature.data.DAOFactory;

public class ChatServiceImp implements ChatService {
	
	ChatDAO dao=DAOFactory.getChatDAO();

	@Override
	public Integer addChat(Chat c) {
		return dao.add(c);
	}

	@Override
	public Set<Chat> getallChat() {
		
		Set<Chat> chats= dao.getAll();
		for(Chat c: chats) {
			chats.add(c);
		}
		return chats;
		
	}

	@Override
	public Chat getChatbyId(Integer id) {
	
		Chat chat=dao.getById(id);
		if(chat !=null) {
			return chat;
		}else return null;
		
	}

	@Override
	public void updateChat(Chat c) {
		dao.update(c);
	}

	@Override
	public void deleteChat(Chat c) {
		dao.delete(c);
	}

}
