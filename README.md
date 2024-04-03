# Demo
![Demo GIF](docs/images/demo.gif)

# How to run this project

## Setting Up .env.local

First, we'll need to setup a `.env.local` file in the root directory of the project. We need to populate it with the following content:

```
# NextAuth
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET=<random_string>

# GitHub OAuth
GITHUB_ID=<your_github_id_here>
GITHUB_SECRET=<your_github_secret_here>

#TMDb API key
TMDB_API_KEY=<your_tmdb_api_key_here>
```
First two lines are self-explanatory. In order to get `GITHUB_ID` and `GITHUB_SECRET`:
1. Go to GitHub > Settings:
![Path to GitHub settings](docs/images/image.png)
2. Go to `Developer Settings`:
![Path to Developer settings](docs/images/image-1.png)
3. Select OAuth Apps
![OAuth Apps menu](docs/images/image-2.png)
4. Create a new OAuth App:
![OAuth App creation button](docs/images/image-3.png)
5. The first three fields can be set to whatever you like. However, make sure to set the `Authorization callback URL` to `http://localhost:3000/api/auth`. (Enable Device Flow) isn't really relevant here, so keep it empty.
![OAuth App Creation Form](docs/images/image-4.png)
6. Click on Register Application
![Register application button](docs/images/image-5.png)
7. You'll be redirected to the OAuth Application page. Scroll down and click on `Generate a new client`. (`GITHUB_ID` environment variable will already be visible under the heading of `Client ID` at this point):
![GITHUB_ID and generate a new client secret button](docs/images/image-6.png)
8. Copy your `GITHUB_SECRET` environment variable. Make sure to copy it without refreshing the page, as it will not be available later.
![GITHUB_SECRET image](docs/images/image-7.png)

You should now have all of the environment variables populated in .env.local

## Setting Up Prisma
Run the following command in the terminal (while being in the root directory):
```
npx prisma migrate dev --name init
```

Once both of the above steps (`Setting Up .env.local` and `Setting Up Prisma`) are completed, you can go ahead and run:

```
npm run dev
```

to start a local instance of the project. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Alternatively, you could also run:

```
npm run build
```

and then 
```
npm run start
```
to create and run your build.

# Project structure
In the root directory, one relevant folder is that of `prisma/`. It houses the schema of our app. Rest of the files are mostly config files. The actual code resides within `src/` directory:
1. `api`: Stores API calls made in the app.
2. `app`: NextJS app directory that serves as the router of our app.
3. `constants`: For constants.
4. `fonts`: Stores fonts. `Inter` is used in the app.
5. `types`: Stores TypeScript types to be used throughout the app.
6. `ui`: Stores common UI components.
7. `utils`: Stores utility functions for code sharing.


# Authentication
Authentication is done using `NextAuth` and its `GitHub` provider. The boilerplate schema for persisting users in the database is taken from Prisma's own NextJS [recipe](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes-auth), and modified for use with the app router.
Storing credentials within our own database is avoided as NextAuth [discourages](https://next-auth.js.org/providers/credentials) this method of authentication. Therefore, GitHub Provider is used for authorizing users.

# Prisma
Apart from the authentication models provided by Prisma, we have a `WatchList` model that relates a `User` model with a `Movie` model.

# Server Components vs Client Components
Server components are preferred whereever possible, and client components are reserved only for components requiring interactivity, like `<SearchBox />` and `<Button />`.

# Route Handlers
API Route Handlers are defined in `/app/api/*` for interaction with our SQLite database. TMDB's endpoints are called directly from within server components instead of hitting the `/api/*` routes to explore both patterns.

# Styling
Styling is done through TailwindCSS. Base components and theme are from NextUI.