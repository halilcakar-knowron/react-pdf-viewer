'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
var ReactDOM__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactDOM);

var TextDirection = /* @__PURE__ */ ((TextDirection2) => {
  TextDirection2["RightToLeft"] = "RTL";
  TextDirection2["LeftToRight"] = "LTR";
  return TextDirection2;
})(TextDirection || {});
const ThemeContext = React__namespace.createContext({
  currentTheme: "light",
  direction: "LTR" /* LeftToRight */,
  setCurrentTheme: () => {
  }
});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const classNames = (classes) => {
  const result = [];
  Object.keys(classes).forEach((clazz) => {
    if (clazz && classes[clazz]) {
      result.push(clazz);
    }
  });
  return result.join(" ");
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React__namespace.useLayoutEffect : React__namespace.useEffect;

const useIntersectionObserver = (props) => {
  const containerRef = React__namespace.useRef(null);
  const { once, threshold, onVisibilityChanged } = props;
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const intersectionTracker = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          const ratio = entry.intersectionRatio;
          onVisibilityChanged({ isVisible, ratio });
          if (isVisible && once) {
            intersectionTracker.unobserve(container);
            intersectionTracker.disconnect();
          }
        });
      },
      {
        threshold: threshold || 0
      }
    );
    intersectionTracker.observe(container);
    return () => {
      intersectionTracker.unobserve(container);
      intersectionTracker.disconnect();
    };
  }, []);
  return containerRef;
};

var styles$8 = {"icon":"rpv_2a5a054d","iconRtl":"rpv_81d01ddd"};

const Icon = ({ children, ignoreDirection = false, size = 24 }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = !ignoreDirection && direction === TextDirection.RightToLeft;
  const width = `${size || 24}px`;
  return /* @__PURE__ */ React__namespace.createElement(
    "svg",
    {
      "aria-hidden": "true",
      className: classNames({
        [styles$8.icon]: true,
        [styles$8.iconRtl]: isRtl
      }),
      focusable: "false",
      height: width,
      viewBox: "0 0 24 24",
      width
    },
    children
  );
};

const CheckIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: `M23.5,0.499l-16.5,23l-6.5-6.5` }));

var styles$7 = {"item":"rpv_abc2baee","itemDisabled":"rpv_6e088b8a","itemLtr":"rpv_f9f8621c","itemRtl":"rpv_f9f8789c","icon":"rpv_abc27c54","iconLtr":"rpv_dd835ef6","iconRtl":"rpv_dd837576","label":"rpv_ccb63a79","labelLtr":"rpv_8a1fb2b1","labelRtl":"rpv_8a1fc931","checkLtr":"rpv_5a82a41d","checkRtl":"rpv_5a82ba9d"};

const MenuItem = ({ checked = false, children, icon = null, isDisabled = false, testId, onClick }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = testId ? { "data-testid": testId } : {};
  return /* @__PURE__ */ React__namespace.createElement(
    "button",
    {
      className: classNames({
        [styles$7.item]: true,
        [styles$7.itemDisabled]: isDisabled,
        [styles$7.itemLtr]: !isRtl,
        [styles$7.itemRtl]: isRtl
      }),
      role: "menuitem",
      tabIndex: -1,
      type: "button",
      onClick,
      ...attrs
    },
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$7.icon]: true,
          [styles$7.iconLtr]: !isRtl,
          [styles$7.iconRtl]: isRtl
        })
      },
      icon
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$7.label]: true,
          [styles$7.labelLtr]: !isRtl,
          [styles$7.labelRtl]: isRtl
        })
      },
      children
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$7.checkLtr]: !isRtl,
          [styles$7.checkRtl]: isRtl
        })
      },
      checked && /* @__PURE__ */ React__namespace.createElement(CheckIcon, null)
    )
  );
};

var styles$6 = {"button":"rpv_799dde0c","buttonDisabled":"rpv_ec15b0a8","buttonRtl":"rpv_aa3418be","buttonSelected":"rpv_22f568c7"};

