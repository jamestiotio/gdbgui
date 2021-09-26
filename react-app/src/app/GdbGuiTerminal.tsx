import React, { useLayoutEffect } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { ptyFontSize } from "./constants";

// TODO set this in a global store
const terminal = new Terminal({
  cursorBlink: true,
  macOptionIsMeta: true,
  scrollback: 9999,
  fontSize: ptyFontSize,
});
// @ts-ignore  TODO use a proper global store or recoil
window.gdbguiPty = terminal;
const fitAddon = new FitAddon();

const terminalRef = React.createRef<any>();
export function GdbGuiTerminal(props: {}) {
  useLayoutEffect(() => {
    terminal.open(terminalRef.current);
    terminal.writeln(`gdbgui's diagnostic messages displayed here`);
    terminal.loadAddon(fitAddon);
    setInterval(() => {
      fitAddon.fit();
    }, 2000);
    fitAddon.fit();
  }, []);
  return <div className="bg-black h-full w-full" ref={terminalRef} />;
}
