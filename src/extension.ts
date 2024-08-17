import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.createOrNavigateFunction', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            console.log('Editor found');
            const selectedText = editor.document.getText(editor.selection);
            console.log('Selected text:', selectedText); // Debug log
            const functionTemplate = generateFunctionTemplate(selectedText);

            if (functionTemplate) {
                // Find the start of the current function
                const currentFunctionStart = findCurrentFunctionStart(editor);
                if (currentFunctionStart) {
                    editor.edit(editBuilder => {
                        editBuilder.insert(currentFunctionStart, `\n${functionTemplate}\n`);
                    });
                } else {
                    vscode.window.showInformationMessage('Could not determine the location to insert the function template.');
                }
            } else {
                vscode.window.showInformationMessage('No function call selected or function call format not recognized.');
            }
        } else {
            vscode.window.showInformationMessage('No active editor found.');
        }
    });

    context.subscriptions.push(disposable);
}

function generateFunctionTemplate(functionCall: string): string {
    // Match function calls like "int ans = takeInput();"
    const match = /^\s*(\w+)\s+\w+\s*=\s*(\w+)\s*\(([^)]*)\)\s*;?\s*$/.exec(functionCall);
    if (match) {
        const returnType = match[1];  // Extract the return type
        const functionName = match[2]; // Extract the function name
        const args = match[3]  // Extract arguments
            .split(',')
            .map(arg => arg.trim())
            .filter(arg => arg.length > 0)
            .map(arg => `    ${arg}`)
            .join('\n');

        // Create a variable of the return type if it's not void
        const returnStatement = returnType !== 'void' ? `    ${returnType} x;\n    // TODO: Implement\n\n    return x;` : `    // TODO: Implement`;

        return `${returnType} ${functionName}(/* args here */) {\n${returnStatement}\n}\n`;
    }
    return '';
}






function findCurrentFunctionStart(editor: vscode.TextEditor): vscode.Position | null {
    const position = editor.selection.start;
    const document = editor.document;

    // Iterate backwards to find the start of the function
    for (let lineNumber = position.line; lineNumber >= 0; lineNumber--) {
        const lineText = document.lineAt(lineNumber).text;
        if (/^\s*(\w+)\s+\w+\s*\(.*\)\s*{/.test(lineText)) {
            return document.lineAt(lineNumber).range.start;
        }
    }
    return null;
}

export function deactivate() {}
