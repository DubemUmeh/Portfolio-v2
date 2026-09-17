export interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Verifies a Cloudflare Turnstile token with Cloudflare's siteverify API.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
  expectedAction?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY environment variable is not configured.");
    return { success: false, error: "Server configuration error" };
  }

  if (!token || typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return { success: false, error: "Invalid or missing Turnstile token" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`Turnstile siteverify HTTP error: ${res.status}`);
      return { success: false, error: "Failed to verify bot protection" };
    }

    const data: TurnstileVerifyResponse = await res.json();

    if (!data.success) {
      console.warn("Turnstile verification failed:", data["error-codes"]);
      return { success: false, error: "Bot verification failed" };
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn(`Turnstile action mismatch: expected ${expectedAction}, got ${data.action}`);
      return { success: false, error: "Turnstile action mismatch" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during Turnstile verification:", error);
    return { success: false, error: "Turnstile verification service unavailable" };
  }
}
