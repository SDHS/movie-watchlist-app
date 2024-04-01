declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      TMDB_API_KEY: string;
    }
  }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}