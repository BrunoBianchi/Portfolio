# Sistema de Comentários - Configuração

Este documento explica como configurar o sistema de comentários nativo com autenticação GitHub.

## Configuração do GitHub OAuth

### 1. Criar uma GitHub App

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Preencha os campos:
   - **Application name**: Nome do seu blog/site
   - **Homepage URL**: `https://blog.brunobianchi.dev` (ou seu domínio)
   - **Authorization callback URL**: `https://blog.brunobianchi.dev/auth/callback`
4. Clique em "Register application"
5. Anote o **Client ID** e **Client Secret**

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` com suas configurações:
   ```env
   VITE_GITHUB_CLIENT_ID=seu_client_id_aqui
   VITE_API_BASE_URL=https://api.brunobianchi.dev
   ```

### 3. Configurar Backend (API)

Você precisará implementar os seguintes endpoints na sua API:

#### POST `/api/auth/github/token`
Troca o código OAuth por um token de acesso:
```json
{
  "code": "código_do_github",
  "state": "state_de_segurança"
}
```

#### GET `/posts/:postId/comments`
Retorna comentários de um post:
```json
{
  "success": true,
  "data": {
    "comments": [...],
    "total": 10,
    "page": 1,
    "limit": 20
  }
}
```

#### POST `/posts/:postId/comments`
Cria um novo comentário (requer autenticação):
```json
{
  "content": "Conteúdo do comentário",
  "parentId": "id_do_comentário_pai" // opcional para respostas
}
```

#### PUT `/comments/:commentId`
Atualiza um comentário (requer autenticação):
```json
{
  "content": "Novo conteúdo"
}
```

#### DELETE `/comments/:commentId`
Deleta um comentário (requer autenticação)

## Estrutura dos Dados

### Comentário
```typescript
interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
  };
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
  parentId?: string;
}
```

### Usuário GitHub
```typescript
interface GitHubUser {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  email?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}
```

## Funcionalidades Implementadas

- ✅ Autenticação com GitHub OAuth
- ✅ Login/logout de usuários
- ✅ Criação de comentários
- ✅ Edição de comentários próprios
- ✅ Exclusão de comentários próprios
- ✅ Sistema de respostas (replies)
- ✅ Paginação de comentários
- ✅ Interface responsiva
- ✅ Modo escuro/claro
- ✅ Validação de formulários
- ✅ Estados de loading
- ✅ Tratamento de erros

## Componentes Criados

- `CommentsSection`: Componente principal da seção de comentários
- `CommentForm`: Formulário para criar/editar comentários
- `CommentItem`: Item individual de comentário com ações
- `LoginPrompt`: Prompt para login com GitHub
- `AuthProvider`: Contexto de autenticação
- `useComments`: Hook para gerenciar comentários
- `useAuth`: Hook para gerenciar autenticação

## Segurança

- Validação de state OAuth para prevenir CSRF
- Tokens armazenados no localStorage (considere usar httpOnly cookies em produção)
- Validação de propriedade de comentários no backend
- Sanitização de conteúdo (implemente no backend)

## Próximos Passos

1. Implementar os endpoints da API no backend
2. Configurar as variáveis de ambiente
3. Testar o fluxo completo de autenticação
4. Implementar moderação de comentários (opcional)
5. Adicionar notificações por email (opcional)
6. Implementar sistema de likes/dislikes (opcional)

## Troubleshooting

### Erro de CORS
Certifique-se de que sua API permite requisições do domínio do frontend.

### Erro de OAuth
Verifique se a URL de callback está correta nas configurações do GitHub.

### Comentários não carregam
Verifique se a API está retornando os dados no formato esperado.
