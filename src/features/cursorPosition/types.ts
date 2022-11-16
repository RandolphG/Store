import { INTERACTIONS } from "./constants";

export interface CursorPositionTypes {
  activationInteractionMouse: INTERACTIONS.CLICK | INTERACTIONS.HOVER;
  activationInteractionTouch:
    | INTERACTIONS.PRESS
    | INTERACTIONS.TAP
    | INTERACTIONS.TOUCH;
  children: any;
  className: string;
  hoverDelayInMs: number;
  hoverOffDelayInMs: number;
  isEnabled: boolean;
  mapChildProps: (state: state) => state;
  onActivationChanged: onActivationChanged;
  onDetectedEnvironmentChanged: onDetectedEnvironmentChanged;
  onPositionChanged: onPositionChanged;
  pressDurationInMs: number;
  pressMoveThreshold: number;
  shouldDecorateChildren: boolean;
  shouldStopTouchMovePropagation: boolean;
  style: {};
  tapDurationInMs: number;
  tapMoveThreshold: number;
}

export type state = {
  detectedEnvironment: { isMouseDetected: boolean; isTouchDetected: boolean };
  elementDimensions: { width: number; height: number };
  isActive: boolean;
  isPositionOutside: boolean;
  position: {};
};

type onActivationChanged = ({ isActive }: { isActive: boolean }) => void;

type onDetectedEnvironmentChanged = (environment: environment) => void;

type onPositionChanged = ({
  isPositionOutside,
  position,
}: {
  isPositionOutside: any;
  position: any;
}) => void;

type environment = {
  isTouchDetected: boolean;
  isMouseDetected: boolean;
};

export type eventName =
  | "touchstart"
  | "touchmove"
  | "touchend"
  | "touchcancel"
  | "mouseenter"
  | "mousemove"
  | "mouseleave"
  | "click";
