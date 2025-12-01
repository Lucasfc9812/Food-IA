# 🚀 Guia de Deploy - Food IA no Vercel

## Pré-requisitos
- Conta no [GitHub](https://github.com)
- Conta no [Vercel](https://vercel.com)
- Git instalado no seu computador

## Passo 1: Preparar o Repositório Git

### 1.1 Inicializar o Git (se ainda não foi feito)
```bash
cd "c:\Users\FSOS\Food IA"
git init
```

### 1.2 Adicionar todos os arquivos
```bash
git add .
```

### 1.3 Fazer o primeiro commit
```bash
git commit -m "Initial commit - Food IA App"
```

## Passo 2: Criar Repositório no GitHub

### 2.1 Acessar GitHub
1. Acesse [github.com](https://github.com)
2. Faça login na sua conta
3. Clique no botão **"+"** no canto superior direito
4. Selecione **"New repository"**

### 2.2 Configurar o Repositório
- **Repository name:** `food-ia-app` (ou o nome que preferir)
- **Description:** "AI-powered food nutrition tracking app"
- **Visibilidade:** Escolha **Public** ou **Private**
- ⚠️ **NÃO marque** "Initialize this repository with a README"
- Clique em **"Create repository"**

### 2.3 Conectar seu projeto ao GitHub
Após criar o repositório, o GitHub mostrará comandos. Use estes:

```bash
git remote add origin https://github.com/SEU_USUARIO/food-ia-app.git
git branch -M main
git push -u origin main
```

> **Nota:** Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub

## Passo 3: Deploy no Vercel

### 3.1 Acessar Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login (recomendo usar a mesma conta do GitHub)

### 3.2 Importar Projeto
1. Clique em **"Add New..."** → **"Project"**
2. Selecione **"Import Git Repository"**
3. Autorize o Vercel a acessar seus repositórios do GitHub
4. Selecione o repositório `food-ia-app`

### 3.3 Configurar o Projeto
- **Framework Preset:** Next.js (deve detectar automaticamente)
- **Root Directory:** `.` (deixe como está)
- **Build Command:** `npm run build` (já configurado)
- **Output Directory:** `.next` (já configurado)

### 3.4 Configurar Variáveis de Ambiente
⚠️ **MUITO IMPORTANTE:** Antes de fazer o deploy, adicione as variáveis de ambiente:

1. Clique em **"Environment Variables"**
2. Adicione cada uma das seguintes variáveis:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sua URL do Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sua chave anônima do Supabase |
| `GOOGLE_API_KEY` | Sua chave da API do Google Gemini |

> **Onde encontrar essas chaves:**
> - **Supabase:** Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API
> - **Google API:** [Google AI Studio](https://makersuite.google.com/app/apikey)

### 3.5 Fazer o Deploy
1. Clique em **"Deploy"**
2. Aguarde o build (leva 1-3 minutos)
3. ✅ Pronto! Seu app estará no ar

## Passo 4: Configurar Supabase para Produção

### 4.1 Adicionar URL do Vercel nas configurações do Supabase
1. Após o deploy, copie a URL do seu app (ex: `https://food-ia-app.vercel.app`)
2. Acesse seu projeto no Supabase Dashboard
3. Vá em **Authentication** → **URL Configuration**
4. Adicione a URL do Vercel em **Site URL**
5. Adicione `https://food-ia-app.vercel.app/**` em **Redirect URLs**

## 📝 Atualizações Futuras

Sempre que fizer mudanças no código:

```bash
# 1. Adicionar mudanças
git add .

# 2. Fazer commit
git commit -m "Descrição das mudanças"

# 3. Enviar para o GitHub
git push
```

O Vercel detectará automaticamente e fará o deploy da nova versão! 🎉

## 🔧 Comandos Úteis

### Ver status do Git
```bash
git status
```

### Ver histórico de commits
```bash
git log --oneline
```

### Desfazer mudanças não commitadas
```bash
git checkout .
```

## ⚠️ Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/food-ia-app.git
```

### Erro de autenticação no GitHub
- Use um **Personal Access Token** em vez de senha
- Gere em: GitHub → Settings → Developer settings → Personal access tokens

### Build falhou no Vercel
- Verifique se todas as variáveis de ambiente foram configuradas
- Verifique os logs de build no Vercel Dashboard
- Certifique-se de que o projeto roda localmente com `npm run build`

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste localmente com `npm run build` antes de fazer push
3. Verifique se as variáveis de ambiente estão corretas

---

**Boa sorte com o deploy! 🚀**
