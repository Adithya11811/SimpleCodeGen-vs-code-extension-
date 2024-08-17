# SimpleCodeGen

## Overview

`SimpleCodeGen` is a Visual Studio Code extension that generates function templates for C++ code. When you select a function call like `int ans = takeInput();` and trigger the command, this extension will insert a function template into your code.

## Features

- **Generate Function Templates**: Automatically create function templates from function calls in your code.
- **Customizable**: Customize the command to fit your coding style and requirements.

## Commands

- **`extension.createOrNavigateFunction`**: Generate a function template based on the selected function call.

## Keybindings

You can use the following keybinding to trigger the command:

- **`Ctrl+.`**: Trigger the function template generation command.

## Usage

1. **Select a Function Call**: Highlight a function call in your code, for example, `int ans = takeInput();`.
2. **Trigger the Command**: Use the command `extension.createOrNavigateFunction` by pressing `Ctrl+.` (or your configured keybinding).
3. **View the Generated Template**: The extension will insert a function template at the appropriate location in your code.

## Requirements

- **Visual Studio Code**: Make sure you have Visual Studio Code installed.
- **C++ Environment**: This extension is intended for use with C++ code.

## Installation

1. **Install from VSIX**:
   - Package your extension into a `.vsix` file using `vsce package`.
   - Open VS Code and go to Extensions view (`Ctrl+Shift+X`).
   - Click the three-dot menu in the top right and select "Install from VSIX...".
   - Choose the `.vsix` file.

2. **Install from Marketplace**:
   - Publish your extension to the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/vscode) for global access.

## Contact

For any issues or feature requests, please open an issue on the [GitHub repository](#).
