import { Children, cloneElement, useEffect, useState } from "react";
import { INTERACTIONS, MOUSE_EMULATION_GUARD_TIMER_NAME } from "./constants";
import { CursorPositionTypes } from "./types";
import Core from "./lib/ElementRelativeCursorPosition";
import addEventListener from "./utils/addEventListener";
import PressActivation from "./lib/PressActivation";
import TouchActivation from "./lib/TouchActivation";
import TapActivation from "./lib/TapActivation";
import HoverActivation from "./lib/HoverActivation";
import ClickActivation from "./lib/ClickActivation";

export const useCursorPosition = (props: CursorPositionTypes) => {
  const [element, setElement] = useState<any>(null);
  const [core, setCore] = useState<any>(null);
  const [mouseActivation, setMouseActivation] = useState<any>(null);
  const [touchActivation, setTouchActivation] = useState<any>(null);
  const [state, setState] = useState({
    detectedEnvironment: {
      isMouseDetected: false,
      isTouchDetected: false,
    },
    elementDimensions: {
      width: 0,
      height: 0,
    },
    isActive: false,
    isPositionOutside: true,
    position: {
      x: 0,
      y: 0,
    },
  });

  let shouldGuardAgainstMouseEmulationByDevices = false;
  let eventListeners: any = [];
  let timers = [];
  let elementOffset = {
    x: 0,
    y: 0,
  };

  useEffect(() => {
    if (props.isEnabled) {
      enable();
    }
    setTouchActivationStrategy(props.activationInteractionTouch);
    setMouseActivationStrategy(props.activationInteractionMouse);
  });

  const onIsActiveChanged = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      activate();
    } else {
      deactivate();
    }
  };

  const onTouchStart = (e) => {
    init();
    onTouchDetected();
    setShouldGuardAgainstMouseEmulationByDevices();

    const position = core.getCursorPosition(getTouchEvent(e));
    setPositionState(position);

    touchActivation.touchStarted({ e, position });
  };

  const onTouchMove = (e) => {
    if (!isCoreReady) {
      return;
    }

    const position = core.getCursorPosition(getTouchEvent(e));
    this.touchActivation.touchMoved({ e, position });

    if (!state.isActive) {
      return;
    }

    setPositionState(position);
    e.preventDefault();

    if (props.shouldStopTouchMovePropagation) {
      e.stopPropagation();
    }
  };

  const onTouchEnd = () => {
    touchActivation.touchEnded();
    unsetShouldGuardAgainstMouseEmulationByDevices();
  };

  const onTouchCancel = () => {
    touchActivation.touchCanceled();

    unsetShouldGuardAgainstMouseEmulationByDevices();
  };

  const onMouseEnter = (e) => {
    if (shouldGuardAgainstMouseEmulationByDevices) {
      return;
    }

    init();
    onMouseDetected();
    setPositionState(core.getCursorPosition(e));
    mouseActivation.mouseEntered();
  };

  const onMouseMove = (e) => {
    if (!isCoreReady) {
      return;
    }

    const position = core.getCursorPosition(e);
    setPositionState(position);
    mouseActivation.mouseMoved(position);
  };

  const onMouseLeave = () => {
    mouseActivation.mouseLeft();
    setState({...state, isPositionOutside: true });
  };

  const onClick = (e) => {
    setPositionState(core.getCursorPosition(e));
    mouseActivation.mouseClicked();
    onMouseDetected();
  };

  const onTouchDetected = () => {
    const environment = {
      isTouchDetected: true,
      isMouseDetected: false,
    };

    setState({...state, detectedEnvironment: environment });
    props.onDetectedEnvironmentChanged(environment);
  };

  const onMouseDetected = () => {
    const environment = {
      isTouchDetected: false,
      isMouseDetected: true,
    };

    setState({...state, detectedEnvironment: environment });
    props.onDetectedEnvironmentChanged(environment);
  };

  const onPositionChanged = () => {
    const { onPositionChanged } = props;
    onPositionChanged(state);
  };

  const isCoreReady = () => {
    return !!core;
  };

  const enable = () => {
    addEventListeners();
  };

  const disable = () => {
    removeEventListeners();
  };

  const init = () => {
    setCore(new Core(element));

    setElementDimensionsState(getElementDimensions(element));
  };

  const setTouchActivationStrategy = (interaction) => {
    const {
      pressDurationInMs,
      pressMoveThreshold,
      tapDurationInMs,
      tapMoveThreshold,
    } = props;

    const { TOUCH, TAP, PRESS } = INTERACTIONS;

    switch (interaction) {
      case PRESS:
        setTouchActivation(
          new PressActivation({
            onIsActiveChanged: onIsActiveChanged,
            pressDurationInMs,
            pressMoveThreshold,
          })
        );
        break;
      case TAP:
        setTouchActivation(
          new TapActivation({
            onIsActiveChanged: onIsActiveChanged,
            tapDurationInMs,
            tapMoveThreshold,
          })
        );
        break;
      case TOUCH:
        setTouchActivation(
          new TouchActivation({
            onIsActiveChanged: onIsActiveChanged,
          })
        );
        break;
      default:
        throw new Error("Must implement a touch activation strategy");
    }
  };

  const setMouseActivationStrategy = (interaction) => {
    const { hoverDelayInMs, hoverOffDelayInMs } = props;

    const { HOVER, CLICK } = INTERACTIONS;

    switch (interaction) {
      case HOVER:
        setMouseActivation( new HoverActivation({
          onIsActiveChanged: this.onIsActiveChanged,
          hoverDelayInMs,
          hoverOffDelayInMs,
        }));
        break;
      case CLICK:
        setMouseActivation( = new ClickActivation({
          onIsActiveChanged: onIsActiveChanged,
        }));
        break;
      default:
        throw new Error("Must implement a mouse activation strategy");
    }
  };

  const reset = () => {
    const { core: { lastEvent: lastMouseEvent } = {} } = this;

    init();

    if (!lastMouseEvent) {
      return;
    }

    setPositionState(core.getCursorPosition(lastMouseEvent));
  };

  const activate = () => {
    setState({ ...state, isActive: true });
    props.onActivationChanged({ isActive: true });
  };

  const deactivate = () => {
    setState({ ...state, isActive: false });

    const { isPositionOutside, position } = state;

    props.onPositionChanged({
      isPositionOutside,
      position,
    });

    props.onActivationChanged({ isActive: false });
  };

  const setPositionState = (position) => {
    const isPositionOutside = getIsPositionOutside(position);

    setState(
      {...state,
        isPositionOutside,
        position,
      }
    );

    onPositionChanged()

  };

  const setElementDimensionsState = (dimensions) => {
    setState({...state,
      elementDimensions: dimensions,
    });
  };

  const setShouldGuardAgainstMouseEmulationByDevices = () => {
    shouldGuardAgainstMouseEmulationByDevices = true;
  };

  const unsetShouldGuardAgainstMouseEmulationByDevices = () => {
    timers.push({
      name: MOUSE_EMULATION_GUARD_TIMER_NAME,
      id: setTimeout(() => {
        shouldGuardAgainstMouseEmulationByDevices = false;
      }, 0),
    });
  };

  const getElementDimensions = (el: any) => {
    const { width, height } = el.getBoundingClientRect();

    return {
      width,
      height,
    };
  };

  const getIsPositionOutside = (position: { x: number; y: number }) => {
    const { x, y } = position;
    const {
      elementDimensions: { width, height },
    } = state;

    const isPositionOutside=() => x < 0 || y < 0 || x > width || y > height;

    return isPositionOutside();
  };

  const getTouchEvent = (e: TouchEvent) => {
    return e.touches[0];
  };

  const getIsReactComponent = (reactElement) => {
    return typeof reactElement.type === "function";
  };

  const shouldDecorateChild = (child: any) => {
    return (
      !!child && getIsReactComponent(child) && props.shouldDecorateChildren
    );
  };

  const decorateChild = (child, props) => {
    return cloneElement(child, props);
  };

  const decorateChildren = (children, props) => {
    return Children.map(children, (child) => {
      return shouldDecorateChild(child) ? decorateChild(child, props) : child;
    });
  };

  const addEventListeners = () => {
    eventListeners.push(
      addEventListener(element, "touchstart", onTouchStart, { passive: false }),
      addEventListener(element, "touchmove", onTouchMove, { passive: false }),
      addEventListener(element, "touchend", onTouchEnd),
      addEventListener(element, "touchcancel", onTouchCancel),
      addEventListener(element, "mouseenter", onMouseEnter),
      addEventListener(element, "mousemove", onMouseMove),
      addEventListener(element, "mouseleave", onMouseLeave),
      addEventListener(element, "click", onClick)
    );
  };

  const removeEventListeners = () => {
    while (eventListeners.length) {
      eventListeners.pop().removeEventListener();
    }
  };

  const getPassThroughProps = () => {
    const ownPropNames = Object.keys(this.constructor.propTypes);
    return omit(props, ownPropNames);
  };

  return { decorateChildren, props };
};

/*static displayName = 'ReactCursorPosition';


static defaultProps = {
        activationInteractionMouse: INTERACTIONS.HOVER,
        activationInteractionTouch: INTERACTIONS.PRESS,
        hoverDelayInMs: 0,
        hoverOffDelayInMs: 0,
        isEnabled: true,
        mapChildProps: props => props,
        onActivationChanged: noop,
        onDetectedEnvironmentChanged: noop,
        onPositionChanged: noop,
        pressDurationInMs: 500,
        pressMoveThreshold: 5,
        shouldDecorateChildren: true,
        shouldStopTouchMovePropagation: false,
        tapDurationInMs: 180,
        tapMoveThreshold: 5,
    };*/

/*componentWillReceiveProps({ isEnabled: willBeEnabled }) {
    const { isEnabled } = this.props;
    const isEnabledWillChange = isEnabled !== willBeEnabled;

    if (!isEnabledWillChange) {
        return;
    }

    if (willBeEnabled) {
        this.enable();
    } else {
        this.disable();
    }
}

componentWillUnmount() {
    this.disable();
}*/
