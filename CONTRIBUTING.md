![Screenshot_from_2023-08-02_14-38-24-removebg-preview](https://github.com/yamilt351/scraper/assets/88646148/9788c6da-e1f1-4110-b75a-1748b5f7af23)

# Contributing Guidelines 📌

Thank you for considering contributing to this project! We appreciate your time and effort. Please take a moment to review the following guidelines to ensure a smooth and effective collaboration.

## Local Configuration 🔧 <a name="Local-Configuration"></a>

[Nodejs](https://nodejs.org/en) v20 (check your node version with `node -v`)

create your .env file with these values:

```
PORT=5000
URL_SERVER=https://url.com
LIMIT=2000
MONGOOSE_USER=mongodb+srv://{USER}:{PASSWORD}@cluster0.4g3ly.mongodb.net/?retryWrites=true&w=majority

```

install dependencies with `npm i`

The application was tested with [Jest](https://jestjs.io/docs/getting-started), [Chai](https://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest)

- to run integration test:
  `npm run test:integration`
- to run unit tests:
  `npm run test:unit`
- to run the whole test:
  `npm run test`
  
## How to Contribute  ⚒️
1. Fork the repository and clone it to your local machine.
2. Create a new branch for your contribution.
3. Make your changes, commit them with clear and descriptive messages, and push the branch to your forked repository.
4. Test your changes `npm run test`
5. Submit a pull request with evidences at Development, explaining the purpose and details of your contribution.
6. Code Styles are provided by [eslint](https://github.com/neoclide/coc-eslint) & [prettier](https://github.com/neoclide/coc-prettier)
- Yours Pull Requests should follow the next structure (the repo has a boilerplate to do that):
  - As (`Developer`)
  - I want to (`Your changes`)
  - To (`Feature`)
  - Happy path (`succesfull case screenshoot`)
  - Unhappy path (`unsuccesfull case screenshots , more than 1`)
  
## Commit Message Structure 📝

Please follow the commit message structure below:

- `type:`: The type of the commit (e.g., feature, bug fix, documentation, resolve, etc)
- `description`: A concise description of the changes made.(optional)
- `[#issue]`: Related issue to that task.

## Using Issues 🖇️

We use GitHub issues to track tasks and enhancements. If you find a bug, have a feature request, or want to suggest an improvement, please create a new issue. Follow these steps:

1. Go to the [Issues](https://github.com/yamilt351/scraper/issues) section of the repository.
2. Click on "New Issue" and provide a clear and descriptive title.
3. Fill in the issue template with all the necessary details, including steps to reproduce (if applicable).
4. We have different's boilerplates to issues, be sure to choose the correct one.

 ## Code Review Process 🔍

All contributions will go through a code review process to ensure code quality and maintainability. Here's how it works:

1. Submit a pull request with your changes.
2. If your changes does not break any old code, your pr will be merged, in case your Pr is incorrect we will leave a comment in your pr
3. Make the necessary changes based on the feedback received.
4. Once the code is approved, it will be merged into the main branch.

## Code of Conduct ⛔

Please note that this project follows a code of conduct. We expect all contributors to adhere to the guidelines outlined in the [Code of Conduct](./CODE_OF_CONDUCT.md).

Thank you for your contributions and happy coding!
