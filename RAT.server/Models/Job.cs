namespace RAT.server.Models;

public class Job
{
	public int JobId { get; set; }
	public string? Title { get; set; }
	public string? Description { get; set; }
	public IEnumerable<string>? Skills { get; set; }
	public string? JobUrl { get; set; }
}