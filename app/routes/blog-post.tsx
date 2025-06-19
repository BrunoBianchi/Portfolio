import { redirect } from "react-router";
import PostScreen from "~/screens/post-screen";

export default function BlogPost() {
  return <PostScreen />;
}

// Loader para redirecionar ou carregar dados se necessário
export async function loader({ params }: { params: { id: string } }) {
  // Aqui você pode adicionar lógica para carregar dados do post
  // ou redirecionar se necessário
  return null;
}