const MinimalButton = ({ ariaLabel = "", ariaKeyShortcuts = "", children, isDisabled = false, isSelected = false, testId, onClick }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = testId ? { "data-testid": testId } : {};
  return /* @__PURE__ */ React__namespace.createElement(
    "button",
    {
      "aria-label": ariaLabel,
      ...ariaKeyShortcuts && { "aria-keyshortcuts": ariaKeyShortcuts },
      ...isDisabled && { "aria-disabled": true },
      className: classNames({
        [styles$6.button]: true,
        [styles$6.buttonDisabled]: isDisabled,
        [styles$6.buttonRtl]: isRtl,
        [styles$6.buttonSelected]: isSelected
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
};

var styles$5 = {"spinner":"rpv_fd7f1e65","spinnerAnimation":"rpv_77b97e9f","spinner-animation":"rpv_2980221c"};

const Spinner = ({ size = "4rem", testId }) => {
  const [visible, setVisible] = React__namespace.useState(false);
  const attrs = testId ? { "data-testid": testId } : {};
  const handleVisibilityChanged = (params) => {
    setVisible(params.isVisible);
  };
  const containerRef = useIntersectionObserver({
    onVisibilityChanged: handleVisibilityChanged
  });
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ...attrs,
      className: classNames({
        [styles$5.spinner]: true,
        [styles$5.spinnerAnimation]: visible
      }),
      ref: containerRef,
      style: { height: size, width: size }
    }
  );
};

const defaultVendor = {
  ExitFullScreen: "exitFullscreen",
  FullScreenChange: "fullscreenchange",
  FullScreenElement: "fullscreenElement",
  FullScreenEnabled: "fullscreenEnabled",
  RequestFullScreen: "requestFullscreen"
};
const webkitVendor = {
  ExitFullScreen: "webkitExitFullscreen",
  FullScreenChange: "webkitfullscreenchange",
  FullScreenElement: "webkitFullscreenElement",
  FullScreenEnabled: "webkitFullscreenEnabled",
  RequestFullScreen: "webkitRequestFullscreen"
};
const msVendor = {
  ExitFullScreen: "msExitFullscreen",
  FullScreenChange: "msFullscreenChange",
  FullScreenElement: "msFullscreenElement",
  FullScreenEnabled: "msFullscreenEnabled",
  RequestFullScreen: "msRequestFullscreen"
};
const isBrowser = typeof window !== "undefined";
const vendor = isBrowser ? 3 /* FullScreenEnabled */ in document && defaultVendor || webkitVendor.FullScreenEnabled in document && webkitVendor || msVendor.FullScreenEnabled in document && msVendor || defaultVendor : defaultVendor;
const isFullScreenEnabled = () => isBrowser && vendor.FullScreenEnabled in document && document[vendor.FullScreenEnabled] === true;

var core = {
	askingPassword: {
		requirePasswordToOpen: "This document requires a password to open",
		submit: "Submit"
	},
	wrongPassword: {
		tryAgain: "The password is wrong. Please try again"
	},
	pageLabel: "Page {{pageIndex}}"
};
var enUs = {
	core: core
};

const DefaultLocalization = enUs;
const LocalizationContext = React__namespace.createContext({
  l10n: DefaultLocalization,
  setL10n: () => {
  }
});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var ToggleStatus = /* @__PURE__ */ ((ToggleStatus2) => {
  ToggleStatus2["Close"] = "Close";
  ToggleStatus2["Open"] = "Open";
  ToggleStatus2["Toggle"] = "Toggle";
  return ToggleStatus2;
})(ToggleStatus || {});

const useToggle = (isOpened) => {
  const [opened, setOpened] = React__namespace.useState(isOpened);
  const toggle = (status) => {
    switch (status) {
      case ToggleStatus.Close:
        setOpened(false);
        break;
      case ToggleStatus.Open:
        setOpened(true);
        break;
      case ToggleStatus.Toggle:
      default:
        setOpened((isOpened2) => !isOpened2);
        break;
    }
  };
  return { opened, toggle };
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
let id = 0;
const uniqueId = () => id++;

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const mergeRefs = (refs) => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
};

const StackContext = React__namespace.createContext({
  currentIndex: 0,
  decreaseNumStacks: () => {
  },
  increaseNumStacks: () => {
  },
  numStacks: 0
});

const useClickOutsideStack = (closeOnClickOutside, onClickOutside) => {
  const stackContext = React__namespace.useContext(StackContext);
  const [ele, setEle] = React__namespace.useState();
  const ref = React__namespace.useCallback((ele2) => {
    setEle(ele2);
  }, []);
  const handleClickDocument = React__namespace.useCallback(
    (e) => {
      if (!ele || stackContext.currentIndex !== stackContext.numStacks) {
        return;
      }
      const clickedTarget = e.target;
      if (clickedTarget instanceof Element && clickedTarget.shadowRoot) {
        const paths = e.composedPath();
        if (paths.length > 0 && !ele.contains(paths[0])) {
          onClickOutside();
        }
      } else if (!ele.contains(clickedTarget)) {
        onClickOutside();
      }
    },
    [ele, stackContext.currentIndex, stackContext.numStacks]
  );
  React__namespace.useEffect(() => {
    if (!closeOnClickOutside || !ele) {
      return;
    }
    const eventOptions = {
      capture: true
    };
    document.addEventListener("click", handleClickDocument, eventOptions);
    return () => {
      document.removeEventListener("click", handleClickDocument, eventOptions);
    };
  }, [ele, stackContext.currentIndex, stackContext.numStacks]);
  return [ref];
};

const useEscapeStack = (handler) => {
  const stackContext = React__namespace.useContext(StackContext);
  const keyUpHandler = React__namespace.useCallback(
    (e) => {
      if (e.key === "Escape" && stackContext.currentIndex === stackContext.numStacks) {
        handler();
      }
    },
    [stackContext.currentIndex, stackContext.numStacks]
  );
  React__namespace.useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [stackContext.currentIndex, stackContext.numStacks]);
};

const Stack = ({ children }) => {
  const { currentIndex, increaseNumStacks, decreaseNumStacks, numStacks } = React__namespace.useContext(StackContext);
  React__namespace.useEffect(() => {
    increaseNumStacks();
    return () => {
      decreaseNumStacks();
    };
  }, []);
  return ReactDOM__namespace.createPortal(
    /* @__PURE__ */ React__namespace.createElement(
      StackContext.Provider,
      {
        value: {
          currentIndex: currentIndex + 1,
          decreaseNumStacks,
          increaseNumStacks,
          numStacks
        }
      },
      children
    ),
    document.body
  );
};

var styles$4 = {"body":"rpv_33f641c8","bodyArrow":"rpv_19dd1f21","bodyRtl":"rpv_de324b82"};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var Position = /* @__PURE__ */ ((Position2) => {
  Position2["TopLeft"] = "TOP_LEFT";
  Position2["TopCenter"] = "TOP_CENTER";
  Position2["TopRight"] = "TOP_RIGHT";
  Position2["RightTop"] = "RIGHT_TOP";
  Position2["RightCenter"] = "RIGHT_CENTER";
  Position2["RightBottom"] = "RIGHT_BOTTOM";
  Position2["BottomLeft"] = "BOTTOM_LEFT";
  Position2["BottomCenter"] = "BOTTOM_CENTER";
  Position2["BottomRight"] = "BOTTOM_RIGHT";
  Position2["LeftTop"] = "LEFT_TOP";
  Position2["LeftCenter"] = "LEFT_CENTER";
  Position2["LeftBottom"] = "LEFT_BOTTOM";
  return Position2;
})(Position || {});

var styles$3 = {"arrow":"rpv_add41145","arrowTopLeft":"rpv_ee9ba1f7","arrowTopCenter":"rpv_a6e31245","arrowTopRight":"rpv_e52efe2c","arrowRightTop":"rpv_c9e661fe","arrowRightCenter":"rpv_3356ff0c","arrowRightBottom":"rpv_3231cce2","arrowBottomLeft":"rpv_d8db7bf7","arrowBottomCenter":"rpv_946c45","arrowBottomRight":"rpv_42ea642c","arrowLeftTop":"rpv_35de56c9","arrowLeftCenter":"rpv_9f46d261","arrowLeftBottom":"rpv_9e21a037"};

const Arrow = ({ customClassName, position }) => /* @__PURE__ */ React__namespace.createElement(
  "div",
  {
    className: classNames({
      [styles$3.arrow]: true,
      [styles$3.arrowTopLeft]: position === Position.TopLeft,
      [styles$3.arrowTopCenter]: position === Position.TopCenter,
      [styles$3.arrowTopRight]: position === Position.TopRight,
      [styles$3.arrowRightTop]: position === Position.RightTop,
      [styles$3.arrowRightCenter]: position === Position.RightCenter,
      [styles$3.arrowRightBottom]: position === Position.RightBottom,
      [styles$3.arrowBottomLeft]: position === Position.BottomLeft,
      [styles$3.arrowBottomCenter]: position === Position.BottomCenter,
      [styles$3.arrowBottomRight]: position === Position.BottomRight,
      [styles$3.arrowLeftTop]: position === Position.LeftTop,
      [styles$3.arrowLeftCenter]: position === Position.LeftCenter,
      [styles$3.arrowLeftBottom]: position === Position.LeftBottom,
      [`${customClassName}`]: customClassName !== ""
    })
  }
);

const PopoverBody = React__namespace.forwardRef((props, ref) => {
  const { ariaControlsSuffix, children, closeOnClickOutside, position, onClose } = props;
  const innerRef = React__namespace.useRef(null);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const [contentRef] = useClickOutsideStack(closeOnClickOutside, onClose);
  const mergedContentRef = mergeRefs([ref, contentRef]);
  useIsomorphicLayoutEffect(() => {
    const innerContentEle = innerRef.current;
    if (!innerContentEle) {
      return;
    }
    const maxHeight = document.body.clientHeight * 0.75;
    if (innerContentEle.getBoundingClientRect().height >= maxHeight) {
      innerContentEle.style.overflow = "auto";
      innerContentEle.style.maxHeight = `${maxHeight}px`;
    }
  }, []);
  const innerId = `rpv-core__popover-body-inner-${ariaControlsSuffix}`;
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "aria-describedby": innerId,
      className: classNames({
        [styles$4.body]: true,
        [styles$4.bodyRtl]: isRtl
      }),
      id: `rpv-core__popover-body-${ariaControlsSuffix}`,
      ref: mergedContentRef,
      role: "dialog",
      tabIndex: -1
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$4.bodyArrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { id: innerId, ref: innerRef }, children)
  );
});
PopoverBody.displayName = "PopoverBody";

