
## Black Cat ai ====> Cait

Key Features:
- 🔐 Clerk AUTH 
- 🚀 Next.js 14 
- 🔍 Exploring next.js middleware
- ⚠️ Error component
- 🔑 Chat bot using open ai
- 📧 Create notes and delete them safely
- ✅ Vector generation by pinecone to make th AI aware of the information availabe in the notes
- 🔘 Loading button
- 🚪 Beautiful dialog
- 🚧 Theme switcher

### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```shell
git clone https://github.com/oussamakhadraoui/ai-chat.git
```

### Install packages

```shell
npm i
```

### Setup .env file


- DATABASE_URL= you can use mongodb cluster 

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  
- CLERK_SECRET_KEY=
  
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/note

- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/note

  For authentication we are using clerk so you need to set up all the above env and you can get them simple by creating a clerk account



- OPEN_API_KEY=
- PINECONE_API_KEY=

  for OPEN API KEY go to https://platform.openai.com/api-keys and generate a key
  for PINECONE API KEY go to https://app.pinecone.io/organizations and generate a key


### Setup Prisma
```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |



