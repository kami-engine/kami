import { LightUserData } from 'love';
import { GamepadAxis, GamepadButton, Joystick, JoystickHat } from 'love.joystick';
import { KeyConstant } from 'love.keyboard';

import { Services } from './di';
import { Input } from './input/input';
import { Scenes, SceneType } from './scenes';

type HandlerKey = keyof typeof love.handlers;

/**
 * Internal class to manage the game loop and input events, without exposing it to the global scope.
 * @noSelf
 */
class KamiInternal {
  static started = false;
  static input: Input;

  static scenes: Scenes;

  static init(startScene: SceneType): void {
    Services.clear();
    KamiInternal.input = new Input();
    Services.add(Input, KamiInternal.input);

    KamiInternal.scenes = new Scenes();
    Services.add(Scenes, KamiInternal.scenes);
    KamiInternal.scenes.switch('push', startScene);

    KamiInternal.started = true;
  }

  static update(dt: number): void {
    const scenes = KamiInternal.scenes;
    scenes.preUpdate(dt);
    scenes.update(dt);
    scenes.postUpdate(dt);
  }

  static draw(): void {
    KamiInternal.scenes.draw();
    love.graphics.present();
  }
}

/**
 * @noSelf
 */
export class Kami {
  static init(startScene: SceneType): void {
    KamiInternal.init(startScene);
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

        if (KamiInternal.started) {
          love.handlers[name as HandlerKey]?.(a as never, b as never, c as never, d as never, e as never, f as never);
        }
      }
    }

    if (love.timer !== undefined) {
      // dt = math.min(love.timer.step(), MAX_DT);
      dt = love.timer.step();
    }

    if (KamiInternal.started) {
      // Debug.update();

      // if (!Debug.isPaused) {
      KamiInternal.update(dt);
      // } else if (Debug.runFrame) {
      // Debug.runFrame = false;
      // Game.update(dt);
      // }
      KamiInternal.draw();
    }

    if (love.timer !== undefined) {
      love.timer.sleep(0.001);
    }

    return null;
  };
};

love.keypressed = (key: KeyConstant, scancode: string, isRepeated: boolean): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('keyPressed', key, scancode, isRepeated);
  }
};

love.keyreleased = (key: KeyConstant, scancode: string): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('keyReleased', key, scancode);
  }
};

love.mousepressed = (x: number, y: number, button: number, isTouch: boolean): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('mousePressed', x, y, button, isTouch);
  }
};

love.mousereleased = (x: number, y: number, button: number): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('mouseReleased', x, y, button);
  }
};

love.mousemoved = (x: number, y: number, dx: number, dy: number, isTouch: boolean): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('mouseMoved', x, y, dx, dy, isTouch);
  }
};

love.wheelmoved = (dx: number, dy: number): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('mouseWheel', dx, dy);
  }
};

love.touchpressed = (
  id: LightUserData<'Touch'>,
  x: number,
  y: number,
  dx: number,
  dy: number,
  pressure: number
): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('touchPressed', id, x, y, dx, dy, pressure);
  }
};

love.touchreleased = (
  id: LightUserData<'Touch'>,
  x: number,
  y: number,
  dx: number,
  dy: number,
  pressure: number
): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('touchReleased', id, x, y, dx, dy, pressure);
  }
};

love.touchmoved = (
  id: LightUserData<'Touch'>,
  x: number,
  y: number,
  dx: number,
  dy: number,
  pressure: number
): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('touchMoved', id, x, y, dx, dy, pressure);
  }
};

love.joystickadded = (joystick: Joystick): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('joystickConnected', joystick);
  }

  if (KamiInternal.started) {
    KamiInternal.input.emit('gamepadConnected', joystick);
  }
};

love.joystickremoved = (joystick: Joystick): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('joystickDisconnected', joystick);
  }

  if (KamiInternal.started) {
    KamiInternal.input.emit('gamepadDisconnected', joystick);
  }
};

love.joystickaxis = (joystick: Joystick, axis: number, value: number): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('joystickAxis', joystick, axis, value);
  }
};

love.joystickhat = (joystick: Joystick, hat: number, direction: JoystickHat): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('joystickHat', joystick, hat, direction);
  }
};

love.joystickpressed = (joystick: Joystick, button: number): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('joystickPressed', joystick, button);
  }
};

love.joystickreleased = (joystick: Joystick, button: number): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('joystickReleased', joystick, button);
  }
};

love.gamepadaxis = (joystick: Joystick, axis: GamepadAxis, value: number): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('gamepadAxis', joystick, axis, value);
  }
};

love.gamepadpressed = (joystick: Joystick, button: GamepadButton): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('gamepadPressed', joystick, button);
  }
};

love.gamepadreleased = (joystick: Joystick, button: GamepadButton): void => {
  if (KamiInternal.started) {
    KamiInternal.input.emit('gamepadReleased', joystick, button);
  }
};