const useAnimationFrame = (callback, recurring = false, deps) => {
  const callbackRef = React__namespace.useRef(callback);
  const idRef = React__namespace.useRef(-1);
  callbackRef.current = callback;
  const start = React__namespace.useCallback(
    (...args) => {
      cancelAnimationFrame(idRef.current);
      idRef.current = requestAnimationFrame(() => {
        callback(...args);
        if (recurring) {
          start(...args);
        }
      });
    },
    [...deps, recurring]
  );
  const stop = React__namespace.useCallback(() => {
    cancelAnimationFrame(idRef.current);
  }, []);
  React__namespace.useEffect(() => () => stop(), []);
  return [start];
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const clamp = (min, max, value) => Math.max(min, Math.min(value, max));

const AVAILABLE_POSITIONS = [
  // Top side
  Position.TopLeft,
  Position.TopCenter,
  Position.TopRight,
  // Right side
  Position.RightTop,
  Position.RightCenter,
  Position.RightBottom,
  // Bottom side
  Position.BottomLeft,
  Position.BottomCenter,
  Position.BottomRight,
  // Left side
  Position.LeftTop,
  Position.LeftCenter,
  Position.LeftBottom
];
const isIntersection = (a, b) => b.right >= a.left && b.left <= a.right && b.top <= a.bottom && b.bottom >= a.top;
const union = (a, b) => {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  return new DOMRect(left, top, right - left, bottom - top);
};
const calculateArea = (rect) => rect.width * rect.height;
const distance = (a, b) => Math.abs(a.left - b.left) + Math.abs(a.top - b.top);
const calculateOffset = (referenceRect, targetRect, position, offset) => {
  let top = 0;
  let left = 0;
  switch (position) {
    case Position.TopLeft:
      top = referenceRect.top - targetRect.height - offset;
      left = referenceRect.left;
      break;
    case Position.TopCenter:
      top = referenceRect.top - targetRect.height - offset;
      left = referenceRect.left + referenceRect.width / 2 - targetRect.width / 2;
      break;
    case Position.TopRight:
      top = referenceRect.top - targetRect.height - offset;
      left = referenceRect.left + referenceRect.width - targetRect.width;
      break;
    case Position.RightTop:
      top = referenceRect.top;
      left = referenceRect.left + referenceRect.width + offset;
      break;
    case Position.RightCenter:
      top = referenceRect.top + referenceRect.height / 2 - targetRect.height / 2;
      left = referenceRect.left + referenceRect.width + offset;
      break;
    case Position.RightBottom:
      top = referenceRect.top + referenceRect.height - targetRect.height;
      left = referenceRect.left + referenceRect.width + offset;
      break;
    case Position.BottomLeft:
      top = referenceRect.top + referenceRect.height + offset;
      left = referenceRect.left;
      break;
    case Position.BottomCenter:
      top = referenceRect.top + referenceRect.height + offset;
      left = referenceRect.left + referenceRect.width / 2 - targetRect.width / 2;
      break;
    case Position.BottomRight:
      top = referenceRect.top + referenceRect.height + offset;
      left = referenceRect.left + referenceRect.width - targetRect.width;
      break;
    case Position.LeftTop:
      top = referenceRect.top;
      left = referenceRect.left - targetRect.width - offset;
      break;
    case Position.LeftCenter:
      top = referenceRect.top + referenceRect.height / 2 - targetRect.height / 2;
      left = referenceRect.left - targetRect.width - offset;
      break;
    case Position.LeftBottom:
      top = referenceRect.top + referenceRect.height - targetRect.height;
      left = referenceRect.left - targetRect.width - offset;
      break;
  }
  return { top, left };
};
const determineBestPosition = (referenceRect, targetRect, containerRect, position, offset) => {
  if (!isIntersection(referenceRect, containerRect)) {
    return {
      position
    };
  }
  const desiredOffset = calculateOffset(referenceRect, targetRect, position, offset);
  const availableOffsets = AVAILABLE_POSITIONS.map((pos) => ({
    offset: calculateOffset(referenceRect, targetRect, pos, offset),
    position: pos
  }));
  const notOverflowOffsets = availableOffsets.filter(({ offset: offset2 }) => {
    const rect2 = new DOMRect(offset2.left, offset2.top, targetRect.width, targetRect.height);
    return isIntersection(rect2, containerRect);
  });
  const sortedDistances = notOverflowOffsets.sort((a, b) => {
    const x = new DOMRect(b.offset.left, b.offset.top, targetRect.width, targetRect.height);
    const y = new DOMRect(a.offset.left, a.offset.top, targetRect.width, targetRect.height);
    return calculateArea(union(x, containerRect)) - calculateArea(union(y, containerRect)) || distance(a.offset, desiredOffset) - distance(b.offset, desiredOffset);
  });
  if (sortedDistances.length === 0) {
    return {
      position
    };
  }
  const bestPlacement = sortedDistances[0];
  const shortestDistanceRect = new DOMRect(
    bestPlacement.offset.left,
    bestPlacement.offset.top,
    targetRect.width,
    targetRect.height
  );
  const rect = new DOMRect(
    Math.round(
      clamp(shortestDistanceRect.left, containerRect.left, containerRect.right - shortestDistanceRect.width)
    ),
    Math.round(
      clamp(shortestDistanceRect.top, containerRect.top, containerRect.bottom - shortestDistanceRect.height)
    ),
    shortestDistanceRect.width,
    shortestDistanceRect.height
  );
  return {
    position: bestPlacement.position,
    rect
  };
};

const areRectsEqual = (a, b) => ["top", "left", "width", "height"].every((key) => a[key] === b[key]);
const Portal = ({ children, offset = 0, position, referenceRef }) => {
  const EMPTY_DOM_RECT = new DOMRect();
  const [ele, setEle] = React__namespace.useState();
  const [updatedPosition, setUpdatedPosition] = React__namespace.useState(position);
  const targetRef = React__namespace.useCallback((ele2) => {
    setEle(ele2);
  }, []);
  const prevBoundingRectsRef = React__namespace.useRef([]);
  const [start] = useAnimationFrame(
    () => {
      if (!ele || !referenceRef.current) {
        return;
      }
      const referenceRect = referenceRef.current.getBoundingClientRect();
      const targetRect = ele.getBoundingClientRect();
      const containerRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
      const rects = [referenceRect, targetRect, containerRect];
      if (rects.some((rect, i) => !areRectsEqual(rect, prevBoundingRectsRef.current[i] || EMPTY_DOM_RECT))) {
        prevBoundingRectsRef.current = rects;
        const updatedPlacement = determineBestPosition(
          referenceRect,
          targetRect,
          containerRect,
          position,
          offset
        );
        if (updatedPlacement.rect) {
          ele.style.transform = `translate(${updatedPlacement.rect.left}px, ${updatedPlacement.rect.top}px)`;
          setUpdatedPosition(updatedPlacement.position);
        }
      }
    },
    true,
    [ele]
  );
  React__namespace.useEffect(() => {
    if (ele) {
      start();
    }
  }, [ele]);
  return /* @__PURE__ */ React__namespace.createElement(Stack, null, children({ position: updatedPosition, ref: targetRef }));
};

var styles$2 = {"body":"rpv_68737a2a","bodyRtl":"rpv_16369fe0","arrow":"rpv_a5ef4481","content":"rpv_4ba7c6f1"};

const TooltipBody = React__namespace.forwardRef((props, ref) => {
  const { ariaControlsSuffix, children, closeOnEscape, position, onClose } = props;
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  useEscapeStack(() => {
    if (closeOnEscape) {
      onClose();
    }
  });
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles$2.body]: true,
        [styles$2.bodyRtl]: isRtl
      }),
      id: `rpv-core__tooltip-body-${ariaControlsSuffix}`,
      ref,
      role: "tooltip"
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$2.arrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.content }, children)
  );
});
TooltipBody.displayName = "TooltipBody";

