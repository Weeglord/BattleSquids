package exceptions;

public class InviteToFullGameException extends Exception{
	public InviteToFullGameException() {
		super("This game is full.");
	}
}
