package com.revature.data;

import java.util.Set;

import com.revature.beans.Invite;

import exceptions.InviteToFullGameException;
import exceptions.SameSenderAndReceiverException;

public class InviteHibernate extends GenericHibernate<Invite> implements InviteDAO{

	public InviteHibernate() {
		super(Invite.class);
	}
	
	@Override
	public Set<Invite> getAllInvitesSentByPersonWithId(Integer id){
		return this.getSetOfManyToOneRelations("receiver_id", id);
	}
	
	@Override
	public Set<Invite> getAllInvitesReceivedByPersonWithId(Integer id){
		//simplest approach would be to iterate through result of this.getAll() 
		return this.getSetOfManyToOneRelations("receiver_id", id);
	}
	
	@Override
	public Set<Invite> getAllInvitesForGameWithId(Integer id){
		return this.getSetOfManyToOneRelations("game_id", id);
	}
	
	@Override
	public Set<Invite> getAllInvitesWithTypeId(Integer id){
		return this.getSetOfManyToOneRelations("invite_type_id", id);
	}
	
	@Override
	public Set<Invite> getAllInvitesWithStatusId(Integer id){
		return this.getSetOfManyToOneRelations("invite_status_id", id);
	}

	@Override
	public Integer addInvite(Invite i) throws SameSenderAndReceiverException, InviteToFullGameException {
		if(i.getSender().getId() == i.getReceiver().getId()) {
			throw new SameSenderAndReceiverException();
		}else{
			return this.add(i);
		}
	}
}
