import { type RouteConfig, index, layout,route } from "@react-router/dev/routes";
export default [
    index("layouts/subdomain-layout.tsx"),
    layout("./layouts/blogs-layout.tsx",[
        route("post/:id", "./screens/post-screen.tsx"),
    ])
] satisfies RouteConfig;
