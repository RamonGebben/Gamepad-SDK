interface GamepadEventDetail {
  gamepad: Gamepad;
  button?: GamepadButton;
  buttonIndex?: number;
  axisValue?: number;
  axisIndex?: number;
}

type GamepadEventType = 'buttonpress' | 'buttonrelease' | 'axischange' | 'connect' | 'disconnect';

class GamepadSDK {
  private gamepads: Gamepad[];
  private previousState: { [key: number]: { buttons: GamepadButton[]; axes: number[] } };
  private listeners: { [key in GamepadEventType]: Array<(detail: GamepadEventDetail) => void> };

  constructor() {
    this.gamepads = [];
    this.previousState = {};
    this.listeners = {
      buttonpress: [],
      buttonrelease: [],
      axischange: [],
      connect: [],
      disconnect: [],
    };

    window.addEventListener('gamepadconnected', (e: GamepadEvent) => this.onGamepadConnected(e));
    window.addEventListener('gamepaddisconnected', (e: GamepadEvent) => this.onGamepadDisconnected(e));

    this.pollGamepads();
  }

  // Register event listeners
  public addEventListener(event: GamepadEventType, callback: (detail: GamepadEventDetail) => void): void {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  private onGamepadConnected(event: GamepadEvent): void {
    console.log('Gamepad connected:', event.gamepad);
    this.gamepads[event.gamepad.index] = event.gamepad;

    this.previousState[event.gamepad.index] = {
      buttons: event.gamepad.buttons.map(() => ({ pressed: false } as GamepadButton)),
      axes: event.gamepad.axes.slice(),
    };

    this.triggerEvent('connect', { gamepad: event.gamepad });
  }

  private onGamepadDisconnected(event: GamepadEvent): void {
    console.log('Gamepad disconnected:', event.gamepad);
    this.triggerEvent('disconnect', { gamepad: event.gamepad });
    delete this.gamepads[event.gamepad.index];
    delete this.previousState[event.gamepad.index];
  }

  private pollGamepads(): void {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    gamepads.forEach((gamepad, index) => {
      if (gamepad) {
        this.checkButtonPresses(gamepad, index);
        this.checkAxesChanges(gamepad, index);
      }
    });

    requestAnimationFrame(() => this.pollGamepads());
  }

  private checkButtonPresses(gamepad: Gamepad, index: number): void {
    const previousButtons = this.previousState[gamepad.index]?.buttons || [];

    gamepad.buttons.forEach((button, i) => {
      if (button.pressed && (!previousButtons[i] || !previousButtons[i].pressed)) {
        this.triggerEvent('buttonpress', { gamepad, button, buttonIndex: i });
      } else if (!button.pressed && previousButtons[i]?.pressed) {
        this.triggerEvent('buttonrelease', { gamepad, button, buttonIndex: i });
      }
    });

    this.previousState[gamepad.index] = {
      ...this.previousState[gamepad.index],
      buttons: gamepad.buttons.map((btn): GamepadButton => ({ pressed: btn.pressed, touched: btn.touched, value: btn.value })),
    };
  }

  private checkAxesChanges(gamepad: Gamepad, index: number): void {
    const previousAxes = this.previousState[gamepad.index]?.axes || [];

    gamepad.axes.forEach((axis, i) => {
      if (axis !== previousAxes[i]) {
        this.triggerEvent('axischange', { gamepad, axisValue: axis, axisIndex: i });
      }
    });

    this.previousState[gamepad.index] = {
      ...this.previousState[gamepad.index],
      axes: gamepad.axes.slice(),
    };
  }

  private triggerEvent(event: GamepadEventType, detail: GamepadEventDetail): void {
    this.listeners[event].forEach((callback) => callback(detail));
  }
}

export default GamepadSDK;
