import { Kami } from '@kami-engine/kami';

if (os.getenv('LOCAL_LUA_DEBUGGER_VSCODE') === '1') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  require('lldebugger').start();
}

function thisIsATest(): void {
  print('This is a test');
}

thisIsATest();
Kami.init();
