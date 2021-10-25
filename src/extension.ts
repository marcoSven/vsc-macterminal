import * as vscode from "vscode";

import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const openFolder = vscode.commands.registerCommand(
    "macterminal.openfolder",
    (e) => {
      const cmd = vscode.workspace.getConfiguration("terminal").external;
      if (process.platform === "darwin") {
        child_process.exec(
          `open -a ${cmd.osxExec || "Terminal.app"} "${getPath(e.fsPath)}"`
        );
      }
    }
  );
  context.subscriptions.push(openFolder);
}

function getPath(fsPath: string) {
  if (!fs.lstatSync(fsPath).isDirectory()) {
    return path.dirname(fsPath);
  }
  return fsPath;
}

// this method is called when your extension is deactivated
export function deactivate() {}
