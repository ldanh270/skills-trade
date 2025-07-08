# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Coding principle

1. CSS/SCSS principles

-   Variables at the head of file
-   BEM assignment (Box - Element - Modifier)
-   CSS properties
    -   Positioning (Vị trí) `position, top, right, bottom, left, z-index`
    -   Box model (Kích thước & lề) `display, float, width, height, max-width, max-height, padding, margin, overflow`
    -   Flexbox/Grid `display, flex-direction, justify-content, align-items, grid-template-columns, gap`
    -   Typo (Kiểu chữ) `font, font-size, font-weight, line-height, text-align, color, letter-spacing`
    -   Visual (Giao diện thị giác) `background, border (color - radious - types - ...), box-shadow, opacity`
    -   Animation & Transition `transition, animation, transform`
    -   Misc (Khác) `cursor, pointer-events, user-select`

2. Import Order

-   Libraries
-   Styles (CSS/SCSS/SASS)
-   Components
-   Assests
