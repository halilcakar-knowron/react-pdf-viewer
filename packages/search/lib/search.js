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

var styles$a = {"button":"rpv_62094e2d","buttonRtl":"rpv_98e1a8fd"};

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

const Button = ({ children, testId, onClick }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = testId ? { "data-testid": testId } : {};
  return /* @__PURE__ */ React__namespace.createElement(
    "button",
    {
      className: classNames({
        [styles$a.button]: true,
        [styles$a.buttonRtl]: isRtl
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
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

var styles$9 = {"icon":"rpv_2a5a054d","iconRtl":"rpv_81d01ddd"};

const Icon = ({ children, ignoreDirection = false, size = 24 }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = !ignoreDirection && direction === TextDirection.RightToLeft;
  const width = `${size || 24}px`;
  return /* @__PURE__ */ React__namespace.createElement(
    "svg",
    {
      "aria-hidden": "true",
      className: classNames({
        [styles$9.icon]: true,
        [styles$9.iconRtl]: isRtl
      }),
      focusable: "false",
      height: width,
      viewBox: "0 0 24 24",
      width
    },
    children
  );
};

var styles$8 = {"button":"rpv_799dde0c","buttonDisabled":"rpv_ec15b0a8","buttonRtl":"rpv_aa3418be","buttonSelected":"rpv_22f568c7"};

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
        [styles$8.button]: true,
        [styles$8.buttonDisabled]: isDisabled,
        [styles$8.buttonRtl]: isRtl,
        [styles$8.buttonSelected]: isSelected
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
};

var styles$7 = {"spinner":"rpv_fd7f1e65","spinnerAnimation":"rpv_77b97e9f","spinner-animation":"rpv_2980221c"};

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
        [styles$7.spinner]: true,
        [styles$7.spinnerAnimation]: visible
      }),
      ref: containerRef,
      style: { height: size, width: size }
    }
  );
};

var styles$6 = {"textbox":"rpv_5acb480f","textboxRtl":"rpv_ce17cbdb"};

const TextBox = ({
  ariaLabel = "",
  autoFocus = false,
  placeholder = "",
  testId,
  type = "text",
  value = "",
  onChange,
  onKeyDown = () => {
  }
}) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const textboxRef = React__namespace.useRef(null);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = {
    ref: textboxRef,
    "data-testid": "",
    "aria-label": ariaLabel,
    className: classNames({
      [styles$6.textbox]: true,
      [styles$6.textboxRtl]: isRtl
    }),
    placeholder,
    value,
    onChange: (e) => onChange(e.target.value),
    onKeyDown
  };
  if (testId) {
    attrs["data-testid"] = testId;
  }
  useIsomorphicLayoutEffect(() => {
    if (autoFocus) {
      const textboxEle = textboxRef.current;
      if (textboxEle) {
        const x = window.scrollX;
        const y = window.scrollY;
        textboxEle.focus();
        window.scrollTo(x, y);
      }
    }
  }, []);
  return type === "text" ? /* @__PURE__ */ React__namespace.createElement("input", { type: "text", ...attrs }) : /* @__PURE__ */ React__namespace.createElement("input", { type: "password", ...attrs });
};

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

var styles$5 = {"body":"rpv_33f641c8","bodyArrow":"rpv_19dd1f21","bodyRtl":"rpv_de324b82"};

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

var styles$4 = {"arrow":"rpv_add41145","arrowTopLeft":"rpv_ee9ba1f7","arrowTopCenter":"rpv_a6e31245","arrowTopRight":"rpv_e52efe2c","arrowRightTop":"rpv_c9e661fe","arrowRightCenter":"rpv_3356ff0c","arrowRightBottom":"rpv_3231cce2","arrowBottomLeft":"rpv_d8db7bf7","arrowBottomCenter":"rpv_946c45","arrowBottomRight":"rpv_42ea642c","arrowLeftTop":"rpv_35de56c9","arrowLeftCenter":"rpv_9f46d261","arrowLeftBottom":"rpv_9e21a037"};

const Arrow = ({ customClassName, position }) => /* @__PURE__ */ React__namespace.createElement(
  "div",
  {
    className: classNames({
      [styles$4.arrow]: true,
      [styles$4.arrowTopLeft]: position === Position.TopLeft,
      [styles$4.arrowTopCenter]: position === Position.TopCenter,
      [styles$4.arrowTopRight]: position === Position.TopRight,
      [styles$4.arrowRightTop]: position === Position.RightTop,
      [styles$4.arrowRightCenter]: position === Position.RightCenter,
      [styles$4.arrowRightBottom]: position === Position.RightBottom,
      [styles$4.arrowBottomLeft]: position === Position.BottomLeft,
      [styles$4.arrowBottomCenter]: position === Position.BottomCenter,
      [styles$4.arrowBottomRight]: position === Position.BottomRight,
      [styles$4.arrowLeftTop]: position === Position.LeftTop,
      [styles$4.arrowLeftCenter]: position === Position.LeftCenter,
      [styles$4.arrowLeftBottom]: position === Position.LeftBottom,
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
        [styles$5.body]: true,
        [styles$5.bodyRtl]: isRtl
      }),
      id: `rpv-core__popover-body-${ariaControlsSuffix}`,
      ref: mergedContentRef,
      role: "dialog",
      tabIndex: -1
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$5.bodyArrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { id: innerId, ref: innerRef }, children)
  );
});
PopoverBody.displayName = "PopoverBody";

