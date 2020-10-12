package com.shopify.challenge.util;

import org.springframework.security.core.context.SecurityContextHolder;

public final class UserUtil {
    private UserUtil() {}

    public static String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
