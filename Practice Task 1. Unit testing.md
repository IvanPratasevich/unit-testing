Practice Task 1. Unit testing.

Instructions
1. Create a new branch in your empty repository and name it, for example, /unit_tests.
2. Copy the provided code to your repository
3. Cover the code with unit tests using Mocha and Chai.
4. Configure reporter.
5. Add code coverage analysis using c8.
6. Ensure 80% (or more) code coverage with tests.
7. Add the following scripts to package.json:
   test — to run tests and generate an html report.
   coverage — to analyze code coverage.
8. Set up a linter (ESLint), configure Babel, set up pre-commit hooks, work with the GitLab CI/CD pipeline, and identify and fix errors in the code.
   8.1. Setup eslint (using eslint init) with a style guide.  (eslint.config.js)
   8.2. Setup Babel. (babel.config.js)
   8.3. Set up gitlab pipline.  (.gitlab-ci.yml)
   8.4. Setup husky. Add pre-commit hooks to the package.json:

---

Config files and directory structure:

├── .github
│   └── workflows
│       └── eslint.yml
├── babel.config.js
├── eslint.config.js
└── package.json

---