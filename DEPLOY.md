# 🚀 Guia de Deploy no GitHub Pages

Este guia explica como publicar o jogo de Caça-Palavras do Islã no GitHub Pages.

## Passo 1: Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito e selecione **"New repository"**
3. Preencha as informações:
   - **Repository name**: `caca-palavras-isla` (ou o nome que preferir)
   - **Description**: "Jogo de Caça-Palavras sobre História do Islã"
   - **Visibility**: Public (para usar GitHub Pages gratuitamente)
4. **NÃO** marque "Initialize this repository with a README"
5. Clique em **"Create repository"**

## Passo 2: Fazer Upload dos Arquivos

### Opção A: Via Interface Web do GitHub

1. Na página do repositório recém-criado, clique em **"uploading an existing file"**
2. Arraste todos os arquivos do projeto para a área de upload
3. Adicione uma mensagem de commit: "Initial commit"
4. Clique em **"Commit changes"**

### Opção B: Via Linha de Comando (Git)

Se você tem Git instalado no seu computador:

```bash
# Navegue até a pasta do projeto
cd caca-palavras-isla

# Inicialize o repositório Git (se ainda não foi feito)
git init

# Adicione todos os arquivos
git add .

# Faça o commit inicial
git commit -m "Initial commit: Caça-Palavras do Islã"

# Adicione o repositório remoto (substitua SEU-USUARIO pelo seu nome de usuário)
git remote add origin https://github.com/SEU-USUARIO/caca-palavras-isla.git

# Envie os arquivos para o GitHub
git branch -M main
git push -u origin main
```

## Passo 3: Configurar GitHub Pages

1. No repositório do GitHub, vá em **Settings** (Configurações)
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Source** (Fonte), selecione **"GitHub Actions"**
4. Pronto! O GitHub Actions irá fazer o deploy automaticamente

## Passo 4: Aguardar o Deploy

1. Vá na aba **Actions** do seu repositório
2. Você verá um workflow chamado "Deploy to GitHub Pages" em execução
3. Aguarde alguns minutos até que o processo seja concluído (ícone verde ✓)
4. Após a conclusão, seu site estará disponível em:
   ```
   https://SEU-USUARIO.github.io/caca-palavras-isla/
   ```

## 📝 Atualizações Futuras

Sempre que você fizer alterações no código e enviar para o GitHub (push), o deploy será feito automaticamente:

```bash
# Após fazer alterações nos arquivos
git add .
git commit -m "Descrição das alterações"
git push
```

## ⚠️ Solução de Problemas

### O site não carrega corretamente

Se o site não carregar corretamente, pode ser necessário ajustar o `base` no arquivo `vite.config.ts`:

1. Abra o arquivo `vite.config.ts`
2. Adicione a propriedade `base`:

```typescript
export default defineConfig({
  base: '/caca-palavras-isla/', // Nome do seu repositório
  // ... resto da configuração
});
```

3. Faça commit e push das alterações

### O workflow falha

1. Verifique se você habilitou o GitHub Pages em Settings → Pages
2. Certifique-se de que selecionou "GitHub Actions" como fonte
3. Verifique os logs do workflow na aba Actions para identificar o erro

## 🎉 Pronto!

Seu jogo de Caça-Palavras do Islã agora está publicado e acessível para qualquer pessoa na internet!

Compartilhe o link com seus amigos e alunos:
```
https://SEU-USUARIO.github.io/caca-palavras-isla/
```

---

**Dica**: Você pode criar um domínio personalizado seguindo [este guia do GitHub](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site).
