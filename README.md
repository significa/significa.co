# Significa website

This is the repo for [Significa's website](https://significa.co/), our very own presence on the web.

## Contributing

### Requirements

- Set a GitHub Classic Personal Access Token (PAT) with read access to packages (`packages:read`)
  in your shell with the name `GITHUB_AUTH_TOKEN`.

- Get the `.env` using [1password-secrets](https://github.com/significa/1password-secrets/):
  `1password-secrets local pull`.

- Install the node version specified in the `.nvmrc` file
  (using your favourite nodeversion manager).

- Install the dependencies with `npm install` (or `npm ci` for a frozen lockfile).

### Development

- Start the development server: `npm run dev`
- Auto format the code: `npm run format`

### Testing and linting

- `npm run lint`
- `npm run test`

# Deployment and release

The staging branch is bounded to the `main` branch, create a PR against it for a new feature.

To deploy a new production version, create a semver release in GitHub
(prefixed with `v`, for example: `vX.X.X`).

To create a hotfixes:

- Check-out to the latest release `git checkout vX.X.X`;
- Create a new branch `git checkout -b hotfix/XXXX`;
- Create a PR to `main`, get approval, and merge it;
- Create a new release based on your hotfix branch.
  Use `release/xxx` branches to batch fixes together.
