// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

let status: string;
const REST_STATUS = 'REST_STATUS';
const WORK_STATUS = 'WORK_STATUS';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
  // register a command that is invoked when the status bar
  // item is selected
  const myCommandId = 'extension.digidoro';
  subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {}));

  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  myStatusBarItem.command = myCommandId;
  myStatusBarItem.show();
  subscriptions.push(myStatusBarItem);

  // update status bar item once at start
  updateStatusBarItem(10);
}

function updateStatusBarItem(restTime: Number): void {
  let n = 0;
  setInterval(() => {
    if (status === REST_STATUS) {
      return;
    }
    n++;
    myStatusBarItem.text = `$(megaphone) working ${n} time`;
    if (restTime === n) {
      n = 0;
      status = REST_STATUS;
      myStatusBarItem.text = `$(megaphone) working ${n} time`;
      rest();
    }
  }, 1000);
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
  let lines = 0;
  if (editor) {
    lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
  }
  return lines;
}

function rest() {
  vscode.window.showInformationMessage('Hello World!', { modal: true }).then(() => {
    rest();
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
