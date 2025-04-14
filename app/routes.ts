import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("/dashboard", "routes/home.tsx"),
  route("/call-logs", "routes/call-logs.tsx"),
  route("/login", "routes/login.tsx"),
  route("/register", "routes/register.tsx"),
  route("/forgot-password", "routes/forgot-password.tsx")
] satisfies RouteConfig;
