import * as vscode from "vscode";

import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const disposableOpenFolderInTerminal = vscode.commands.registerCommand(
    "macterminal.openFolderInTerminal",
    (e) => {
      const cmd = vscode.workspace.getConfiguration("terminal").external;
      if (!e || !e.fsPath) {
        return;
      }
      if (process.platform === "darwin") {
        child_process.exec(
          `open -a ${cmd.osxExec || "Terminal.app"} "${getPath(e.fsPath)}"`
        );
      }
    }
  );

  const disposableOpenCurrentTabFileInTerminal =
    vscode.commands.registerCommand(
      "macterminal.openCurrentTabFileInTerminal",
      () => {
        const cmd = vscode.workspace.getConfiguration("terminal").external;
        const currentTabFilePath =
          vscode.window.activeTextEditor?.document.fileName;
        if (currentTabFilePath && process.platform === "darwin") {
          child_process.exec(
            `open -a ${cmd.osxExec || "Terminal.app"} "${getPath(
              currentTabFilePath
            )}"`
          );
        }
        return;
      }
    );

  context.subscriptions.push(
    disposableOpenFolderInTerminal,
    disposableOpenCurrentTabFileInTerminal
  );
}

function getPath(fsPath: string) {
  if (!fs.lstatSync(fsPath).isDirectory()) {
    return path.dirname(fsPath);
  }
  return fsPath;
}

// this method is called when your extension is deactivated
export function deactivate() {}
