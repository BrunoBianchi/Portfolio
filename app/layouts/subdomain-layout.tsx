import { useEffect, useState } from "react";
import Home from "~/screens/home-screen";
import BlogLayout from "./blogs-layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const host = window.location.hostname;
    const parts = host.split(".");

    setSubdomain(parts[0]);

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <h1 className="text-center p-4 text-2xl text-primary font-semibold">
        Carregando ...
      </h1>
    );
  }
  if (subdomain === "blog") {
    return <BlogLayout></BlogLayout>;
  }

  return <Home></Home>;
}
