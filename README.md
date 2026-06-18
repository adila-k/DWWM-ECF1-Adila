# DWWM-ECF1-Adila

## Le Phosphore

Website for **Le Phosphore**, a multi-purpose performance venue (theater, stand-up, concerts). This project is part of a exam. Built for the DWWM certification.

#### Tech stack

- **HTML5** — semantic structure
- **SASS (SCSS)** — partials, compiled with the VSCode "Live Sass Compiler" extension
- **CSS** — BEM methodology
- **JavaScript (vanilla)** — DOM manipulation, `fetch`, dynamic card generation and filtering from JSON
- **JSON** — show data (`spectacles.json`)

No framework or build tool is used.

### Installation

#### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- VSCode extension: **Live Server**
- VSCode extension: **Live Sass Compiler**
- [Git](https://git-scm.com/)

#### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Open the project folder in VSCode.
3. Start **Live Sass Compiler** to compile `.scss` files into `assets/css/main.css`.
4. Start **Live Server** on `index.html` to view the site in the browser.

No further setup is required, the site runs entirely client-side.

### Project structure

```
.
├── index.html                     # Homepage
├── assets/
│   ├── components/                # Shared HTML partials (header, footer)
│   ├── css/                       # Compiled CSS
│   ├── sass/                      # SCSS partials (main.scss + _*.scss)
│   ├── js/                        # header.js, footer.js, agenda.js
│   ├── pages/                     # agenda.html, useful-informations.html, contact.html
│   ├── fonts/                     # Self-hosted fonts
│   ├── img/                       # Icons and show images
│   └── spectacles.json            # Show data
└── README.md
```

### Deployment

The project is deployed on two environments:

- **GitHub Pages** — public HTTPS link from this repository
- **OVH** — via SFTP (port 22), on the subdomain `spectacle.adila-k.fr`

> Deployment in progress, live links to be added here once available.

**GitHub Pages**

1. Push to the `main` branch
2. Enable GitHub Pages in repository settings (source: `main`, root folder)
3. Verify the site is reachable over HTTPS at the generated URL

**OVH (SFTP)**

1. Connect via FileZilla over SFTP (port 22)
2. Upload the project files to the subdomain's root folder
3. Verify the site is reachable over HTTPS at `spectacle.adila-k.fr`

No credentials or sensitive data are stored in this repository.
