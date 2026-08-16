---
inclusion: always
---

# Portfolio Project Guidelines

## Overview

Single-page personal portfolio for Devendra (Full Stack Developer & AI Engineer). Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Deployed to Vercel.

## Tech Stack

- Next.js 16 (App Router) / React 19 / TypeScript 5
- Tailwind CSS v4 (uses `@import "tailwindcss"` and `@theme inline` — no `tailwind.config.ts`)
- Framer Motion 13 for animations
- Lucide React for icons
- `clsx` + `tailwind-merge` via `cn()` utility in `lib/utils.ts`
- Package manager: npm

## Project Structure

```
app/
├── layout.tsx           # Root layout (metadata, fonts, dark class)
├── page.tsx             # Single-page home — composes all section components
├── globals.css          # Tailwind v4 directives, CSS custom properties for theming
├── components/          # All UI components (one per file, PascalCase)
lib/
├── data.ts              # Typed site content: siteConfig, projects, skills, education, socialLinks
├── utils.ts             # cn() helper
public/                  # Static assets
```

## Architecture & Patterns

- **Single-page app**: All sections render on one page (`app/page.tsx`). No additional routes unless explicitly requested.
- **Client components**: Components using hooks, Framer Motion, or browser APIs must include `"use client"` at the top.
- **Server components by default**: Keep components as server components when possible (no state, no effects, no browser APIs).
- **Data layer**: All site content lives in `lib/data.ts` as exported typed constants. Components import from there — never hardcode text content inline.
- **Layout type**: Root layout uses `LayoutProps<"/">` for children prop typing.

## Styling & Theming

- **Tailwind CSS v4**: Uses CSS-native configuration via `@theme inline` block in `globals.css`. There is no `tailwind.config.ts`.
- **Custom properties**: Theme colors are defined as CSS variables (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--accent` + `-foreground` variants) in `:root` and `.dark`.
- **Dark mode**: Applied via `.dark` class on `<html>`. Use Tailwind's `dark:` variant with the custom variant `@custom-variant dark (&:where(.dark, .dark *))`.
- **Fonts**: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded via `next/font/google`.
- **Mobile-first**: Layouts start mobile, scale up with `sm:`, `md:`, `lg:`, `xl:` breakpoints.
- **No inline styles**: Use Tailwind classes exclusively. Use `cn()` for conditional/merged class names.

## Coding Conventions

- Functional components with arrow function syntax and default export.
- One component per file. File name matches component name (PascalCase).
- Extract components when a section exceeds ~80 lines.
- Use `@/lib/...` path alias for imports from `lib/`.
- Use `framer-motion` `motion` components for entrance animations and transitions. Keep animations subtle and purposeful.
- Prefer semantic HTML elements (`section`, `nav`, `main`, `footer`) with proper heading hierarchy.
- All images must use alt text. Interactive elements need focus indicators and ARIA labels where appropriate.

## Dependencies

Approved dependencies (already installed):
`next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@tailwindcss/postcss`, `framer-motion`, `clsx`, `tailwind-merge`, `lucide-react`

Do not add new dependencies without explicit user approval.

## Build & Dev Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
