/* --- Functions --- */
import { createThreeDSecureSession } from "./functions/createThreeDSecureSession/createThreeDSecureSession";
window.createThreeDSecureSession = createThreeDSecureSession;

import { hasService } from "./functions/hasService";
window.hasService = hasService;

import { hasAvailableSeatService } from "./lib/hasAvailableSeatService";
window.hasAvailableSeatService = hasAvailableSeatService;

declare global {
  interface Window {
    createThreeDSecureSession: typeof createThreeDSecureSession;
    hasAvailableSeatService: typeof hasAvailableSeatService;
    hasService: typeof hasService;
  }
}
