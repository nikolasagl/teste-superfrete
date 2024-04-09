**README.md**

# Firebase Functions and Firestore Application

This repository contains a Firebase Functions and Firestore application with Continuous Integration and Continuous Deployment (CI/CD) set up using GitHub Actions. The application is tested using Jest for both unit and integration tests.

## Architecture

The application follows a modular architecture, with separate modules for functions, tests, and shared utilities. The structure of the application is as follows:

- **functions**: Contains the Firebase Cloud Functions code.
    - **src**: Contains the source code for Firebase functions.
        - **modules**: Contains different modules of the application.
            - **users**: Module containing user-related functionality.
                - `index.ts`: Main entry point for the user module.
                - **services**: Contains service logic for user module.
                - **functions**: Contains Firebase functions related to user module.
                - **models**: Contains data models for user module.
                - **shared**: Contains shared utilities for user module.
                    - **middleware**: Middleware functions used across different Firebase functions.
                - **tests**: Contains unit and integration tests for user module.
                    - **integration**: Integration tests for user module.
                    - **unit**: Unit tests for user module.
        - **shared**: Contains shared utilities used across different modules.
            - **middleware**: Shared middleware functions used across different Firebase functions.
    - `index.ts`: Main entry point for Firebase Functions.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Node.js package configuration file.

## Installation and Running

To install and run the code locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/nikolasagl/teste-superfrete.git
```

2. Navigate to the `functions` directory:

```bash
cd teste-superfrete/functions
```

3. Install dependencies:

```bash
npm install
```

4. Go back to the project root directory:

```bash
cd ..
```

5. Set up Firebase CLI:

```bash
npm install -g firebase-tools
```

6. Login to your Firebase account (optional):

```bash
firebase login
```

7. Set up Firebase project (optional):

```bash
firebase use --add
```

8. Run lint:

```bash
npm run lint
```

9. Run tests:

```bash
npm run test
```

10. Build:

```bash
npm run build
```

11. Run Firebase emulators:

```bash
firebase emulators:start
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request with any improvements or additional features.

## License

This project is licensed under the [MIT License](LICENSE).