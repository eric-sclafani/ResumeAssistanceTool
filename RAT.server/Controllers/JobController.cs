using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;

namespace RAT.server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class JobController : ControllerBase
{
	
	
	
	
	
	[HttpGet]
	public async Task<IActionResult> RetrieveJobPostFromUrl(string url)
	{
		var browserFetcher = new BrowserFetcher();
		await browserFetcher.DownloadAsync();

		await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
		{
			Headless = true
		});

		await using var page = await browser.NewPageAsync();
		await page.GoToAsync(url, WaitUntilNavigation.Networkidle0);

		var htmlString = await page.GetContentAsync();
		var doc = new HtmlDocument();
		doc.LoadHtml(htmlString);
		
		System.IO.File.WriteAllText("/Users/eric/Projects/ResumeAssistanceTool/RAT.server/html.txt", htmlString);
		await browser.CloseAsync();
		
		return Ok();
	}
}