declare module "@vimeo/player" {
    export default class Player {
      constructor(element: HTMLIFrameElement | string, options?: any);
      play(): Promise<void>;
      pause(): Promise<void>;
      unload(): Promise<void>;
      on(event: string, callback: () => void): void;
    }
  }
  