using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using RAT.server.Interfaces;
using RAT.server.Models;

namespace RAT.server.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class JobController : ControllerBase
{
	private readonly IJsonService _jsonService;
	private readonly TextInfo _textInfo;

	public JobController(IJsonService jsonService)
	{
		_jsonService = jsonService;
		_textInfo = new CultureInfo("en-US").TextInfo;
	}

	[HttpPost]
	public ActionResult<Result<Job>> SaveNewJob(Job job)
	{
		job.Skills = job.Skills?.Select(s => _textInfo.ToTitleCase(s.Trim()));
		var result = _jsonService.SaveNewJob(job);
		return Ok(result);
	}

	[HttpGet]
	public ActionResult<Result<Job[]>> GetAllJobs()
	{
		return Ok();
	}


	//
	// [HttpGet]
	// public async Task<IActionResult> RetrieveJobPostFromUrl(string url)
	// {
	// 	var browserFetcher = new BrowserFetcher();
	// 	await browserFetcher.DownloadAsync();
	//
	// 	await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
	// 	{
	// 		Headless = true
	// 	});
	//
	// 	await using var page = await browser.NewPageAsync();
	// 	await page.GoToAsync(url, WaitUntilNavigation.Networkidle0);
	//
	// 	var htmlString = await page.GetContentAsync();
	// 	var doc = new HtmlDocument();
	// 	doc.LoadHtml(htmlString);
	//
	// 	System.IO.File.WriteAllText("/Users/eric/Projects/ResumeAssistanceTool/RAT.server/html.txt", htmlString);
	// 	await browser.CloseAsync();
	//
	// 	return Ok();
	// }
}