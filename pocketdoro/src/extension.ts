// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let workingTimeBar: vscode.StatusBarItem;
let restingTimeBar: vscode.StatusBarItem;

const REST_STATUS = 'REST_STATUS';
const WORK_STATUS = 'WORK_STATUS';
let status: string = WORK_STATUS;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
  // register a command that is invoked when the status bar
  // item is selected
  const myCommandId = 'extension.digidoro';
  subscriptions.push(vscode.commands.registerCommand(myCommandId, () => { }));

  // create a new status bar item that we can now manage
  workingTimeBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  workingTimeBar.command = myCommandId;
  workingTimeBar.show();
  subscriptions.push(workingTimeBar);

  restingTimeBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  restingTimeBar.command = myCommandId;
  restingTimeBar.show();
  subscriptions.push(restingTimeBar);

  // update status bar item once at start
  updateStatusBarItem(10, 10);
}

function updateStatusBarItem(workPeriod: Number, restPeriod: Number): void {
  let workingTime = 0;
  let restingTime = 0;
  setInterval(() => {
    if (status === REST_STATUS) {
      return;
    }
    workingTime++;
    workingTimeBar.text = `$(megaphone) working ${workingTime} time`;
    if (workPeriod === workingTime) {
      workingTime = 0;
      status = REST_STATUS;
      workingTimeBar.hide();
      restingTimeBar.show();
      rest();
    }
  }, 1000);

  setInterval(() => {
    if (status === WORK_STATUS) {
      return;
    }
    restingTime++;
    restingTimeBar.text = `$(megaphone) resting ${restingTime} time`;
    if (restingTime === restPeriod) {
      restingTime = 0;
      status = WORK_STATUS;
      workingTimeBar.show();
      restingTimeBar.hide();
    }
  }, 1000);
}

function rest() {
  // console.log(status);
  if (status === WORK_STATUS) {
    return;
  }
  vscode.window.showInformationMessage('Hello World!', { modal: true }).then(() => {
    rest();
  });
}

// this method is called when your extension is deactivated
export function deactivate() { }