const Tooltip = ({ ariaControlsSuffix, content, position, target }) => {
  const { opened, toggle } = useToggle(false);
  const targetRef = React__namespace.useRef(null);
  const contentRef = React__namespace.useRef();
  const controlsSuffix = React__namespace.useMemo(() => ariaControlsSuffix || `${uniqueId()}`, []);
  const open = () => {
    toggle(ToggleStatus.Open);
  };
  const close = () => {
    toggle(ToggleStatus.Close);
  };
  const onBlur = (e) => {
    const shouldHideTooltip = e.relatedTarget instanceof HTMLElement && e.currentTarget.parentElement && e.currentTarget.parentElement.contains(e.relatedTarget);
    if (shouldHideTooltip) {
      if (contentRef.current) {
        contentRef.current.style.display = "none";
      }
    } else {
      close();
    }
  };
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref: targetRef,
      "aria-describedby": `rpv-core__tooltip-body-${controlsSuffix}`,
      onBlur,
      onFocus: open,
      onMouseEnter: open,
      onMouseLeave: close
    },
    target
  ), opened && /* @__PURE__ */ React__namespace.createElement(Portal, { offset: 8, position, referenceRef: targetRef }, ({ position: updatedPosition, ref }) => /* @__PURE__ */ React__namespace.createElement(
    TooltipBody,
    {
      ariaControlsSuffix: controlsSuffix,
      closeOnEscape: true,
      position: updatedPosition,
      ref,
      onClose: close
    },
    content()
  )));
};

