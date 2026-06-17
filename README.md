# Playwright Spec

A TypeScript-based UI test automation framework built with [Playwright](https://playwright.dev/), featuring Allure reporting, BrowserStack integration, and GitHub Actions CI/CD pipelines.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| [Playwright VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) | Run/debug tests & view traces in VS Code |
| TypeScript | Language |
| Allure | Rich test reporting |
| BrowserStack | Cross-browser cloud execution |
| GitHub Actions | CI/CD pipelines |
| ESLint + Prettier | Code quality & formatting |

---

## Project Structure

```
.
├── tests/
│   ├── fixtures/         # Custom Playwright fixtures
│   └── specs/            # Test specifications
├── shared/
│   ├── support/          # Custom reporters (e.g. trace rename reporter)
│   ├── types/            # Shared TypeScript types and base test classes
│   └── utils/            # Allure reporter utilities
├── data/
│   └── testData.json     # Shared test data
├── .github/
│   └── workflows/        # GitHub Actions CI pipelines
├── playwright.config.ts  # Playwright configuration
└── .env.example          # Environment variable template
```

---

## Prerequisites

- Node.js >= 18
- [Yarn](https://yarnpkg.com/)
- [Allure CLI](https://allurereport.org/docs/install/) (for generating/serving reports locally)

---

## Setup

```bash
# Install dependencies
yarn install

# Install Playwright browsers
npx playwright install
```

Copy `.env.example` to `.env` and populate values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `BROWSERSTACK_USERNAME` | BrowserStack username |
| `BROWSERSTACK_ACCESS_KEY` | BrowserStack access key |

---

## Running Tests

### Local

```bash
# Run all tests (headless, Chromium)
npx playwright test --project=local-chromium

# Run all tests (Firefox)
npx playwright test --project=local-firefox

# Run all tests (WebKit / Safari)
npx playwright test --project=local-webkit

# Run only WIP tests in headed/debug mode
yarn test:wip

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

### BrowserStack

Set `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` in `.env`, then use the `Chrome` or `Firefox` project:

```bash
npx playwright test --project=Chrome
```

---

## Test Tags

Tests are tagged to control which suite runs:

| Tag | Description |
|---|---|
| `@smoke` | Smoke suite — fast, critical-path checks |
| `@regression` | Full regression suite |
| `@wip` | Work in progress — local development only |

---

## Reporting

### Playwright HTML Report

```bash
yarn html:report
```

### Allure Report

```bash
# Generate report from results
yarn allure:generate

# Open the generated report
yarn allure:open

# Or serve results live
yarn allure:serve
```

### Cleanup

```bash
yarn allure:clean
```

---

## CI / GitHub Actions

| Workflow | Trigger | Description |
|---|---|---|
| `Smoke-Suite` | Schedule (Mon–Fri 10:00 UTC) or manual | Runs `@smoke` tests on a chosen browser |
| `Regression-Suite` | Manual | Runs full regression on BrowserStack with selectable OS/browser profile |
| `Run-Test-By-Tag` | Manual | Runs any test tag (e.g. a Jira ID) on BrowserStack |
| `pr-check` | Pull request | Runs checks on every PR |

Reports are published to AWS S3 after each CI run.

---

## Code Quality

```bash
# Type check
yarn typecheck

# Lint
yarn lint

# Lint with auto-fix
yarn lint:fix

# Format
yarn format

# Check formatting
yarn format:check
```
