import { type RouteConfig, index, layout,route } from "@react-router/dev/routes";
export default [
    index("./layouts/subdomain-layout.tsx"),
    route("auth/callback", "./routes/auth.callback.tsx"),
    layout("./layouts/blogs-layout.tsx",[
        route("post/:id", "./screens/post-screen.tsx"),
    ]),
    // Rotas para path /blog/ (além do subdomínio)
    route("blog", "./screens/blog-screen.tsx"),
    route("blog/:id", "./routes/blog.$id.tsx"),
] satisfies RouteConfig;
