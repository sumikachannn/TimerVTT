import { createTimer, createStopwatch } from '../scripts/timer.js';

export class TimerGUI extends FormApplication {
  constructor() {
    super();
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['form'],
      popOut: true,
      template: `./modules/timer/templates/timerGUI.html`,
      id: 'module-timer-application',
      title: 'Timer',
    });
  }

  getData() {
    return {
      duration: 30,
      tick: true,
      end: true,
      private: false
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
  }

  async _updateObject(_, formData) {
    if (formData.timerDuration <= 0)
      return ui.notifications.warn("Please insert a duration greater than 0 seconds!");
    const { timerType, timerDuration, timerDescription, timerTick, timerEnd, timerPrivate } = formData;
    if (timerType == "Down")
      createTimer(timerDuration, timerDescription, timerTick, timerEnd, timerPrivate);
    else
      createStopwatch(timerDescription, timerPrivate);
  }

  static addButton() {
    Hooks.on("getSceneControlButtons", (data) => {
      data[0].tools.push({
        name: "module-timer",
        title: "Timer",
        icon: "fas fa-clock",
        button: true,
        onClick: () => new TimerGUI().render(true),
        visible: game.user.isGM
      })
    });
  }
}

