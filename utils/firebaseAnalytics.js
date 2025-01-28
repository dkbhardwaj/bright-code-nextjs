import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

export const trackEvent = (eventName, string, eventParams, any) => {
  if (typeof window !== "undefined" && analytics) {
    logEvent(analytics, eventName, eventParams);
    console.log(`Event tracked: ${eventName}`, eventParams);
  } else {
    console.warn("Analytics is not initialized or running server-side.");
  }
};
