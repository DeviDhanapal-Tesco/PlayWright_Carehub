import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

// Mirrors Playwright's own folder sanitization: replaces non-alphanumeric chars with '-'
function sanitize(name: string): string {
  return name.replace(/[^\w\d]+/g, '-').replace(/^-+|-+$/g, '');
}

// Renames each test's output folder to just the test title after artifacts are written.
// Playwright calls onTestEnd after the browser context is closed and all artifacts
// (trace, screenshot, video) are flushed to disk, so the rename is always safe.
export default class RenameTraceReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult): void {
    // Use the trace attachment path to locate the output folder — no path reconstruction needed
    const trace = result.attachments.find(a => a.name === 'trace' && a.path);
    if (!trace?.path) return;

    const currentDir = path.dirname(trace.path);
    if (!fs.existsSync(currentDir)) return;

    const sanitizedTitle = sanitize(test.title);
    const parentDir = path.dirname(currentDir);
    let targetDir = path.join(parentDir, sanitizedTitle);

    // Append a counter when the same test title appears in multiple projects
    let i = 1;
    while (fs.existsSync(targetDir)) {
      targetDir = path.join(parentDir, `${sanitizedTitle}-${i++}`);
    }

    fs.renameSync(currentDir, targetDir);
  }
}
