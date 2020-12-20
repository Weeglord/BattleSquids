package exceptions;

public class SameSenderAndReceiverException extends Exception{
	public SameSenderAndReceiverException() {
		super("People cannot send invites to themselves to join a game.");
	}
}
