# APCSP-8Ball-Pool
8-Ball Pool TypeScript implementation

## How to deploy
- To compile the typescript code into javascript, run `npm run build`. To build in watch mode, use `npm run buildw`. Typescript compiles the code to the `build` folder. The HTML file is in `/web`.
- [Optional] I included a simple http server in `http-dev-server/serve.cjs`. All it does is host the necessary files on port 3002. 
- The entire website is static, so it can be also hosted on a CDN like Cloudflare Pages. 
- the html file already points to the entry point in `/build`. 
- you could also use a bundler like esbuild or whatever to cram everything into a single file. 