// DEMO: there is no backend yet, so sending a message is simulated here.
// Replace sendMessage with a real request when the backend exists.

/** Set to true to preview the "message was not sent" state */
export const SIMULATE_MESSAGE_FAILURE = false;

export function sendMessage(): Promise<{ ok: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: !SIMULATE_MESSAGE_FAILURE }), 1000);
  });
}
