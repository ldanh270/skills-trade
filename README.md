# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Styles principle

### 1. **Positioning**

```scss
position, top, right, bottom, left, z-index
```

### 2. **Box Model**

```scss
display, width, height, margin, padding, box-sizing, overflow, flex, grid, gap
```

### 3. **Visual**

```scss
background, border, border-radius, box-shadow, opacity, visibility
```

### 4. **Typography**

```scss
font, font-size, font-weight, line-height, letter-spacing, text-align, color
```

### 5. **Miscellaneous**

```scss
transition, transform, animation, cursor, user-select, pointer-events, content
```

---

## Importing Order

1. **React & core libraries**

    ```jsx
    import React from 'react';
    import { useState } from 'react';
    ```

2. **Third-party libraries (npm packages)**

    ```jsx
    import _ from 'lodash';
    import axios from 'axios';
    import classNames from 'classnames';
    ```

3. **Assets (styles, images)**

    ```js
    import './App.scss';
    import logo from './logo.svg';
    ```

4. **Absolute imports (aliases like @/ or src/)**

    ```js
    import { Button } from '@/components/ui/button';
    import useAuth from '@/hooks/useAuth';
    ```

5. **Relative imports (local files/components)**

    ```js
    import Header from '../components/Header';
    import useToggle from './useToggle';
    ```

6. **Type imports (if using TypeScript)**

    ```ts
    import type { User } from '@/types/User';
    ```
