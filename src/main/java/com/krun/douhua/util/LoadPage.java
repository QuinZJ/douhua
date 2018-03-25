package com.krun.douhua.util;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

public class LoadPage {

	public static String get(String url) {
		StringBuilder builder = new StringBuilder();
		try {
			HttpsURLConnection conn = (HttpsURLConnection) new URL(url).openConnection();
			conn.setRequestProperty("Referer", "https://m.douban.com/book/");
			conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Mobile Safari/537.36");
			conn.setDoOutput(true);
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = reader.readLine()) != null)
				builder.append(line).append('\n');
		} catch (Exception e) {
			e.printStackTrace();
		}
		return builder.toString();
	}

}
