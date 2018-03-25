package com.krun.douhua.entity;

public enum BookTypes {

	Novel("小说"),
	Love("爱情"),
	History("历史"),
	Foreign("外国文学"),
	Youth("青春"),
	Motivation("励志"),
	Essay("随笔"),
	Bio("传记"),
	Detective("推理"),
	Travel("旅行"),
	Fantasy("奇幻"),
	Business("经管");

	private String name;

	BookTypes(String name) {
		this.name = name;
	}

	public static String getName(String type) {
		for (BookTypes t : BookTypes.values()) {
			if (!t.name().toLowerCase().equals(type)) continue;
			return t.name;
		}
		return "未知";
	}
}