React__namespace.createContext({});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var Breakpoint = /* @__PURE__ */ ((Breakpoint2) => {
  Breakpoint2["ExtraSmall"] = "ExtraSmall";
  Breakpoint2["Small"] = "Small";
  Breakpoint2["Medium"] = "Medium";
  Breakpoint2["Large"] = "Large";
  Breakpoint2["ExtraLarge"] = "ExtraLarge";
  return Breakpoint2;
})(Breakpoint || {});

React__namespace.createContext(Breakpoint.ExtraSmall);

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
function createStore(initialState) {
  let state = initialState;
  const listeners = {};
  const update = (key, data) => {
    state = {
      ...state,
      [key]: data
    };
    (listeners[key] || []).forEach((handler) => handler(state[key]));
  };
  const get = (key) => state[key];
  return {
    subscribe(key, handler) {
      listeners[key] = (listeners[key] || []).concat(handler);
    },
    unsubscribe(key, handler) {
      listeners[key] = (listeners[key] || []).filter((f) => f !== handler);
    },
    update(key, data) {
      update(key, data);
    },
    updateCurrentValue(key, updater) {
      const currentValue = get(key);
      if (currentValue !== undefined) {
        update(key, updater(currentValue));
      }
    },
    get(key) {
      return get(key);
    }
  };
}

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var FullScreenMode = /* @__PURE__ */ ((FullScreenMode2) => {
  FullScreenMode2["Normal"] = "Normal";
  FullScreenMode2["Entering"] = "Entering";
  FullScreenMode2["Entered"] = "Entered";
  FullScreenMode2["Exitting"] = "Exitting";
  FullScreenMode2["Exited"] = "Exited";
  return FullScreenMode2;
})(FullScreenMode || {});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const isMac = () => typeof window !== "undefined" ? /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) : false;

const ExitFullScreenIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.5 23.499L11.5 14.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M7.5 18.499L11.5 14.499 15.5 18.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.5 1.499L11.5 10.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M7.5 6.499L11.5 10.499 15.5 6.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M20.5 12.499L1.5 12.499" }));

const FullScreenIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M0.5 12L23.5 12" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.5 1L11.5 23" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M8.5 4L11.5 1 14.5 4" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M20.5 9L23.5 12 20.5 15" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M3.5 15L0.5 12 3.5 9" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M14.5 20L11.5 23 8.5 20" }));

const EnterFullScreenButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.fullScreen ? l10n.fullScreen.enterFullScreen : "Full screen";
  const ariaKeyShortcuts = enableShortcuts ? isMac() ? "Meta+Ctrl+F" : "F11" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "full-screen-enter",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          isDisabled: !isFullScreenEnabled(),
          testId: "full-screen__enter-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(FullScreenIcon, null)
      ),
      content: () => label
    }
  );
};

const ExitFullScreenButtonWithTooltip = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const exitFullScreenLabel = l10n && l10n.fullScreen ? l10n.fullScreen.exitFullScreen : "Exit full screen";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "full-screen-exit",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaKeyShortcuts: "Esc",
          ariaLabel: exitFullScreenLabel,
          testId: "full-screen__exit-button-with-tooltip",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(ExitFullScreenIcon, null)
      ),
      content: () => exitFullScreenLabel
    }
  );
};

