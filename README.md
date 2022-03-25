# kafkacat-generator
A web-based GUI for generating kafkacat commands.

Available online at https://klebkleb.github.io/kafkacat-generator/

Built using [Svelte](https://svelte.dev/).

## Features
- Generate kafkacat commands for producing and consuming
- Search messages using `grep`
- Produce JSON messages or plain text
- Store IPs and Topics in your local storage
- Keep a history of your most recent commands

## Building and running the code

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

### Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`.
