export function wrapAction(actionFn) {
  return async (...args) => {
    try {
      await actionFn(...args);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`❌ ${message}`);
      process.exitCode = 1;
    }
  };
}
