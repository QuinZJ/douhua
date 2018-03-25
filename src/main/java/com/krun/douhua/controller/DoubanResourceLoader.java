package com.krun.douhua.controller;

import com.krun.douhua.util.LoadPage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;

@RestController
public class DoubanResourceLoader {

	private static Calendar calendar = Calendar.getInstance();

	@GetMapping("/api/subject_collection/{type}/items")
	public String getHotBookList(@PathVariable("type") String type,
								 @RequestParam("start") int start,
								 @RequestParam("count") int count) {
		final String urlTemplate = "https://m.douban.com/rexxar/api/v2/subject_collection/%s/items?os=android&callback=a&start=%d&count=%d&loc_id=0&_=%s";
		String json = LoadPage.get(String.format(urlTemplate, type, start, count, calendar.getTime().getTime()));
		return json.substring(3, json.length() - 3);
	}

	@GetMapping("/api/subject_collection/filter_book_{type}_hot/items")
	public String getBookListByType(@PathVariable("type") String type,
									@RequestParam("start") int start,
								 @RequestParam("count") int count) {
		type = "novel".equals(type) ? "fiction" : type;
		type = "motivation".equals(type) ? "inspiration" : type;
		type = "bio".equals(type) ? "biography" : type;
		type = "business".equals(type) ? "economic" : type;
		final String urlTemplate = "https://m.douban.com/rexxar/api/v2/subject_collection/filter_book_%s_hot/items?os=android&for_mobile=1&callback=a&start=%d&count=%d&loc_id=0&_=%s";
		String json = LoadPage.get(String.format(urlTemplate, "novel".equals(type) ? "fiction" : type, start, count, calendar.getTime().getTime()));
		return json.substring(3, json.length() - 3);
	}

	@GetMapping("/api/book/{id}")
	public String getBookInfoById(@PathVariable("id") String id) {
		return LoadPage.get(String.format("https://m.douban.com/rexxar/api/v2/book/%s", id));
	}

	@GetMapping("/api/book/{id}/annotations")
	public String getAnnotationsByBookId(@PathVariable("id") String id) {
		return LoadPage.get(String.format("https://m.douban.com/rexxar/api/v2/book/%s/annotations?format=html&order=collect", id));
	}

	@GetMapping("/api/book/annotation/{id}")
	public String getAnnotationById(@PathVariable("id") String id) {
		return LoadPage.get(String.format("https://api.douban.com/v2/book/annotation/%s?format=html", id));
	}
}
