import PostScreen from "~/screens/post-screen.tsx";

export default function BlogPostRoute() {
  return <PostScreen />;
}

// Re-export loader and meta from PostScreen
export { loader, meta } from "~/screens/post-screen.tsx";
