using RAT.server.Models;

namespace RAT.server.Interfaces;

public interface IJsonService
{
	public List<Job> GetAllJobs();
	public Result<Job> SaveNewJob(Job job);
}