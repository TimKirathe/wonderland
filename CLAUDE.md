# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.4 application for Wonderland Kindergarten, using the App Router pattern with TypeScript and Tailwind CSS v4.

## Common Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Working With The Browser

- Look for browser screenshots in ./brower-screenshots/

## Git

### Commit style

- Use the 'Conventional Commits' convention for all your git commits.
- Ensure that you commit code frequently.
- Make sure that you group tasks which are logically related into a single commit.
- Perform git commits every time a task or set of related tasks are completed.
- **Always ask for approval before making commits.**

#### Conventional Commits Format

- Use scope in format: `type(scope): description` (e.g., `feat(contact): add email validation`)
- Only include body/footer content if additional explanation is needed to explain the why behind what was done or to make the description understandable
- Breaking changes notation:
  - Option 1: Add `!` after type or scope (e.g., `feat!: remove deprecated login endpoint` or `feat(auth)!: drop support for legacy token system`)
  - Option 2: Include `BREAKING CHANGE:` in commit footer

#### Grouping Changes

- **Commit small related fixes together if:**
  - They are tightly related (e.g., fixing typos in the same function or fixing a bug and its related test)
  - The group of changes forms a logical unit that's easier to understand as a whole
  - Splitting them would add noise rather than clarity
  - Think: "Would someone reviewing or reverting this benefit from it being one commit?"

- **Commit them separately if:**
  - Each fix addresses a different issue, concern, or component
  - You want clear commit history for blame, review, or rollback
  - The changes, while small, stand alone logically
  - Think: "Could I describe each change in a commit message without referencing the others?"

### General Notes

- If you create a file that you are unsure about whether or not it should be gitignored. Ask before proceeding.
- Make sure that any files/directories that you create which contain sensitive information are put inside the .gitignore file.

## Architecture

### App Router Structure

- All pages live in `src/app/`
- `layout.tsx` - Root layout with font configuration
- `page.tsx` - Single page application with all content
- `globals.css` - Global styles with Tailwind CSS v4 and custom CSS variables

### Styling System

- Tailwind CSS v4 with PostCSS configuration
- Custom color scheme using CSS variables:
  ```css
  --primary: #ff6b6b (coral) --secondary: #4ecdc4 (turquoise) --accent: #ffe66d
    (yellow);
  ```
- Dark mode support via `color-scheme` switching
- Custom animations: `float` and `wiggle`

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Target ES2017 with bundler module resolution

### Best Code Practices

- Document your code with concise comments only where what you are doing is not obvious to the reader, or if there was something hindering you from implementing the code in a more straightforward way.

## Current Implementation Notes

1. **Single Page Structure**: All content currently in `page.tsx` - consider componentization for:
   - Navigation header
   - Hero section
   - Programs cards
   - Testimonials carousel
   - Contact form

2. **Form Handling**: Tour scheduling form has no backend integration - just console.log

3. **No Testing Framework**: Consider adding Jest/Vitest and React Testing Library

4. **Image Assets**: SVG icons in `/public` directory - consider optimization

## Development Patterns

When modifying this codebase:

1. Maintain the existing Tailwind CSS v4 utility-first approach
2. Use the established color variables for consistency
3. Follow the emoji-based visual language for child-friendly design
4. Keep TypeScript strict mode compliance
5. Run `npm run lint` before committing changes
