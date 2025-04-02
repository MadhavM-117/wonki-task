# Wonki Web UI 

## Setup

To run the web ui, you'll need `yarn` and `node`. 

- **NVM (Node Version Manager)**: Helps manage multiple Node.js versions
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
  ```
  Then, install and use the required node version:
  ```bash
  nvm install $(cat .nvmrc)
  nvm use
  ```
- **Yarn **: Package manager for Node.js
  ```bash
  npm install -g yarn
  yarn 
  ```

## Running the UI

Once you have the server running, you just need to do `yarn dev` from the `web-ui` directory.
```bash
echo $(pwd) # should be wonki-task/web-ui
yarn dev
```

## Tools used
- yarn
- React
- Typescript
- Recharts
- shadcn/ui for components, blocks, themes
