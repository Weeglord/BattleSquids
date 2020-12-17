package com.revature.beans;

public class Tile {
	private Integer id;
	private Integer BoardId;
	private TileStatus status;
	
	public Tile()
	{
		id = -1;
		BoardId = -1;
		status = new TileStatus();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getBoardId() {
		return BoardId;
	}

	public void setBoardId(Integer boardId) {
		BoardId = boardId;
	}

	public TileStatus getStatus() {
		return status;
	}

	public void setStatus(TileStatus status) {
		this.status = status;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((BoardId == null) ? 0 : BoardId.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
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
		Tile other = (Tile) obj;
		if (BoardId == null) {
			if (other.BoardId != null)
				return false;
		} else if (!BoardId.equals(other.BoardId))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Tile [id=" + id + ", BoardId=" + BoardId + ", status=" + status + "]";
	}
	
	
}
