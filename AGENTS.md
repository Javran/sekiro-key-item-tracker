# Sekiro Key Item Tracker - Agent Guidelines

## Project Overview

This is a vanilla HTML/CSS/JS project - a simplified version of the original Sekiro Key Item Tracker by Sekii. The project has no build system, tests, or linters.

## Project Structure

```
sekiro-key-item-tracker/
├── index.html      # Main HTML file
├── main.js        # Main JavaScript logic
├── main.css       # Main stylesheet
├── README.md      # Project documentation
└── img/           # Item images (PNG files)
```

## Running the Project

### Development Server

Use any static file server. Examples:

```bash
# Python 3
python -m http.server 8000

# npx
npx serve .

# PHP
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

### No Build Commands

This is a static HTML/CSS/JS project - no build process required.

### No Tests

There are currently no tests in this project.

---

## Code Style Guidelines

### General Principles

- Keep code simple and readable
- Avoid unnecessary dependencies
- Use vanilla JavaScript (no frameworks unless explicitly requested)
- No TypeScript in this project

### JavaScript Conventions

1. **No semicolons** ( ASI-friendly style)
2. **No parentheses for single-argument arrow functions**: `item => ...` not `(item) => ...`
3. **const over let** - prefer const, use let only when reassignment is needed
4. **Prefer arrow functions** for anonymous functions
5. **One-shot functions** - inline event handlers directly instead of defining named functions
   ```javascript
   // Good
   img.onclick = () => { /* code */ }
   
   // Avoid unless reused
   const handleClick = () => { /* code */ }
   img.onclick = handleClick
   ```

6. **Object properties**: id first, then name, then other fields
   ```javascript
   { id: "prosthetic_tool", name: "Prosthetic Tool", type: "key", encode: "pt" }
   ```

### CSS Conventions

1. **Use CSS custom properties** (variables) for colors and sizing
   ```css
   :root {
       --color-primary: hsl(120, 100%, 50%);
   }
   .element {
       color: var(--color-primary);
   }
   ```

2. **Avoid magic numbers** - use variables or clear comments
3. **Use flexbox and grid** for layout
4. **No CSS frameworks** - pure CSS only

### HTML Conventions

1. **Use semantic HTML** where possible
2. **id and class names**: lowercase with hyphens
   ```html
   <div id="inventory-container" class="sticky">
   ```
3. **2-space indentation**

### Naming Conventions

- **Variables/functions**: camelCase (`getSource`, `selectedIds`)
- **CSS classes**: lowercase with hyphens (`.inventory-container`)
- **Constants**: const (e.g., `inventory` array)

### Error Handling

- Use `console.error()` for reporting errors (e.g., duplicate encode validation)
- No try/catch unless absolutely necessary
- No error boundaries needed for this simple project

### LocalStorage

- Store data under clear keys: `sekiro-style` for appearance settings
- Use JSON for complex data structures

### URL Parameters

- Use query string for state that should be shareable
- Example: `?sel=mb,ss,lp` for selected items (using encode values)

---

## Working with Images

- All images are in the `img/` directory
- Image paths in JavaScript should use the format `img/{id}.png`

---

## Modifications

### DO NOT MODIFY

- Files not created by this project

### Files You May Modify

- `index.html`
- `main.js`
- `main.css`
- `README.md`

---

## Common Tasks

### Adding a New Item

1. Add image to `img/` directory (PNG format preferred)
2. Add entry to `inventory` array in `main.js`:
   ```javascript
   { id: "item_id", name: "Display Name", type: "category", encode: "xx" }
   ```
3. Ensure encode is unique (validation runs at startup)

### Adding Control Panel Options

1. Add HTML in `#control-panel` in `index.html`
2. Add CSS variables in `:root` if needed
3. Add JavaScript handlers in `main.js`
4. Update save/load functions for persistence

### Customizing Colors

- Use CSS custom properties in `:root` section of `main.css`
- Color format: HSL preferred for easier manipulation
  ```css
  --color-name: hsl(hue, saturation%, lightness%);
  ```

---

## Questions?

If you're unsure about the codebase or need clarification, check README.md first.
