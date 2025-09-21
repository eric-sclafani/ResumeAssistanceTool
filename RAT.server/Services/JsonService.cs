using System.Text.Json;
using RAT.server.Interfaces;
using RAT.server.Models;

namespace RAT.server.Services;

public class JsonService : IJsonService
{
	private readonly JsonSerializerOptions options = new() { WriteIndented = true };

	public Result<Job> SaveNewJob(Job job)
	{
		var result = new Result<Job>();

		var folderPath = Directory.GetCurrentDirectory() + "/Data/";
		var filePath = Path.Combine(folderPath, "data.json");
		HandleDataPaths(folderPath, filePath);

		try
		{
			var allJobs = GetAllJobs();
			var newId = allJobs.Count != 0 ? allJobs.Max(j => j.JobId) + 1 : 1;

			job.JobId = newId;
			allJobs.Add(job);

			var jsonString = JsonSerializer.Serialize(allJobs, options);
			File.WriteAllText(filePath, jsonString);

			result.Message = "Job successfully saved!";
			result.Data = job;
		}
		catch (Exception e)
		{
			result.Success = false;
			result.Message = $"JSON failed to save: {e.Message}";
		}

		return result;
	}

	public List<Job> GetAllJobs()
	{
		var jobs = new List<Job>();
		var folderPath = Directory.GetCurrentDirectory() + "/Data/";
		var filePath = Path.Combine(folderPath, "data.json");
		HandleDataPaths(folderPath, filePath);
		try
		{
			var json = File.ReadAllText(filePath);
			jobs = JsonSerializer.Deserialize<List<Job>>(json) ?? [];
		}
		catch (Exception e)
		{
			Console.WriteLine(e);
		}

		return jobs;
	}

	public Result<Job> DeleteJob(int jobId)
	{
		var result = new Result<Job>();
		var allJobs = GetAllJobs();
		var job = allJobs.Find(j => j.JobId == jobId);
		if (job != null)
		{
			allJobs.Remove(job);
			result.Data = job;
			result.Message = "Success! Job removed.";
		}
		else
		{
			result.Message = "Error: job not found";
			result.Success = false;
		}

		return result;
	}

	private static void HandleDataPaths(string folderPath, string filePath)
	{
		if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);
		if (!File.Exists(filePath)) File.Create(filePath);
	}
}