// src/lib/motion.ts
import { animate, createTimeline, stagger } from 'animejs';

export { animate, createTimeline, stagger };

/**
 * Helper to safely animate elements only when motion is enabled.
 */
export function safeAnimate(
  targets: any,
  params: Record<string, any>,
  isMotionEnabled: boolean
) {
  if (!isMotionEnabled) {
    // Immediately set values if motion is disabled
    return null;
  }
  return animate(targets, params);
}
