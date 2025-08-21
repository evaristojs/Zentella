declare global {
  interface Window {
    Starfield: {
      setup: (config?: {
        numStars?: number;
        baseSpeed?: number;
        trailLength?: number;
        starColor?: string;
        canvasColor?: string;
        hueJitter?: number;
        maxAcceleration?: number;
        accelerationRate?: number;
        decelerationRate?: number;
        minSpawnRadius?: number;
        maxSpawnRadius?: number;
      }) => void;
      destroy: () => void;
    };
  }
}

export {};