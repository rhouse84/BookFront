// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    dev: true,
    production: false,
    host: 'http://localhost:3000',
    booksUrl: '/api/books',
    bookSearchUrl: '/api/bookSearch',
    authorsUrl: '/api/authors',
    authorSearchUrl: '/api/authorSearch',
    googleProvider: '376371685785-s8tr3td1vpcqusgr900bm2g6pebnp3oi.apps.googleusercontent.com'
};

