// src/middlewares/rateLimiter.js
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const MAX_REQ = Number(process.env.RATE_LIMIT_MAX || 60);

const hits = new Map();

module.exports = function rateLimiter(req, res, next) {
  const now = Date.now();
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const entry = hits.get(ip) || { count: 0, start: now };

  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  hits.set(ip, entry);

  if (entry.count > MAX_REQ) {
    return res.status(429).json({ error: "Too many requests" });
  }

  next();
};