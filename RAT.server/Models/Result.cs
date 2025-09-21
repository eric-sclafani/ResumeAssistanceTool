namespace RAT.server.Models;

public class Result<T>
{
	public bool Success { get; set; } = true;
	public T? Data { get; set; }
	public string? Message { get; set; }
}