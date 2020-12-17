package com.revature.beans;

public class Invite {
	//id sender reciever game type status
	private Integer id;
	private Person sender;
	private Person reciever;
	private Integer gameId;
	private InviteType type;
	private InviteStatus status;
	
	public Invite()
	{
		id = -1;
		sender = new Person();
		reciever = new Person();
		gameId = -1;
		type = new InviteType();
		status = new InviteStatus();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Person getSender() {
		return sender;
	}

	public void setSender(Person sender) {
		this.sender = sender;
	}

	public Person getReciever() {
		return reciever;
	}

	public void setReciever(Person reciever) {
		this.reciever = reciever;
	}

	public Integer getGameId() {
		return gameId;
	}

	public void setGameId(Integer gameId) {
		this.gameId = gameId;
	}

	public InviteType getType() {
		return type;
	}

	public void setType(InviteType type) {
		this.type = type;
	}

	public InviteStatus getStatus() {
		return status;
	}

	public void setStatus(InviteStatus status) {
		this.status = status;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((gameId == null) ? 0 : gameId.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((reciever == null) ? 0 : reciever.hashCode());
		result = prime * result + ((sender == null) ? 0 : sender.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Invite other = (Invite) obj;
		if (gameId == null) {
			if (other.gameId != null)
				return false;
		} else if (!gameId.equals(other.gameId))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (reciever == null) {
			if (other.reciever != null)
				return false;
		} else if (!reciever.equals(other.reciever))
			return false;
		if (sender == null) {
			if (other.sender != null)
				return false;
		} else if (!sender.equals(other.sender))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Invite [id=" + id + ", sender=" + sender + ", reciever=" + reciever + ", gameId=" + gameId + ", type="
				+ type + ", status=" + status + "]";
	}
	
	
}