const useEnterFullScreen = (getFullScreenTarget, store) => {
  const [fullScreenMode, setFullScreenMode] = React__namespace.useState(store.get("fullScreenMode"));
  const handleFullScreenMode = React__namespace.useCallback((fullScreenMode2) => {
    setFullScreenMode(fullScreenMode2);
  }, []);
  const enterFullScreen = () => {
    const pagesContainer = store.get("getPagesContainer");
    if (!pagesContainer) {
      return;
    }
    const target = getFullScreenTarget(pagesContainer());
    store.get("enterFullScreenMode")(target);
  };
  const exitFullScreen = () => {
    store.get("exitFullScreenMode")();
  };
  React__namespace.useEffect(() => {
    store.subscribe("fullScreenMode", handleFullScreenMode);
    return () => {
      store.unsubscribe("fullScreenMode", handleFullScreenMode);
    };
  }, []);
  return {
    enterFullScreen,
    exitFullScreen,
    isFullScreen: fullScreenMode === FullScreenMode.Entering || fullScreenMode === FullScreenMode.Entered
  };
};

const EnterFullScreen = ({ children, enableShortcuts, getFullScreenTarget, store }) => {
  const { enterFullScreen, exitFullScreen, isFullScreen } = useEnterFullScreen(getFullScreenTarget, store);
  const defaultChildren = (props) => isFullScreen ? /* @__PURE__ */ React__namespace.createElement(ExitFullScreenButtonWithTooltip, { onClick: props.onClick }) : /* @__PURE__ */ React__namespace.createElement(EnterFullScreenButton, { enableShortcuts, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    onClick: isFullScreen ? exitFullScreen : enterFullScreen
  });
};

const EnterFullScreenMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.fullScreen ? l10n.fullScreen.enterFullScreen : "Full screen";
  return /* @__PURE__ */ React__namespace.createElement(
    MenuItem,
    {
      icon: /* @__PURE__ */ React__namespace.createElement(FullScreenIcon, null),
      isDisabled: !isFullScreenEnabled(),
      testId: "full-screen__enter-menu",
      onClick
    },
    label
  );
};

var styles$1 = {"button":"rpv_603aaf14","buttonLtr":"rpv_4d1d3436","buttonRtl":"rpv_4d1d4ab6"};

const ExitFullScreenButton = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const exitFullScreenLabel = l10n && l10n.fullScreen ? l10n.fullScreen.exitFullScreen : "Exit full screen";
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles$1.button]: true,
        [styles$1.buttonLtr]: !isRtl,
        [styles$1.buttonRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement(
      MinimalButton,
      {
        ariaLabel: exitFullScreenLabel,
        testId: "full-screen__exit-button",
        onClick
      },
      /* @__PURE__ */ React__namespace.createElement(ExitFullScreenIcon, null)
    )
  );
};

const ExitFullScreen = ({ children, getFullScreenTarget, store }) => {
  const { enterFullScreen, exitFullScreen, isFullScreen } = useEnterFullScreen(getFullScreenTarget, store);
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ExitFullScreenButton, { onClick: props.onClick });
  const render = children || defaultChildren;
  return isFullScreen && render({
    onClick: isFullScreen ? exitFullScreen : enterFullScreen
  });
};

var styles = {"overlay":"rpv_8f5c1bd3"};

