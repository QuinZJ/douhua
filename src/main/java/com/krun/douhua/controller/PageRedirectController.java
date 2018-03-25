package com.krun.douhua.controller;

import com.krun.douhua.entity.BookTypes;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class PageRedirectController {

	@GetMapping("/book/{type}")
	public String renderBookListByType(Model model,
									   @PathVariable("type") String type) {
		model.addAttribute("type", type);
		model.addAttribute("name", BookTypes.getName(type));
		return "type";
	}

	@GetMapping("/book/subject/{id}")
	public String renderBookById(Model model, @PathVariable("id") int id) {
		model.addAttribute("id", id);
		return "book";
	}

}
