
# Gamepad SDK

A simple SDK for handling gamepad input in the browser using the `navigator.Gamepad` API. This SDK provides an easy way to detect button presses, releases, axis movements, and gamepad connection/disconnection events.

## Features

- Detect gamepad button presses and releases.
- Track axis changes (analog stick movements).
- Listen for gamepad connection and disconnection events.
- Works with multiple gamepads.

## Installation

You can install the SDK via NPM:

```bash
npm install @pindakaasman/gamepad-sdk
```

## Usage

Here’s a basic example of how to use the Gamepad SDK in your project:

```javascript
const GamepadSDK = require('@pindakaasman/gamepad-sdk');

// Initialize the SDK
const myGamepad = new GamepadSDK();

// Listen for button presses
myGamepad.addEventListener('buttonpress', (event) => {
  console.log(`Button ${event.buttonIndex} was pressed on gamepad: ${event.gamepad.id}`);
});

// Listen for axis changes
myGamepad.addEventListener('axischange', (event) => {
  console.log(`Axis ${event.axisIndex} changed to ${event.axisValue} on gamepad: ${event.gamepad.id}`);
});

// Listen for gamepad connection
myGamepad.addEventListener('connect', (event) => {
  console.log(`Gamepad connected: ${event.gamepad.id}`);
});

// Listen for gamepad disconnection
myGamepad.addEventListener('disconnect', (event) => {
  console.log(`Gamepad disconnected: ${event.gamepad.id}`);
});
```

## Event Types

### `buttonpress`
Triggered when a button is pressed.

#### Event Object:
- `gamepad`: The gamepad object.
- `button`: The button object.
- `buttonIndex`: The index of the pressed button.

### `buttonrelease`
Triggered when a button is released.

#### Event Object:
- `gamepad`: The gamepad object.
- `button`: The button object.
- `buttonIndex`: The index of the released button.

### `axischange`
Triggered when a gamepad axis (such as an analog stick) changes position.

#### Event Object:
- `gamepad`: The gamepad object.
- `axisValue`: The value of the axis (ranging from -1.0 to 1.0).
- `axisIndex`: The index of the axis that changed.

### `connect`
Triggered when a gamepad is connected.

#### Event Object:
- `gamepad`: The connected gamepad object.

### `disconnect`
Triggered when a gamepad is disconnected.

#### Event Object:
- `gamepad`: The disconnected gamepad object.

## Browser Compatibility

The Gamepad API is still an experimental feature in some browsers. Ensure that you check browser compatibility before using this SDK in production.

### Supported Browsers:
- Chrome
- Firefox
- Edge
- Opera

## License

This SDK is licensed under the [ISC License](./LICENSE).

## Development

If you'd like to contribute to the project or work on it locally, follow these instructions to set up your development environment:

### Prerequisites

Ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher recommended)
- [npm](https://www.npmjs.com/)

### Setting Up the Project

1. **Clone the repository**:
   ```bash
   git clone git@github.com:RamonGebben/Gamepad-SDK.git
   cd Gamepad-SDK
   ```

2. **Install dependencies**:
   After cloning the repo, run the following command to install all project dependencies:
   ```bash
   npm install
   ```

### Running the Code Locally

You can start developing the SDK locally by editing the source code directly in the repository. If you're adding new features or fixing bugs, ensure everything works as expected.

### Running Tests

If you add tests to the project, you can run them using:

```bash
npm test
```

### Versioning and Publishing

We use [npm's versioning](https://docs.npmjs.com/about-semantic-versioning) to manage the package versions. To bump the version of the package and publish to NPM:

1. **Bump the version**:
   - For a patch version:
     ```bash
     npm version patch
     ```
   - For a minor version:
     ```bash
     npm version minor
     ```
   - For a major version:
     ```bash
     npm version major
     ```

2. **Publish to NPM** (requires NPM authentication):
   ```bash
   npm publish
   ```

### Automatic Publishing with GitHub Actions

This repository is configured to automatically publish to NPM whenever changes are pushed to the `main` branch. The GitHub Actions workflow handles the build, test, and publish process.

For more details, see the `.github/workflows/npm-publish.yml` file.

---

Feel free to fork this repository, make your changes, and submit a pull request. Contributions are always welcome!
