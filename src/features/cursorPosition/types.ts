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
  mapChildProps: () => void;
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

type onActivationChanged = ({ isActive }: { isActive: boolean }) => void;

type onDetectedEnvironmentChanged = () => void;

type onPositionChanged = ({
  isPositionOutside,
  position,
}: {
  isPositionOutside: any;
  position: any;
}) => void;
