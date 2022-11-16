import { Children, cloneElement, useEffect, useState } from "react";
import { INTERACTIONS, MOUSE_EMULATION_GUARD_TIMER_NAME } from "./constants";
import { CursorPositionTypes, state } from "./types";
import {
  Core,
  PressActivation,
  TouchActivation,
  TapActivation,
  HoverActivation,
  ClickActivation,
} from "./lib";
import { exclude } from "./utils";
import addEventListener from "./utils/addEventListener";
import noop from "./utils/noop";

export const useCursorPosition = (props: CursorPositionTypes) => {
  const [element, setElement] = useState<any>(null);
  const [core, setCore] = useState<any>(null);
  const [mouseActivation, setMouseActivation] = useState<any>(null);
  const [touchActivation, setTouchActivation] = useState<any>(null);
  const [state, setState] = useState<state>({
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
    checkArguments();
    if (props.isEnabled) {
      enable();
    }
    setTouchActivationStrategy(props.activationInteractionTouch);
    setMouseActivationStrategy(props.activationInteractionMouse);
    return () => {
      disable();
    };
  });

  /**
   * checkArguments
   * @description set props default value
   * @return props
   */
  function checkArguments() {
    if (arguments.length > 0) {
      return {
        ...props,
        activationInteractionMouse: INTERACTIONS.HOVER,
        activationInteractionTouch: INTERACTIONS.PRESS,
        hoverDelayInMs: 0,
        hoverOffDelayInMs: 0,
        isEnabled: true,
        mapChildProps: (props: CursorPositionTypes) => props,
        onActivationChanged: noop,
        onDetectedEnvironmentChanged: noop,
        onPositionChanged: noop,
        pressDurationInMs: 500,
        pressMoveThreshold: 5,
        shouldDecorateChildren: true,
        shouldStopTouchMovePropagation: false,
        tapDurationInMs: 180,
        tapMoveThreshold: 5,
      };
    }
  }

  /**
   * onIsActiveChanged
   * @param isActive
   * @return void
   */
  const onIsActiveChanged = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      activate();
    } else {
      deactivate();
    }
  };

  /**
   * onTouchStart
   * @param e
   * @return void
   */
  const onTouchStart = (e: TouchEvent) => {
    init();
    onTouchDetected();
    setShouldGuardAgainstMouseEmulationByDevices();

    const position = core.getCursorPosition(getTouchEvent(e));
    setPositionState(position);

    touchActivation.touchStarted({ e, position });
  };

  /**
   * onTouchMove
   * @param e
   */
  const onTouchMove = (e: TouchEvent) => {
    if (!isCoreReady) {
      return;
    }

    const position = core.getCursorPosition(getTouchEvent(e));
    touchActivation.touchMoved({ e, position });

    if (!state.isActive) {
      return;
    }

    setPositionState(position);
    e.preventDefault();

    if (props.shouldStopTouchMovePropagation) {
      e.stopPropagation();
    }
  };

  /**
   * onTouchEnd
   */
  const onTouchEnd = () => {
    touchActivation.touchEnded();
    unsetShouldGuardAgainstMouseEmulationByDevices();
  };

  /**
   * onTouchCancel
   */
  const onTouchCancel = () => {
    touchActivation.touchCanceled();

    unsetShouldGuardAgainstMouseEmulationByDevices();
  };

  /**
   * onMouseEnter
   * @param e
   */
  const onMouseEnter = (e: MouseEvent) => {
    if (shouldGuardAgainstMouseEmulationByDevices) {
      return;
    }

    init();
    onMouseDetected();
    setPositionState(core.getCursorPosition(e));
    mouseActivation.mouseEntered();
  };

  /**
   * onMouseMove
   * @param e
   */
  const onMouseMove = (e: MouseEvent) => {
    if (!isCoreReady) {
      return;
    }

    const position = core.getCursorPosition(e);
    setPositionState(position);
    mouseActivation.mouseMoved(position);
  };

  /**
   * onMouseLeave
   */
  const onMouseLeave = () => {
    mouseActivation.mouseLeft();
    setState({ ...state, isPositionOutside: true });
  };

  /**
   * onClick
   * @param e
   */
  const onClick = (e: MouseEvent) => {
    setPositionState(core.getCursorPosition(e));
    mouseActivation.mouseClicked();
    onMouseDetected();
  };

  /**
   * onTouchDetected
   */
  const onTouchDetected = () => {
    const environment = {
      isTouchDetected: true,
      isMouseDetected: false,
    };

    setState({ ...state, detectedEnvironment: environment });
    props.onDetectedEnvironmentChanged(environment);
  };

  /**
   * onMouseDetected
   */
  const onMouseDetected = () => {
    const environment = {
      isTouchDetected: false,
      isMouseDetected: true,
    };

    setState({ ...state, detectedEnvironment: environment });
    props.onDetectedEnvironmentChanged(environment);
  };

  /**
   * onPositionChanged
   */
  const onPositionChanged = () => {
    const { onPositionChanged } = props;
    onPositionChanged(state);
  };

  /**
   * isCoreReady
   */
  const isCoreReady = () => {
    return !!core;
  };

  /**
   * enable
   */
  const enable = () => {
    addEventListeners();
  };

  /**
   * disable
   */
  const disable = () => {
    removeEventListeners();
  };

  /**
   * init
   */
  const init = () => {
    setCore(new Core(element));

    setElementDimensionsState(getElementDimensions(element));
  };

  /**
   * setTouchActivationStrategy
   * @param interaction
   */
  const setTouchActivationStrategy = (interaction: INTERACTIONS) => {
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

  /**
   * setMouseActivationStrategy
   * @param interaction
   */
  const setMouseActivationStrategy = (interaction: INTERACTIONS) => {
    const { hoverDelayInMs, hoverOffDelayInMs } = props;

    const { HOVER, CLICK } = INTERACTIONS;

    switch (interaction) {
      case HOVER:
        setMouseActivation(
          new HoverActivation({
            onIsActiveChanged: onIsActiveChanged,
            hoverDelayInMs,
            hoverOffDelayInMs,
          })
        );
        break;
      case CLICK:
        setMouseActivation(
          new ClickActivation({
            onIsActiveChanged: onIsActiveChanged,
          })
        );
        break;
      default:
        throw new Error("Must implement a mouse activation strategy");
    }
  };

  /**
   * reset
   */
  const reset = () => {
    /*const {core: {lastEvent: lastMouseEvent= {}} } = core;

        init();

        if (!lastMouseEvent) {
            return;
        }

        setPositionState(core.getCursorPosition(lastMouseEvent));*/
  };

  /**
   * activate
   */
  const activate = () => {
    setState({ ...state, isActive: true });
    props.onActivationChanged({ isActive: true });
  };

  /**
   * deactivate
   */
  const deactivate = () => {
    setState({ ...state, isActive: false });

    const { isPositionOutside, position } = state;

    props.onPositionChanged({
      isPositionOutside,
      position,
    });

    props.onActivationChanged({ isActive: false });
  };

  /**
   * setPositionState
   * @param position
   */
  const setPositionState = (position: { x: number; y: number }) => {
    const isPositionOutside = getIsPositionOutside(position);

    setState({
      ...state,
      isPositionOutside,
      position,
    });

    onPositionChanged();
  };

  /**
   * setElementDimensionsState
   * @param dimensions
   */
  const setElementDimensionsState = (dimensions: {
    width: number;
    height: number;
  }) => {
    setState({
      ...state,
      elementDimensions: dimensions,
    });
  };

  /**
   * setShouldGuardAgainstMouseEmulationByDevices
   */
  const setShouldGuardAgainstMouseEmulationByDevices = () => {
    shouldGuardAgainstMouseEmulationByDevices = true;
  };

  /**
   * unsetShouldGuardAgainstMouseEmulationByDevices
   */
  const unsetShouldGuardAgainstMouseEmulationByDevices = () => {
    timers.push({
      name: MOUSE_EMULATION_GUARD_TIMER_NAME,
      id: setTimeout(() => {
        shouldGuardAgainstMouseEmulationByDevices = false;
      }, 0),
    });
  };

  /**
   * getElementDimensions
   * @param el
   */
  const getElementDimensions = (el: any) => {
    const { width, height } = el.getBoundingClientRect();

    return {
      width,
      height,
    };
  };

  /**
   * getIsPositionOutside
   * @param position
   */
  const getIsPositionOutside = (position: { x: number; y: number }) => {
    const { x, y } = position;
    const {
      elementDimensions: { width, height },
    } = state;

    const isPositionOutside = () => x < 0 || y < 0 || x > width || y > height;

    return isPositionOutside();
  };

  /**
   * getTouchEvent
   * @param e
   */
  const getTouchEvent = (e: TouchEvent) => {
    return e.touches[0];
  };

  /**
   * getIsReactComponent
   * @param reactElement
   * @return boolean
   */
  const getIsReactComponent = (reactElement: any) => {
    return typeof reactElement.type === "function";
  };

  /**
   * shouldDecorateChild
   * @param child
   */
  const shouldDecorateChild = (child: any) => {
    return (
      !!child && getIsReactComponent(child) && props.shouldDecorateChildren
    );
  };

  /**
   * decorateChild
   * @param child
   * @param props
   */
  const decorateChild = (child: any, props: any) => {
    return cloneElement(child, props);
  };

  /**
   * decorateChildren
   * @param children
   * @param props
   */
  const decorateChildren = (children: any, props: any) => {
    return Children.map(children, (child) => {
      return shouldDecorateChild(child) ? decorateChild(child, props) : child;
    });
  };

  /**
   * addEventListeners
   */
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

  /**
   * removeEventListeners
   */
  const removeEventListeners = () => {
    while (eventListeners.length) {
      eventListeners.pop().removeEventListener();
    }
  };

  /**
   * getPassThroughProps
   */
  const getPassThroughProps = () => {
    const ownPropNames = Object.keys(props);
    return exclude(props, ownPropNames);
  };

  return {
    decorateChildren,
    getPassThroughProps,
    props,
    state,
    element,
    setElement,
  };
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
