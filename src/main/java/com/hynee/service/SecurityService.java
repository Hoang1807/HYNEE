package com.hynee.service;

import java.security.MessageDigest;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {
	public String encodePassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt());
	}

	public String encodePassword(String password, int log_rounds) {
		return BCrypt.hashpw(password, BCrypt.gensalt(log_rounds));
	}

	public boolean matches(String rawPassword, String encodedPassword) {
		return BCrypt.checkpw(rawPassword, encodedPassword);
	}

	public String sha256(String base) {
		try {
			final MessageDigest digest = MessageDigest.getInstance("SHA-256");
			final byte[] hash = digest.digest(base.getBytes("UTF-8"));
			final StringBuilder hexString = new StringBuilder();
			for (int i = 0; i < hash.length; i++) {
				final String hex = Integer.toHexString(0xff & hash[i]);
				if (hex.length() == 1)
					hexString.append('0');
				hexString.append(hex);
			}
			return hexString.toString();
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}

	public boolean matchesSha256(String rawPassword, String encodedPassword) {
		String encodedPass = sha256(rawPassword);
		return encodedPass.equals(encodedPassword);

	}
}