var styles$3 = {"overlay":"rpv_9a8b66e"};

const PopoverOverlay = ({ children, closeOnEscape, onClose }) => {
  const containerRef = React__namespace.useRef(null);
  useEscapeStack(() => {
    if (closeOnEscape) {
      onClose();
    }
  });
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.overlay, ref: containerRef }, children);
};

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
const calculateOffset$1 = (referenceRect, targetRect, position, offset) => {
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
  const desiredOffset = calculateOffset$1(referenceRect, targetRect, position, offset);
  const availableOffsets = AVAILABLE_POSITIONS.map((pos) => ({
    offset: calculateOffset$1(referenceRect, targetRect, pos, offset),
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

const Popover = ({
  ariaHasPopup = "dialog",
  ariaControlsSuffix,
  closeOnClickOutside,
  closeOnEscape,
  content,
  lockScroll = true,
  position,
  target
}) => {
  const { opened, toggle } = useToggle(false);
  const targetRef = React__namespace.useRef(null);
  const controlsSuffix = React__namespace.useMemo(() => ariaControlsSuffix || `${uniqueId()}`, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref: targetRef,
      "aria-expanded": opened ? "true" : "false",
      "aria-haspopup": ariaHasPopup,
      "aria-controls": `rpv-core__popver-body-${controlsSuffix}`
    },
    target(toggle, opened)
  ), opened && /* @__PURE__ */ React__namespace.createElement(Portal, { offset: 8, position, referenceRef: targetRef }, ({ position: updatedPosition, ref }) => {
    const popoverBody = /* @__PURE__ */ React__namespace.createElement(
      PopoverBody,
      {
        ariaControlsSuffix: controlsSuffix,
        closeOnClickOutside,
        position: updatedPosition,
        ref,
        onClose: toggle
      },
      content(toggle)
    );
    return lockScroll ? /* @__PURE__ */ React__namespace.createElement(PopoverOverlay, { closeOnEscape, onClose: toggle }, popoverBody) : popoverBody;
  }));
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
var LayerRenderStatus = /* @__PURE__ */ ((LayerRenderStatus2) => {
  LayerRenderStatus2[LayerRenderStatus2["PreRender"] = 0] = "PreRender";
  LayerRenderStatus2[LayerRenderStatus2["DidRender"] = 1] = "DidRender";
  return LayerRenderStatus2;
})(LayerRenderStatus || {});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const isMac = () => typeof window !== "undefined" ? /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) : false;

const pageOutlinesMap = /* @__PURE__ */ new Map();
const pagesMap = /* @__PURE__ */ new Map();
const generateRefKey = (doc, outline) => `${doc.loadingTask.docId}___${outline.num}R${outline.gen === 0 ? "" : outline.gen}`;
const cacheOutlineRef = (doc, outline, pageIndex) => {
  pageOutlinesMap.set(generateRefKey(doc, outline), pageIndex);
};
const getPage = (doc, pageIndex) => {
  if (!doc) {
    return Promise.reject("The document is not loaded yet");
  }
  const pageKey = `${doc.loadingTask.docId}___${pageIndex}`;
  const page = pagesMap.get(pageKey);
  if (page) {
    return Promise.resolve(page);
  }
  return new Promise((resolve, _) => {
    doc.getPage(pageIndex + 1).then((page2) => {
      pagesMap.set(pageKey, page2);
      if (page2.ref) {
        cacheOutlineRef(doc, page2.ref, pageIndex);
      }
      resolve(page2);
    });
  });
};

const NextIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M0.541,5.627L11.666,18.2c0.183,0.207,0.499,0.226,0.706,0.043c0.015-0.014,0.03-0.028,0.043-0.043
            L23.541,5.627`
  }
));

const PreviousIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M23.535,18.373L12.409,5.8c-0.183-0.207-0.499-0.226-0.706-0.043C11.688,5.77,11.674,5.785,11.66,5.8
            L0.535,18.373`
  }
));

const SearchIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,0.5c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.5,10.5,0.5z
            M23.5,23.5
            l-5.929-5.929`
  }
));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getCssProperties = (area) => {
  return {
    left: `${area.left}%`,
    top: `${area.top}%`,
    height: `${area.height}%`,
    width: `${area.width}%`
  };
};

var styles$1 = {"highlights":"rpv_5852b0f8","highlight":"rpv_a802aadb","highlightCurrent":"rpv_bd8fce1e"};

const HightlightItem = ({ index, area, onHighlightKeyword }) => {
  const containerRef = React__namespace.useRef(null);
  useIsomorphicLayoutEffect(() => {
    const highlightEle = containerRef.current;
    if (onHighlightKeyword && highlightEle) {
      onHighlightKeyword({
        highlightEle,
        keyword: area.keyword
      });
    }
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: styles$1.highlight,
      "data-index": index,
      ref: containerRef,
      style: getCssProperties(area),
      title: area.keywordStr.trim()
    }
  );
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const calculateOffset = (children, parent) => {
  let top = children.offsetTop;
  let left = children.offsetLeft;
  let p = children.parentElement;
  while (p && p !== parent) {
    top += p.offsetTop;
    left += p.offsetLeft;
    p = p.parentElement;
  }
  return {
    left,
    top
  };
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const EMPTY_KEYWORD_REGEXP = {
  keyword: "",
  regExp: new RegExp(" "),
  wholeWords: false
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const removeNode = (ele) => {
  const parent = ele.parentNode;
  if (parent) {
    parent.removeChild(ele);
  }
};
const replaceNode = (replacementNode, node) => {
  removeNode(replacementNode);
  const parent = node.parentNode;
  if (parent) {
    parent.insertBefore(replacementNode, node);
  }
  removeNode(node);
};
const unwrap = (ele) => {
  const parent = ele.parentNode;
  if (!parent) {
    return;
  }
  const range = document.createRange();
  range.selectNodeContents(ele);
  replaceNode(range.extractContents(), ele);
  parent.normalize();
};

const sortHighlightPosition = (a, b) => {
  if (a.top < b.top) {
    return -1;
  }
  if (a.top > b.top) {
    return 1;
  }
  if (a.left < b.left) {
    return -1;
  }
  if (a.left > b.left) {
    return 1;
  }
  return 0;
};
const Highlights = ({ numPages, pageIndex, renderHighlights, store, onHighlightKeyword }) => {
  const containerRef = React__namespace.useRef(null);
  const defaultRenderHighlights = React__namespace.useCallback(
    (renderProps) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, renderProps.highlightAreas.map((area, index) => /* @__PURE__ */ React__namespace.createElement(HightlightItem, { index, key: index, area, onHighlightKeyword }))),
    []
  );
  const renderHighlightElements = renderHighlights || defaultRenderHighlights;
  const [matchPosition, setMatchPosition] = React__namespace.useState(store.get("matchPosition"));
  const [keywordRegexp, setKeywordRegexp] = React__namespace.useState(
    store.get("keyword") || [EMPTY_KEYWORD_REGEXP]
  );
  const [renderStatus, setRenderStatus] = React__namespace.useState({
    pageIndex,
    scale: 1,
    status: LayerRenderStatus.PreRender
  });
  const currentMatchRef = React__namespace.useRef(null);
  const characterIndexesRef = React__namespace.useRef([]);
  const [highlightAreas, setHighlightAreas] = React__namespace.useState([]);
  const defaultTargetPageFilter = () => true;
  const targetPageFilter = React__namespace.useCallback(
    () => store.get("targetPageFilter") || defaultTargetPageFilter,
    [store.get("targetPageFilter")]
  );
  const highlight = (keywordStr, keyword, textLayerEle, span, charIndexSpan) => {
    const range = document.createRange();
    const firstChild = span.firstChild;
    if (!firstChild || firstChild.nodeType !== Node.TEXT_NODE) {
      return null;
    }
    const length = firstChild.textContent.length;
    const startOffset = charIndexSpan[0].charIndexInSpan;
    const endOffset = charIndexSpan.length === 1 ? startOffset : charIndexSpan[charIndexSpan.length - 1].charIndexInSpan;
    if (startOffset > length || endOffset + 1 > length) {
      return null;
    }
    range.setStart(firstChild, startOffset);
    range.setEnd(firstChild, endOffset + 1);
    const wrapper = document.createElement("span");
    range.surroundContents(wrapper);
    const wrapperRect = wrapper.getBoundingClientRect();
    const textLayerRect = textLayerEle.getBoundingClientRect();
    const pageHeight = textLayerRect.height;
    const pageWidth = textLayerRect.width;
    const left = 100 * (wrapperRect.left - textLayerRect.left) / pageWidth;
    const top = 100 * (wrapperRect.top - textLayerRect.top) / pageHeight;
    const height = 100 * wrapperRect.height / pageHeight;
    const width = 100 * wrapperRect.width / pageWidth;
    unwrap(wrapper);
    return {
      keyword,
      keywordStr,
      numPages,
      pageIndex,
      left,
      top,
      height,
      width,
      pageHeight,
      pageWidth
    };
  };
  const highlightAll = (textLayerEle) => {
    const charIndexes = characterIndexesRef.current;
    if (charIndexes.length === 0) {
      return [];
    }
    const highlightPos = [];
    const spans = [].slice.call(textLayerEle.querySelectorAll('[data-text="true"]'));
    const fullText = charIndexes.map((item) => item.char).join("");
    keywordRegexp.forEach((keyword) => {
      const keywordStr = keyword.keyword;
      if (!keywordStr.trim()) {
        return;
      }
      const cloneKeyword = keyword.regExp.flags.indexOf("g") === -1 ? new RegExp(keyword.regExp, `${keyword.regExp.flags}g`) : keyword.regExp;
      let match;
      const matches = [];
      while ((match = cloneKeyword.exec(fullText)) !== null) {
        matches.push({
          keyword: cloneKeyword,
          startIndex: match.index,
          endIndex: cloneKeyword.lastIndex
        });
      }
      matches.map((item) => ({
        keyword: item.keyword,
        indexes: charIndexes.slice(item.startIndex, item.endIndex)
      })).forEach((item) => {
        const spanIndexes = item.indexes.reduce(
          (acc, item2) => {
            acc[item2.spanIndex] = (acc[item2.spanIndex] || []).concat([item2]);
            return acc;
          },
          {}
        );
        Object.values(spanIndexes).forEach((charIndexSpan) => {
          if (charIndexSpan.length !== 1 || charIndexSpan[0].char.trim() !== "") {
            const normalizedCharSpan = keyword.wholeWords ? charIndexSpan.slice(1, -1) : charIndexSpan;
            const hightlighPosition = highlight(
              keywordStr,
              item.keyword,
              textLayerEle,
              spans[normalizedCharSpan[0].spanIndex],
              normalizedCharSpan
            );
            if (hightlighPosition) {
              highlightPos.push(hightlighPosition);
            }
          }
        });
      });
    });
    return highlightPos.sort(sortHighlightPosition);
  };
  const handleKeywordChanged = (keyword) => {
    if (keyword && keyword.length > 0) {
      setKeywordRegexp(keyword);
    }
  };
  const handleMatchPositionChanged = (currentPosition) => setMatchPosition(currentPosition);
  const handleRenderStatusChanged = (status) => {
    if (!status.has(pageIndex)) {
      return;
    }
    const currentStatus = status.get(pageIndex);
    if (currentStatus) {
      setRenderStatus({
        ele: currentStatus.ele,
        pageIndex,
        scale: currentStatus.scale,
        status: currentStatus.status
      });
    }
  };
  const isEmptyKeyword = () => keywordRegexp.length === 0 || keywordRegexp.length === 1 && keywordRegexp[0].keyword.trim() === "";
  React__namespace.useEffect(() => {
    const textLayerEle = renderStatus.ele;
    if (isEmptyKeyword() || renderStatus.status !== LayerRenderStatus.DidRender || characterIndexesRef.current.length || !textLayerEle) {
      return;
    }
    const spans = [].slice.call(textLayerEle.querySelectorAll('[data-text="true"]'));
    const charIndexes = spans.map((span) => span.textContent).reduce(
      (prev, curr, index) => prev.concat(
        curr.split("").map((c, i) => ({
          char: c,
          charIndexInSpan: i,
          spanIndex: index
        }))
      ),
      [
        {
          char: "",
          charIndexInSpan: 0,
          spanIndex: 0
        }
      ]
    ).slice(1);
    characterIndexesRef.current = charIndexes;
  }, [keywordRegexp, renderStatus.status]);
  React__namespace.useEffect(() => {
    if (isEmptyKeyword() || !renderStatus.ele || renderStatus.status !== LayerRenderStatus.DidRender || !targetPageFilter()({ pageIndex, numPages })) {
      return;
    }
    const textLayerEle = renderStatus.ele;
    const highlightPos = highlightAll(textLayerEle);
    setHighlightAreas(highlightPos);
  }, [keywordRegexp, matchPosition, renderStatus.status, characterIndexesRef.current]);
  React__namespace.useEffect(() => {
    if (isEmptyKeyword() && renderStatus.ele && renderStatus.status === LayerRenderStatus.DidRender) {
      setHighlightAreas([]);
    }
  }, [keywordRegexp, renderStatus.status]);
  React__namespace.useEffect(() => {
    if (highlightAreas.length === 0) {
      return;
    }
    const container = containerRef.current;
    if (matchPosition.pageIndex !== pageIndex || !container || renderStatus.status !== LayerRenderStatus.DidRender) {
      return;
    }
    const highlightEle = container.querySelector(`.${styles$1.highlight}[data-index="${matchPosition.matchIndex}"]`);
    if (!highlightEle) {
      return;
    }
    const { left, top } = calculateOffset(highlightEle, container);
    const jump = store.get("jumpToDestination");
    if (jump) {
      jump({
        pageIndex,
        bottomOffset: (container.getBoundingClientRect().height - top) / renderStatus.scale,
        leftOffset: left / renderStatus.scale,
        scaleTo: renderStatus.scale
      });
      if (currentMatchRef.current) {
        currentMatchRef.current.classList.remove(styles$1.highlightCurrent);
      }
      currentMatchRef.current = highlightEle;
      highlightEle.classList.add(styles$1.highlightCurrent);
    }
  }, [highlightAreas, matchPosition]);
  React__namespace.useEffect(() => {
    store.subscribe("keyword", handleKeywordChanged);
    store.subscribe("matchPosition", handleMatchPositionChanged);
    store.subscribe("renderStatus", handleRenderStatusChanged);
    return () => {
      store.unsubscribe("keyword", handleKeywordChanged);
      store.unsubscribe("matchPosition", handleMatchPositionChanged);
      store.unsubscribe("renderStatus", handleRenderStatusChanged);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.highlights, "data-testid": `search__highlights-${pageIndex}`, ref: containerRef }, renderHighlightElements({
    getCssProperties,
    highlightAreas
  }));
};

const escapeRegExp = (input) => input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizeFlagKeyword = (flagKeyword) => {
  const source = flagKeyword.wholeWords ? ` ${flagKeyword.keyword} ` : flagKeyword.keyword;
  const flags = flagKeyword.matchCase ? "g" : "gi";
  return {
    keyword: flagKeyword.keyword,
    regExp: new RegExp(escapeRegExp(source), flags),
    wholeWords: flagKeyword.wholeWords || false
  };
};
const normalizeSingleKeyword = (keyword, matchCase, wholeWords) => {
  if (keyword instanceof RegExp) {
    return {
      keyword: keyword.source,
      regExp: keyword,
      wholeWords: wholeWords || false
    };
  }
  if (typeof keyword === "string") {
    return keyword === "" ? EMPTY_KEYWORD_REGEXP : normalizeFlagKeyword({
      keyword,
      matchCase: matchCase || false,
      wholeWords: wholeWords || false
    });
  }
  if (typeof matchCase !== "undefined") {
    keyword.matchCase = matchCase;
  }
  if (typeof wholeWords !== "undefined") {
    keyword.wholeWords = wholeWords;
  }
  return normalizeFlagKeyword(keyword);
};

const useDocument = (store) => {
  const currentDocRef = React__namespace.useRef(store.get("doc"));
  const handleDocumentChanged = (doc) => {
    currentDocRef.current = doc;
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
    };
  }, []);
  return currentDocRef;
};

const useSearch = (store) => {
  const initialKeyword = store.get("initialKeyword");
  const normalizedKeywordFlags = React__namespace.useMemo(() => {
    if (initialKeyword && initialKeyword.length === 1) {
      const normalizedKeyword = normalizeSingleKeyword(initialKeyword[0]);
      return {
        matchCase: normalizedKeyword.regExp.flags.indexOf("i") === -1,
        wholeWords: normalizedKeyword.wholeWords
      };
    } else {
      return {
        matchCase: false,
        wholeWords: false
      };
    }
  }, []);
  const currentDocRef = useDocument(store);
  const [keywords, setKeywords] = React__namespace.useState(initialKeyword);
  const [found, setFound] = React__namespace.useState([]);
  const [currentMatch, setCurrentMatch] = React__namespace.useState(0);
  const [matchCase, setMatchCase] = React__namespace.useState(normalizedKeywordFlags.matchCase);
  const textContents = React__namespace.useRef([]);
  const [wholeWords, setWholeWords] = React__namespace.useState(normalizedKeywordFlags.wholeWords);
  const defaultTargetPageFilter = () => true;
  const targetPageFilter = React__namespace.useCallback(
    () => store.get("targetPageFilter") || defaultTargetPageFilter,
    [store.get("targetPageFilter")]
  );
  const changeMatchCase = (isChecked) => {
    setMatchCase(isChecked);
    if (keywords.length > 0) {
      searchFor(keywords, isChecked, wholeWords);
    }
  };
  const changeWholeWords = (isChecked) => {
    setWholeWords(isChecked);
    if (keywords.length > 0) {
      searchFor(keywords, matchCase, isChecked);
    }
  };
  const jumpToMatch = (index) => {
    const numMatches = found.length;
    if (keywords.length === 0 || numMatches === 0) {
      return null;
    }
    const normalizedIndex = index === numMatches + 1 ? 1 : Math.max(1, Math.min(numMatches, index));
    setCurrentMatch(normalizedIndex);
    return jumpToGivenMatch(found[normalizedIndex - 1]);
  };
  const jumpToPreviousMatch = () => jumpToMatch(currentMatch - 1);
  const jumpToNextMatch = () => jumpToMatch(currentMatch + 1);
  const clearKeyword = () => {
    store.update("keyword", [EMPTY_KEYWORD_REGEXP]);
    setKeyword("");
    setCurrentMatch(0);
    setFound([]);
    setMatchCase(false);
    setWholeWords(false);
  };
  const search = () => searchFor(keywords, matchCase, wholeWords);
  const setKeyword = (keyword) => setKeywords(keyword === "" ? [] : [keyword]);
  const setTargetPages = (targetPageFilter2) => {
    store.update("targetPageFilter", targetPageFilter2);
  };
  const getTextContents = () => {
    const currentDoc = currentDocRef.current;
    if (!currentDoc) {
      return Promise.resolve([]);
    }
    const promises = Array(currentDoc.numPages).fill(0).map(
      (_, pageIndex) => getPage(currentDoc, pageIndex).then((page) => {
        return page.getTextContent();
      }).then((content) => {
        const pageContent = content.items.map((item) => item.str || "").join("");
        return Promise.resolve({
          pageContent,
          pageIndex
        });
      })
    );
    return Promise.all(promises).then((data) => {
      data.sort((a, b) => a.pageIndex - b.pageIndex);
      return Promise.resolve(data.map((item) => item.pageContent));
    });
  };
  const jumpToGivenMatch = (match) => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(match.pageIndex);
    }
    store.update("matchPosition", {
      matchIndex: match.matchIndex,
      pageIndex: match.pageIndex
    });
    return match;
  };
  const getKeywordSource = (keyword) => {
    if (keyword instanceof RegExp) {
      return keyword.source;
    }
    if (typeof keyword === "string") {
      return keyword;
    }
    return keyword.keyword;
  };
  const searchFor = (keywordParam, matchCaseParam, wholeWordsParam) => {
    const currentDoc = currentDocRef.current;
    if (!currentDoc) {
      return Promise.resolve([]);
    }
    const numPages = currentDoc.numPages;
    const keywords2 = keywordParam.map((k) => normalizeSingleKeyword(k, matchCaseParam, wholeWordsParam));
    store.update("keyword", keywords2);
    setCurrentMatch(0);
    setFound([]);
    return new Promise((resolve, _) => {
      const getTextPromise = textContents.current.length === 0 ? getTextContents().then((response) => {
        textContents.current = response;
        return Promise.resolve(response);
      }) : Promise.resolve(textContents.current);
      getTextPromise.then((response) => {
        const arr = [];
        response.forEach((pageText, pageIndex) => {
          if (targetPageFilter()({ pageIndex, numPages })) {
            keywords2.forEach((keyword) => {
              let matchIndex = 0;
              let matches;
              while ((matches = keyword.regExp.exec(pageText)) !== null) {
                arr.push({
                  keyword: keyword.regExp,
                  matchIndex,
                  pageIndex,
                  pageText,
                  startIndex: matches.index,
                  endIndex: keyword.regExp.lastIndex
                });
                matchIndex++;
              }
            });
          }
        });
        setFound(arr);
        if (arr.length > 0) {
          setCurrentMatch(1);
          jumpToGivenMatch(arr[0]);
        }
        resolve(arr);
      });
    });
  };
  React__namespace.useEffect(() => {
    textContents.current = [];
  }, [currentDocRef.current]);
  return {
    clearKeyword,
    changeMatchCase,
    changeWholeWords,
    currentMatch,
    jumpToMatch,
    jumpToNextMatch,
    jumpToPreviousMatch,
    keywords,
    matchCase,
    numberOfMatches: found.length,
    wholeWords,
    search,
    searchFor,
    setKeywords,
    // Compatible with the single keyword search
    keyword: keywords.length === 0 ? "" : getKeywordSource(keywords[0]),
    setKeyword,
    setTargetPages
  };
};

const Search = ({ children, store }) => {
  const result = useSearch(store);
  const [isDocumentLoaded, setDocumentLoaded] = React__namespace.useState(false);
  const handleDocumentChanged = (_) => setDocumentLoaded(true);
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
    };
  }, []);
  return children({ ...result, isDocumentLoaded });
};

const ShortcutHandler = ({ containerRef, store }) => {
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const isMouseInsideRef = React__namespace.useRef(false);
  const handleMouseEnter = () => {
    isMouseInsideRef.current = true;
  };
  const handleMouseLeave = () => {
    isMouseInsideRef.current = false;
  };
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element) {
        return;
      }
      if (e.shiftKey || e.altKey || e.key !== "f") {
        return;
      }
      const isCommandPressed = isMac() ? e.metaKey && !e.ctrlKey : e.ctrlKey;
      if (!isCommandPressed) {
        return;
      }
      if (isMouseInsideRef.current || document.activeElement && element.contains(document.activeElement)) {
        e.preventDefault();
        store.update("areShortcutsPressed", true);
      }
    },
    [element]
  );
  React__namespace.useEffect(() => {
    if (!element) {
      return;
    }
    document.addEventListener("keydown", handleDocumentKeyDown);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [element]);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

var styles = {"popover":"rpv_be1278b5","inputCounter":"rpv_119fcec2","counter":"rpv_ea7700c","counterLtr":"rpv_4ee9303e","counterRtl":"rpv_4ee946be","label":"rpv_1a0edd04","checkbox":"rpv_380e43b3","footer":"rpv_1e5b198b","footerItem":"rpv_e0f04b3e","footerButtonLtr":"rpv_2013f20d","footerButtonRtl":"rpv_2014088d"};

const SearchPopover = ({ store, onToggle }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const [isQuerying, setIsQuerying] = React__namespace.useState(false);
  const [searchDone, setSearchDone] = React__namespace.useState(false);
  const isRtl = direction === TextDirection.RightToLeft;
  const {
    clearKeyword,
    changeMatchCase,
    changeWholeWords,
    currentMatch,
    jumpToNextMatch,
    jumpToPreviousMatch,
    keyword,
    matchCase,
    numberOfMatches,
    wholeWords,
    search,
    setKeyword
  } = useSearch(store);
  const performSearch = (cb) => {
    setIsQuerying(true);
    search().then((_) => {
      setIsQuerying(false);
      setSearchDone(true);
      cb && cb();
    });
  };
  const onKeydownSearch = (e) => {
    if (e.key === "Enter" && keyword) {
      searchDone ? jumpToNextMatch() : performSearch();
    }
  };
  const onChangeMatchCase = (e) => {
    setSearchDone(false);
    changeMatchCase(e.target.checked);
  };
  const onChangeWholeWords = (e) => {
    setSearchDone(false);
    changeWholeWords(e.target.checked);
  };
  const onClose = () => {
    onToggle();
    clearKeyword();
  };
  const onChangeKeyword = (value) => {
    setSearchDone(false);
    setKeyword(value);
  };
  React__namespace.useEffect(() => {
    const initialKeyword = store.get("initialKeyword");
    if (initialKeyword && initialKeyword.length === 1 && keyword) {
      performSearch(() => {
        store.update("initialKeyword", []);
      });
    }
  }, []);
  const searchLabel = l10n && l10n.search ? l10n.search.enterToSearch : "Enter to search";
  const previousMatchLabel = l10n && l10n.search ? l10n.search.previousMatch : "Previous match";
  const nextMatchLabel = l10n && l10n.search ? l10n.search.nextMatch : "Next match";
  const closeButtonLabel = l10n && l10n.search ? l10n.search.close : "Close";
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles.popover }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.inputCounter }, /* @__PURE__ */ React__namespace.createElement(
    TextBox,
    {
      ariaLabel: searchLabel,
      autoFocus: true,
      placeholder: searchLabel,
      type: "text",
      value: keyword,
      onChange: onChangeKeyword,
      onKeyDown: onKeydownSearch
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles.counter]: true,
        [styles.counterLtr]: !isRtl,
        [styles.counterRtl]: isRtl
      })
    },
    isQuerying && /* @__PURE__ */ React__namespace.createElement(Spinner, { testId: "search__popover-searching", size: "1rem" }),
    !isQuerying && /* @__PURE__ */ React__namespace.createElement("span", { "data-testid": "search__popover-num-matches" }, currentMatch, "/", numberOfMatches)
  )), /* @__PURE__ */ React__namespace.createElement("label", { className: styles.label }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      className: styles.checkbox,
      "data-testid": "search__popover-match-case",
      checked: matchCase,
      type: "checkbox",
      onChange: onChangeMatchCase
    }
  ), " ", l10n && l10n.search ? l10n.search.matchCase : "Match case"), /* @__PURE__ */ React__namespace.createElement("label", { className: styles.label }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      className: styles.checkbox,
      checked: wholeWords,
      "data-testid": "search__popover-whole-words",
      type: "checkbox",
      onChange: onChangeWholeWords
    }
  ), " ", l10n && l10n.search ? l10n.search.wholeWords : "Whole words"), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footer }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footerItem }, /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "search-previous-match",
      position: isRtl ? Position.BottomRight : Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: previousMatchLabel,
          isDisabled: currentMatch <= 1,
          onClick: jumpToPreviousMatch
        },
        /* @__PURE__ */ React__namespace.createElement(PreviousIcon, null)
      ),
      content: () => previousMatchLabel
    }
  )), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footerItem }, /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "search-next-match",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: nextMatchLabel,
          isDisabled: currentMatch > numberOfMatches - 1,
          onClick: jumpToNextMatch
        },
        /* @__PURE__ */ React__namespace.createElement(NextIcon, null)
      ),
      content: () => nextMatchLabel
    }
  )), /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles.footerButtonLtr]: !isRtl,
        [styles.footerButtonRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement(Button, { onClick: onClose }, closeButtonLabel)
  )));
};

const ShowSearchPopoverDecorator = ({ children, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.search ? l10n.search.search : "Search";
  const icon = /* @__PURE__ */ React__namespace.createElement(SearchIcon, null);
  return children({ icon, label, onClick });
};

const ShowSearchPopoverButton = ({ enableShortcuts, store, onClick }) => {
  const ariaKeyShortcuts = enableShortcuts ? isMac() ? "Meta+F" : "Ctrl+F" : "";
  const handleShortcutsPressed = (areShortcutsPressed) => {
    if (areShortcutsPressed) {
      onClick();
    }
  };
  React__namespace.useEffect(() => {
    store.subscribe("areShortcutsPressed", handleShortcutsPressed);
    return () => {
      store.unsubscribe("areShortcutsPressed", handleShortcutsPressed);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverDecorator, { onClick }, (p) => /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "search-popover",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: p.label,
          testId: "search__popover-button",
          onClick
        },
        p.icon
      ),
      content: () => p.label
    }
  ));
};

const ShowSearchPopover = ({ children, enableShortcuts, store }) => {
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverButton, { enableShortcuts, store, ...props });
  const render = children || defaultChildren;
  return /* @__PURE__ */ React__namespace.createElement(
    Popover,
    {
      ariaControlsSuffix: "search",
      lockScroll: false,
      position: Position.BottomCenter,
      target: (toggle) => render({
        onClick: toggle
      }),
      content: (toggle) => /* @__PURE__ */ React__namespace.createElement(SearchPopover, { store, onToggle: toggle }),
      closeOnClickOutside: false,
      closeOnEscape: true
    }
  );
};

const normalizeKeywords = (keyword) => Array.isArray(keyword) ? keyword.map((k) => normalizeSingleKeyword(k)) : keyword ? [normalizeSingleKeyword(keyword)] : [];
const searchPlugin = (props) => {
  const searchPluginProps = React__namespace.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => Object.assign({}, { enableShortcuts: true, onHighlightKeyword: () => {
    } }, props),
    []
  );
  const store = React__namespace.useMemo(
    () => createStore({
      initialKeyword: props && props.keyword ? Array.isArray(props.keyword) ? props.keyword : [props.keyword] : [],
      keyword: props && props.keyword ? normalizeKeywords(props.keyword) : [EMPTY_KEYWORD_REGEXP],
      matchPosition: {
        matchIndex: -1,
        pageIndex: -1
      },
      renderStatus: /* @__PURE__ */ new Map()
    }),
    []
  );
  const { clearKeyword, jumpToMatch, jumpToNextMatch, jumpToPreviousMatch, searchFor, setKeywords, setTargetPages } = useSearch(store);
  const SearchDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Search, { ...props2, store });
  const ShowSearchPopoverDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopover, { enableShortcuts: searchPluginProps.enableShortcuts, ...props2, store });
  const ShowSearchPopoverButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverButton, { enableShortcuts: searchPluginProps.enableShortcuts, store, ...props2 }));
  const renderViewer = (renderViewerProps) => {
    const currentSlot = renderViewerProps.slot;
    if (currentSlot.subSlot) {
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, searchPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: renderViewerProps.containerRef, store }), currentSlot.subSlot.children);
    }
    return currentSlot;
  };
  const renderPageLayer = (renderProps) => /* @__PURE__ */ React__namespace.createElement(
    Highlights,
    {
      key: renderProps.pageIndex,
      numPages: renderProps.doc.numPages,
      pageIndex: renderProps.pageIndex,
      renderHighlights: props?.renderHighlights,
      store,
      onHighlightKeyword: searchPluginProps.onHighlightKeyword
    }
  );
  return {
    install: (pluginFunctions) => {
      const initialKeyword = props && props.keyword ? Array.isArray(props.keyword) ? props.keyword : [props.keyword] : [];
      const keyword = props && props.keyword ? normalizeKeywords(props.keyword) : [EMPTY_KEYWORD_REGEXP];
      store.update("initialKeyword", initialKeyword);
      store.update("jumpToDestination", pluginFunctions.jumpToDestination);
      store.update("jumpToPage", pluginFunctions.jumpToPage);
      store.update("keyword", keyword);
    },
    renderPageLayer,
    renderViewer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uninstall: (props2) => {
      const renderStatus = store.get("renderStatus");
      if (renderStatus) {
        renderStatus.clear();
      }
    },
    onDocumentLoad: (props2) => {
      store.update("doc", props2.doc);
    },
    onTextLayerRender: (props2) => {
      let renderStatus = store.get("renderStatus");
      if (renderStatus) {
        renderStatus = renderStatus.set(props2.pageIndex, props2);
        store.update("renderStatus", renderStatus);
      }
    },
    Search: SearchDecorator,
    ShowSearchPopover: ShowSearchPopoverDecorator,
    ShowSearchPopoverButton: ShowSearchPopoverButtonDecorator,
    clearHighlights: () => {
      clearKeyword();
    },
    highlight: (keyword) => {
      const keywords = Array.isArray(keyword) ? keyword : [keyword];
      setKeywords(keywords);
      return searchFor(keywords);
    },
    jumpToMatch,
    jumpToNextMatch,
    jumpToPreviousMatch,
    setTargetPages
  };
};

exports.NextIcon = NextIcon;
exports.PreviousIcon = PreviousIcon;
exports.SearchIcon = SearchIcon;
exports.searchPlugin = searchPlugin;
