## Description
<!-- What does this PR do? -->

## Type of Change
- [ ] New test /scenario
- [ ] Bug fix
- [ ] Refactor / cleanup
- [ ] CI / config change
- [ ] Framework Enhancement
- [ ] Other

## Jira Ticket
<!-- Link or tag, e.g. MAG-1234 -->

## Code Quality
- [ ] Step definitions are reusable / not duplicated
- [ ] Page objects updated if selectors changed
- [ ] No commented-out code left in
- [ ] `npm run format:check` passes (no formatting issues)
- [ ] `npm run lint` passes (no lint errors)
- [ ] No `console.log` or debug statements left in code
- [ ] No hardcoded URLs, credentials, or test data

### Tests
- [ ] New scenarios are tagged correctly (`@smoke`, `@regression`, `@wip`, etc.)
- [ ] `@wip` tag has been removed before merging
- [ ] Scenarios have unique, descriptive names
- [ ] Steps reuse existing step definitions where possible
- [ ] Page Objects are used — no direct Playwright calls in step files

### Review
- [ ] PR targets the correct branch (`main`)
- [ ] Self-reviewed the diff before requesting review
- [ ] PR-Check workflow has passed (smoke tests green)

## CI
- [ ] Workflow passes locally (`yarn test`)
- [ ] Screenshots / traces reviewed if tests failed during development
- [ ] No secrets or credentials committed

## Notes for Reviewer
<!-- Anything the reviewer should pay special attention to -->