const FullScreenModeTracker = ({ store, onEnterFullScreen, onExitFullScreen }) => {
  const [fullScreenMode, setFullScreenMode] = React__namespace.useState(store.get("fullScreenMode"));
  const handleFullScreenMode = React__namespace.useCallback((fullScreenMode2) => {
    setFullScreenMode(fullScreenMode2);
  }, []);
  const handleEnteredFullScreen = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      onEnterFullScreen(zoom);
    }
  };
  const handleExitedFullScreen = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      onExitFullScreen(zoom);
    }
  };
  React__namespace.useEffect(() => {
    switch (fullScreenMode) {
      case FullScreenMode.Entered:
        handleEnteredFullScreen();
        break;
      case FullScreenMode.Exited:
        handleExitedFullScreen();
        break;
    }
  }, [fullScreenMode]);
  React__namespace.useEffect(() => {
    store.subscribe("fullScreenMode", handleFullScreenMode);
    return () => {
      store.unsubscribe("fullScreenMode", handleFullScreenMode);
    };
  }, []);
  return fullScreenMode === FullScreenMode.Entering && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.overlay }, /* @__PURE__ */ React__namespace.createElement(Spinner, null));
};

const ShortcutHandler = ({ containerRef, getFullScreenTarget, store }) => {
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const { enterFullScreen } = useEnterFullScreen(getFullScreenTarget, store);
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element || e.shiftKey || e.altKey) {
        return;
      }
      const areShortcutsPressed = isMac() ? e.metaKey && e.ctrlKey && e.key === "f" : e.key === "F11";
      if (!areShortcutsPressed) {
        return;
      }
      if (!document.activeElement || !element.contains(document.activeElement)) {
        return;
      }
      e.preventDefault();
      enterFullScreen();
    },
    [element]
  );
  React__namespace.useEffect(() => {
    if (!element) {
      return;
    }
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [element]);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const fullScreenPlugin = (props) => {
  const defaultFullScreenTarget = (ele) => ele;
  const getFullScreenTarget = props?.getFullScreenTarget || defaultFullScreenTarget;
  const fullScreenPluginProps = React__namespace.useMemo(
    () => Object.assign(
      {},
      { enableShortcuts: true, onEnterFullScreen: () => {
      }, onExitFullScreen: () => {
      } },
      props
    ),
    []
  );
  const store = React__namespace.useMemo(
    () => createStore({
      enterFullScreenMode: () => {
      },
      exitFullScreenMode: () => {
      },
      fullScreenMode: FullScreenMode.Normal,
      zoom: () => {
      }
    }),
    []
  );
  const EnterFullScreenDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(
    EnterFullScreen,
    {
      ...props2,
      enableShortcuts: fullScreenPluginProps.enableShortcuts,
      getFullScreenTarget,
      store
    }
  );
  const EnterFullScreenButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(EnterFullScreenDecorator, null, (renderProps) => /* @__PURE__ */ React__namespace.createElement(EnterFullScreenButton, { enableShortcuts: fullScreenPluginProps.enableShortcuts, ...renderProps }));
  const EnterFullScreenMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(EnterFullScreenDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    EnterFullScreenMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const ExitFullScreenDecorator = () => /* @__PURE__ */ React__namespace.createElement(ExitFullScreen, { getFullScreenTarget, store }, props?.renderExitFullScreenButton);
  const renderViewer = (props2) => {
    const currentSlot = props2.slot;
    if (currentSlot.subSlot) {
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, fullScreenPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(
        ShortcutHandler,
        {
          containerRef: props2.containerRef,
          getFullScreenTarget,
          store
        }
      ), /* @__PURE__ */ React__namespace.createElement(
        FullScreenModeTracker,
        {
          store,
          onEnterFullScreen: fullScreenPluginProps.onEnterFullScreen,
          onExitFullScreen: fullScreenPluginProps.onExitFullScreen
        }
      ), /* @__PURE__ */ React__namespace.createElement(ExitFullScreenDecorator, null), currentSlot.subSlot.children);
    }
    return currentSlot;
  };
  return {
    install: (pluginFunctions) => {
      store.update("enterFullScreenMode", pluginFunctions.enterFullScreenMode);
      store.update("exitFullScreenMode", pluginFunctions.exitFullScreenMode);
      store.update("getPagesContainer", pluginFunctions.getPagesContainer);
      store.update("zoom", pluginFunctions.zoom);
    },
    onViewerStateChange: (viewerState) => {
      store.update("fullScreenMode", viewerState.fullScreenMode);
      return viewerState;
    },
    renderViewer,
    EnterFullScreen: EnterFullScreenDecorator,
    EnterFullScreenButton: EnterFullScreenButtonDecorator,
    EnterFullScreenMenuItem: EnterFullScreenMenuItemDecorator
  };
};

exports.ExitFullScreenIcon = ExitFullScreenIcon;
exports.FullScreenIcon = FullScreenIcon;
exports.fullScreenPlugin = fullScreenPlugin;
