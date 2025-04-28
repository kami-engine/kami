// import { LightUserData } from 'love';
// import { GamepadAxis, GamepadButton, Joystick, JoystickHat } from 'love.joystick';
// import { KeyConstant } from 'love.keyboard';

import { Services } from './di';
import { Graphics, HandlerKey } from './types';

/**
 * @noSelf
 */
export class Kami {
  static started = false;

  static init(): void {
    Services.clear();
    Kami.started = true;
  }

  static update(dt: number): void {
    print('Kami.update', dt);
  }

  static draw(graphics: Graphics): void {
    graphics.clear(0, 0, 0, 1);
    graphics.setColor(1, 1, 1, 1);
    graphics.print('Hello World!', 100, 100);
    graphics.present();
  }
}

love.run = (): (() => number | null) => {
  if (love.timer !== undefined) {
    love.timer.step();
  }

  let dt = 0;

  return (): number | null => {
    if (love.event !== undefined) {
      love.event.pump();

      for (const [name, a, b, c, d, e, f] of love.event.poll()) {
        if (name === 'quit') {
          if (!love.quit || !love.quit()) {
            return (a as number) ?? 0;
          }
        }

        if (Kami.started) {
          love.handlers[name as HandlerKey]?.(a as never, b as never, c as never, d as never, e as never, f as never);
        }
      }
    }

    if (love.timer !== undefined) {
      // dt = math.min(love.timer.step(), MAX_DT);
      dt = love.timer.step();
    }

    if (Kami.started) {
      // Debug.update();

      // if (!Debug.isPaused) {
      Kami.update(dt);
      // } else if (Debug.runFrame) {
      // Debug.runFrame = false;
      // Game.update(dt);
      // }
      Kami.draw(love.graphics);
    }

    if (love.timer !== undefined) {
      love.timer.sleep(0.001);
    }

    return null;
  };
};

// love.keypressed = (key: KeyConstant, scancode: string, isRepeated: boolean): void => {
//   if (Input.keyboard) {
//     InputEmitter.emit('keyPressed', key, scancode, isRepeated);
//   }
// };

// love.keyreleased = (key: KeyConstant, scancode: string): void => {
//   if (Input.keyboard) {
//     InputEmitter.emit('keyReleased', key, scancode);
//   }
// };

// love.mousepressed = (x: number, y: number, button: number, isTouch: boolean): void => {
//   if (Input.mouse) {
//     InputEmitter.emit('mousePressed', x, y, button, isTouch);
//   }
// };

// love.mousereleased = (x: number, y: number, button: number): void => {
//   if (Input.mouse) {
//     InputEmitter.emit('mouseReleased', x, y, button);
//   }
// };

// love.mousemoved = (x: number, y: number, dx: number, dy: number, isTouch: boolean): void => {
//   if (Input.mouse) {
//     InputEmitter.emit('mouseMoved', x, y, dx, dy, isTouch);
//   }
// };

// love.wheelmoved = (dx: number, dy: number): void => {
//   if (Input.mouse) {
//     InputEmitter.emit('mouseWheel', dx, dy);
//   }
// };

// love.touchpressed = (
//   id: LightUserData<'Touch'>,
//   x: number,
//   y: number,
//   dx: number,
//   dy: number,
//   pressure: number
// ): void => {
//   if (Input.touch) {
//     InputEmitter.emit('touchPressed', id, x, y, dx, dy, pressure);
//   }
// };

// love.touchreleased = (
//   id: LightUserData<'Touch'>,
//   x: number,
//   y: number,
//   dx: number,
//   dy: number,
//   pressure: number
// ): void => {
//   if (Input.touch) {
//     InputEmitter.emit('touchReleased', id, x, y, dx, dy, pressure);
//   }
// };

// love.touchmoved = (
//   id: LightUserData<'Touch'>,
//   x: number,
//   y: number,
//   dx: number,
//   dy: number,
//   pressure: number
// ): void => {
//   if (Input.touch) {
//     InputEmitter.emit('touchMoved', id, x, y, dx, dy, pressure);
//   }
// };

// love.joystickadded = (joystick: Joystick): void => {
//   if (Input.joystick) {
//     InputEmitter.emit('joystickConnected', joystick);
//   }

//   if (Input.gamepad) {
//     InputEmitter.emit('gamepadConnected', joystick);
//   }
// };

// love.joystickremoved = (joystick: Joystick): void => {
//   if (Input.joystick) {
//     InputEmitter.emit('joystickDisconnected', joystick);
//   }

//   if (Input.gamepad) {
//     InputEmitter.emit('gamepadDisconnected', joystick);
//   }
// };

// love.joystickaxis = (joystick: Joystick, axis: number, value: number): void => {
//   if (Input.joystick) {
//     InputEmitter.emit('joystickAxis', joystick, axis, value);
//   }
// };

// love.joystickhat = (joystick: Joystick, hat: number, direction: JoystickHat): void => {
//   if (Input.joystick) {
//     InputEmitter.emit('joystickHat', joystick, hat, direction);
//   }
// };

// love.joystickpressed = (joystick: Joystick, button: number): void => {
//   if (Input.joystick) {
//     InputEmitter.emit('joystickPressed', joystick, button);
//   }
// };

// love.joystickreleased = (joystick: Joystick, button: number): void => {
//   if (Input.joystick) {
//     InputEmitter.emit('joystickReleased', joystick, button);
//   }
// };

// love.gamepadaxis = (joystick: Joystick, axis: GamepadAxis, value: number): void => {
//   if (Input.gamepad) {
//     InputEmitter.emit('gamepadAxis', joystick, axis, value);
//   }
// };

// love.gamepadpressed = (joystick: Joystick, button: GamepadButton): void => {
//   if (Input.gamepad) {
//     InputEmitter.emit('gamepadPressed', joystick, button);
//   }
// };

// love.gamepadreleased = (joystick: Joystick, button: GamepadButton): void => {
//   if (Input.gamepad) {
//     InputEmitter.emit('gamepadReleased', joystick, button);
//   }
// };
