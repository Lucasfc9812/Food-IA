# 🍽️ Food IA - Nutritional Tracking Web App

Um aplicativo web moderno e responsivo para rastreamento nutricional com análise de alimentos por IA.

## 🚀 Funcionalidades

- 📸 **Captura de Fotos**: Tire fotos dos seus alimentos usando a câmera do dispositivo
- 🤖 **Análise com IA**: Análise nutricional automática usando Gemini Vision
- ✏️ **Edição Manual**: Ajuste os valores nutricionais conforme necessário
- 📊 **Dashboard**: Visualize totais diários de calorias, proteínas, carboidratos e gorduras
- 🖼️ **Galeria**: Veja todas as refeições registradas

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 16 (App Router)
- **Estilo**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Storage)
- **IA**: Google Generative AI (Gemini Vision)
- **Linguagem**: TypeScript

## 📋 Pré-requisitos

1. **Node.js** 20+ instalado
2. **Conta Supabase** (gratuita)
3. **Google API Key** para Gemini

## ⚙️ Configuração

### 1. Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá para **SQL Editor** e execute o script `supabase_setup.sql`
3. Copie as credenciais:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Obter Google API Key

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crie uma API key
3. Copie a chave → `GOOGLE_API_KEY`

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
GOOGLE_API_KEY=sua_chave_google_aqui
```

### 4. Instalar e Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

## 📱 Como Usar

1. **Dashboard**: Veja seus totais nutricionais do dia
2. **Botão Câmera**: Clique no botão flutuante verde
3. **Tirar Foto**: Capture a imagem do alimento
4. **Análise**: Aguarde a IA processar (alguns segundos)
5. **Editar**: Ajuste os valores se necessário
6. **Salvar**: Confirme para adicionar ao dashboard

## 🗂️ Estrutura do Projeto

```
food-ia-app/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── camera/page.tsx       # Captura de foto
│   ├── analysis/page.tsx     # Análise e edição
│   ├── api/analyze/route.ts  # API de IA
│   └── globals.css           # Estilos globais
├── lib/
│   ├── supabase.ts           # Cliente Supabase
│   ├── gemini.ts             # Cliente Gemini
│   └── utils.ts              # Utilitários
├── supabase_setup.sql        # Script de setup do DB
└── env.example               # Exemplo de variáveis
```

## 🎨 Design

- **Mobile-first**: Otimizado para dispositivos móveis
- **Tema moderno**: Cores suaves com verde como cor primária
- **Responsivo**: Funciona em qualquer tamanho de tela
- **Animações**: Transições suaves e feedback visual

## 🔒 Segurança

- RLS (Row Level Security) configurado no Supabase
- Políticas permitem inserção e leitura pública (demo)
- Para produção: adicione autenticação de usuários

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe no [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente
4. Deploy automático!

### Outras Plataformas

- **Netlify**: Suporta Next.js
- **Railway**: Deploy com Docker
- **AWS Amplify**: Integração completa

## 🐛 Troubleshooting

### Erro de Build

Se o build falhar, execute apenas em modo dev:
```bash
npm run dev
```

### Câmera não funciona

- Certifique-se de estar usando HTTPS (ou localhost)
- Permita acesso à câmera no navegador

### IA não responde

- Verifique se a `GOOGLE_API_KEY` está correta
- Confirme que a imagem foi enviada ao Supabase Storage

## 📄 Licença

MIT - Livre para uso pessoal e comercial

## 🤝 Contribuições

Contribuições são bem-vindas! Abra issues ou PRs.

---

**Desenvolvido com ❤️ usando Next.js e IA**
