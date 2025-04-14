# Number Theory Visualizer

Number Theory Visualizer is a project aimed at providing visualizations of relations of sets in number theory. The project is hosted on GitHub Pages and is licensed under the MIT License.

See the rendering result at: [Number Theory Visualizer](https://tkruse.github.io/number-theory/)

## Features

- Visualize various number theory concepts and relations.
- Interactive and user-friendly interface.

Also see my inspirations:

* [Math StackExchange post](https://math.stackexchange.com/questions/4042219)
* [Reddit post with similar image](https://www.reddit.com/r/mathpics/comments/15s1dfo/complete_number_chart/)
* [Science4All Article on Numbers and Constructibility](https://www.science4all.org/article/numbers-and-constructibility/)

## Installation

The result is rendered dynamically as an SVG image using D3.js.
The project is built with pnpm, TypeScript, React and uses Vite for development and build processes.
Coding was done in large parts using Aider using gpt-4o.

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/number-theory-visualizer.git
   cd number-theory-visualizer
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

## Usage

- To start the development server:
  ```bash
  pnpm run start
  ```

- To build the project:
  ```bash
  pnpm run build
  ```

- To run tests:
  ```bash
  pnpm run test
  ```

- To lint the code:
  ```bash
  pnpm run lint
  ```

- To check types:
  ```bash
  pnpm run type-check
  ```

- To format the code:
  ```bash
  pnpm run format
  ```

- to run all of lint, typecheck, tests:
  ```bash
  pnpm run check
  ```


- update gh-pages branch and push to github
  Changes the gh-pages branch and pushes it to github.
  On github pages, the application should update after a few seconds.

  See https://www.npmjs.com/package/gh-pages
  ```bash
  pnpm run deploy
  ```



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
