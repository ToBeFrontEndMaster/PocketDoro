// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getTime, format } from 'date-fns';
import { Timer } from './timer';

export const transferMock = [
    {
        transaction_id: 1,
        timestamp: format(getTime(new Date()), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
        status: 'success',
    },
];
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getStart() {
    const timer = new Timer(1);
    timer.start();
}

export function activate(context: vscode.ExtensionContext) {
    // private _timeChangedEventEmitter = new vscode.EventEmitter();
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "pocketdoro" is now active!', getStart());

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        // The code 9you place here will be executed every time your command is executed
        // Display a message box to the user
        // setInterval(() => {console.log('hi')},1000)
        // test();
        // vscode.window.showInformationMessage(' ', { modal: true });
    });
    // setInterval(,1000)
    // setInterval(test, 1000);
    context.subscriptions.push(disposable);
}

const test = () => {
    vscode.window.showInformationMessage('Hello World!', { modal: true }).then(() => {
        test();
    });
};

// this method is called when your extension is deactivated
export function deactivate() {}
