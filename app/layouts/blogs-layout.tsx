import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import BlogComponente from "~/screens/blog-screen";

export default function BlogLayout() {
  const [includesBlogPath, setincludesBlogPath] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setincludesBlogPath(window.location.pathname.includes("/post/"));
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <h1 className="text-center p-4 text-2xl text-primary font-semibold">Carregando ...</h1>
      ) : includesBlogPath ? (
        <Outlet />
      ) : (
        <BlogComponente></BlogComponente>
      )}
    </>
  );
}
