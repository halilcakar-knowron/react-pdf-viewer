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

var styles$7 = {"icon":"rpv_2a5a054d","iconRtl":"rpv_81d01ddd"};

const Icon = ({ children, ignoreDirection = false, size = 24 }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = !ignoreDirection && direction === TextDirection.RightToLeft;
  const width = `${size || 24}px`;
  return /* @__PURE__ */ React__namespace.createElement(
    "svg",
    {
      "aria-hidden": "true",
      className: classNames({
        [styles$7.icon]: true,
        [styles$7.iconRtl]: isRtl
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

var styles$6 = {"item":"rpv_abc2baee","itemDisabled":"rpv_6e088b8a","itemLtr":"rpv_f9f8621c","itemRtl":"rpv_f9f8789c","icon":"rpv_abc27c54","iconLtr":"rpv_dd835ef6","iconRtl":"rpv_dd837576","label":"rpv_ccb63a79","labelLtr":"rpv_8a1fb2b1","labelRtl":"rpv_8a1fc931","checkLtr":"rpv_5a82a41d","checkRtl":"rpv_5a82ba9d"};

const MenuItem = ({ checked = false, children, icon = null, isDisabled = false, testId, onClick }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = testId ? { "data-testid": testId } : {};
  return /* @__PURE__ */ React__namespace.createElement(
    "button",
    {
      className: classNames({
        [styles$6.item]: true,
        [styles$6.itemDisabled]: isDisabled,
        [styles$6.itemLtr]: !isRtl,
        [styles$6.itemRtl]: isRtl
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
          [styles$6.icon]: true,
          [styles$6.iconLtr]: !isRtl,
          [styles$6.iconRtl]: isRtl
        })
      },
      icon
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$6.label]: true,
          [styles$6.labelLtr]: !isRtl,
          [styles$6.labelRtl]: isRtl
        })
      },
      children
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$6.checkLtr]: !isRtl,
          [styles$6.checkRtl]: isRtl
        })
      },
      checked && /* @__PURE__ */ React__namespace.createElement(CheckIcon, null)
    )
  );
};

var styles$5 = {"button":"rpv_799dde0c","buttonDisabled":"rpv_ec15b0a8","buttonRtl":"rpv_aa3418be","buttonSelected":"rpv_22f568c7"};

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
        [styles$5.button]: true,
        [styles$5.buttonDisabled]: isDisabled,
        [styles$5.buttonRtl]: isRtl,
        [styles$5.buttonSelected]: isSelected
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
};

var styles$4 = {"textbox":"rpv_5acb480f","textboxRtl":"rpv_ce17cbdb"};

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
      [styles$4.textbox]: true,
      [styles$4.textboxRtl]: isRtl
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

const useIsMounted = () => {
  const isMountedRef = React__namespace.useRef(false);
  React__namespace.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef;
};

const useSafeState = (initialState) => {
  const [state, setState] = React__namespace.useState(initialState);
  const useIsMountedRef = useIsMounted();
  const setSafeState = React__namespace.useCallback(
    (newState) => {
      if (useIsMountedRef.current) {
        setState(newState);
      }
    },
    [useIsMountedRef.current]
  );
  return [state, setSafeState];
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

var styles$3 = {"body":"rpv_33f641c8","bodyArrow":"rpv_19dd1f21","bodyRtl":"rpv_de324b82"};

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

var styles$2 = {"arrow":"rpv_add41145","arrowTopLeft":"rpv_ee9ba1f7","arrowTopCenter":"rpv_a6e31245","arrowTopRight":"rpv_e52efe2c","arrowRightTop":"rpv_c9e661fe","arrowRightCenter":"rpv_3356ff0c","arrowRightBottom":"rpv_3231cce2","arrowBottomLeft":"rpv_d8db7bf7","arrowBottomCenter":"rpv_946c45","arrowBottomRight":"rpv_42ea642c","arrowLeftTop":"rpv_35de56c9","arrowLeftCenter":"rpv_9f46d261","arrowLeftBottom":"rpv_9e21a037"};

const Arrow = ({ customClassName, position }) => /* @__PURE__ */ React__namespace.createElement(
  "div",
  {
    className: classNames({
      [styles$2.arrow]: true,
      [styles$2.arrowTopLeft]: position === Position.TopLeft,
      [styles$2.arrowTopCenter]: position === Position.TopCenter,
      [styles$2.arrowTopRight]: position === Position.TopRight,
      [styles$2.arrowRightTop]: position === Position.RightTop,
      [styles$2.arrowRightCenter]: position === Position.RightCenter,
      [styles$2.arrowRightBottom]: position === Position.RightBottom,
      [styles$2.arrowBottomLeft]: position === Position.BottomLeft,
      [styles$2.arrowBottomCenter]: position === Position.BottomCenter,
      [styles$2.arrowBottomRight]: position === Position.BottomRight,
      [styles$2.arrowLeftTop]: position === Position.LeftTop,
      [styles$2.arrowLeftCenter]: position === Position.LeftCenter,
      [styles$2.arrowLeftBottom]: position === Position.LeftBottom,
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
        [styles$3.body]: true,
        [styles$3.bodyRtl]: isRtl
      }),
      id: `rpv-core__popover-body-${ariaControlsSuffix}`,
      ref: mergedContentRef,
      role: "dialog",
      tabIndex: -1
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$3.bodyArrow, position }),
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

var styles$1 = {"body":"rpv_68737a2a","bodyRtl":"rpv_16369fe0","arrow":"rpv_a5ef4481","content":"rpv_4ba7c6f1"};

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
        [styles$1.body]: true,
        [styles$1.bodyRtl]: isRtl
      }),
      id: `rpv-core__tooltip-body-${ariaControlsSuffix}`,
      ref,
      role: "tooltip"
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$1.arrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.content }, children)
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
  let state = {};
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
const isMac = () => typeof window !== "undefined" ? /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) : false;

const DownArrowIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M2.32,2.966h19.452c0.552,0.001,1,0.449,0.999,1.001c0,0.182-0.05,0.36-0.144,0.516L12.9,20.552
            c-0.286,0.472-0.901,0.624-1.373,0.338c-0.138-0.084-0.254-0.2-0.338-0.338L1.465,4.483C1.179,4.01,1.331,3.396,1.804,3.11
            C1.96,3.016,2.138,2.966,2.32,2.966z`
  }
));

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

const UpArrowIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M21.783,21.034H2.332c-0.552,0-1-0.448-1-1c0-0.182,0.05-0.361,0.144-0.517L11.2,3.448
            c0.286-0.472,0.901-0.624,1.373-0.338c0.138,0.084,0.254,0.2,0.338,0.338l9.726,16.069c0.286,0.473,0.134,1.087-0.339,1.373
            C22.143,20.984,21.965,21.034,21.783,21.034z`
  }
));

var styles = {"container":"rpv_638e1576"};

const useCurrentPage = (store) => {
  const [currentPage, setCurrentPage] = React__namespace.useState(store.get("currentPage") || 0);
  const handleCurrentPageChanged = (currentPageIndex) => {
    setCurrentPage(currentPageIndex);
  };
  useIsomorphicLayoutEffect(() => {
    store.subscribe("currentPage", handleCurrentPageChanged);
    return () => {
      store.unsubscribe("currentPage", handleCurrentPageChanged);
    };
  }, []);
  return { currentPage };
};

const useNumberOfPages = (store) => {
  const [numberOfPages, setNumberOfPages] = React__namespace.useState(store.get("numberOfPages") || 0);
  const handleNumberOfPages = (total) => {
    setNumberOfPages(total);
  };
  React__namespace.useEffect(() => {
    store.subscribe("numberOfPages", handleNumberOfPages);
    return () => {
      store.unsubscribe("numberOfPages", handleNumberOfPages);
    };
  }, []);
  return { numberOfPages };
};

const CurrentPageInput = ({ store }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const [editingPage, setEditingPage] = React__namespace.useState("1");
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  React__namespace.useEffect(() => setEditingPage(`${currentPage + 1}`), [currentPage]);
  const gotoNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < numberOfPages) {
      setEditingPage(`${nextPage + 1}`);
      jumpTo(nextPage);
    }
  };
  const gotoPreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= 0) {
      setEditingPage(`${previousPage + 1}`);
      jumpTo(previousPage);
    }
  };
  const jumpTo = (page) => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(page);
    }
  };
  const jump = () => {
    const newPage = parseInt(editingPage, 10);
    editingPage === "" || newPage < 1 || newPage > numberOfPages ? setEditingPage(`${currentPage + 1}`) : jumpTo(newPage - 1);
  };
  const keydownPage = (e) => {
    switch (e.key) {
      // Up key is pressed
      case "ArrowUp":
        gotoPreviousPage();
        break;
      // Down key
      case "ArrowDown":
        gotoNextPage();
        break;
      // Enter key
      case "Enter":
        jump();
        break;
    }
  };
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.enterPageNumber : "Enter a page number";
  return /* @__PURE__ */ React__namespace.createElement("span", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(
    TextBox,
    {
      ariaLabel: label,
      testId: "page-navigation__current-page-input",
      type: "text",
      value: editingPage,
      onChange: setEditingPage,
      onKeyDown: keydownPage
    }
  ));
};

const FetchLabels = ({ children, doc }) => {
  const [status, setStatus] = useSafeState({
    loading: true,
    labels: []
  });
  React__namespace.useEffect(() => {
    doc.getPageLabels().then((result) => {
      setStatus({ loading: false, labels: result || [] });
    });
  }, [doc.loadingTask.docId]);
  return status.loading ? /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null) : children(status.labels);
};

const useDocument = (store) => {
  const [currentDoc, setCurrentDoc] = React__namespace.useState(store.get("doc"));
  const handleDocumentChanged = (doc) => {
    setCurrentDoc(doc);
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
    };
  }, []);
  return currentDoc;
};

const CurrentPageLabel = ({ children, store }) => {
  const currentDoc = useDocument(store);
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, props.currentPage + 1);
  const render = children || defaultChildren;
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(FetchLabels, { doc: currentDoc }, (labels) => {
    const pageLabel = labels.length === numberOfPages && numberOfPages > 0 ? labels[currentPage] : "";
    return render({
      currentPage,
      numberOfPages,
      pageLabel
    });
  }) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const GoToFirstPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToFirstPage : "First page";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "page-navigation-first",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__first-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(UpArrowIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToFirstPage = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const goToFirstPage = () => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(0);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageButton, { isDisabled: props.isDisabled, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage === 0,
    onClick: goToFirstPage
  });
};

const GoToFirstPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToFirstPage : "First page";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(UpArrowIcon, null), isDisabled, testId: "page-navigation__first-menu", onClick }, label);
};

const GoToLastPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToLastPage : "Last page";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "page-navigation-last",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__last-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToLastPage = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  const goToLastPage = () => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(numberOfPages - 1);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToLastPageButton, { isDisabled: props.isDisabled, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage + 1 >= numberOfPages,
    onClick: goToLastPage
  });
};

const GoToLastPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToLastPage : "Last page";
  return /* @__PURE__ */ React__namespace.createElement(
    MenuItem,
    {
      icon: /* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null),
      isDisabled,
      testId: "page-navigation__last-menu",
      onClick
    },
    label
  );
};

const GoToNextPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToNextPage : "Next page";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "page-navigation-next",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__next-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(NextIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToNextPage = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  const goToNextPage = () => {
    const jumpToNextPage = store.get("jumpToNextPage");
    if (jumpToNextPage) {
      jumpToNextPage();
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToNextPageButton, { onClick: props.onClick, isDisabled: props.isDisabled });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage + 1 >= numberOfPages,
    onClick: goToNextPage
  });
};

const GoToNextPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToNextPage : "Next page";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(NextIcon, null), isDisabled, testId: "page-navigation__next-menu", onClick }, label);
};

const GoToPreviousPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToPreviousPage : "Previous page";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "page-navigation-previous",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__previous-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(PreviousIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToPreviousPage = ({ store, children }) => {
  const { currentPage } = useCurrentPage(store);
  const goToPreviousPage = () => {
    const jumpToPreviousPage = store.get("jumpToPreviousPage");
    if (jumpToPreviousPage) {
      jumpToPreviousPage();
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageButton, { isDisabled: props.isDisabled, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage <= 0,
    onClick: goToPreviousPage
  });
};

const GoToPreviousPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToPreviousPage : "Previous page";
  return /* @__PURE__ */ React__namespace.createElement(
    MenuItem,
    {
      icon: /* @__PURE__ */ React__namespace.createElement(PreviousIcon, null),
      isDisabled,
      testId: "page-navigation__previous-menu",
      onClick
    },
    label
  );
};

const NumberOfPages = ({ children, store }) => {
  const { numberOfPages } = useNumberOfPages(store);
  return children ? children({ numberOfPages }) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, numberOfPages);
};

const ShortcutHandler = ({ containerRef, numPages, store }) => {
  const { currentPage } = useCurrentPage(store);
  const currentPageRef = React__namespace.useRef(currentPage);
  currentPageRef.current = currentPage;
  const isMouseInsideRef = React__namespace.useRef(false);
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const handleMouseEnter = () => {
    isMouseInsideRef.current = true;
  };
  const handleMouseLeave = () => {
    isMouseInsideRef.current = false;
  };
  const goToNextPage = () => {
    const jumpToPage = store.get("jumpToPage");
    const targetPage = currentPageRef.current + 1;
    if (jumpToPage && targetPage < numPages) {
      jumpToPage(targetPage);
    }
  };
  const goToPreviousPage = () => {
    const jumpToPage = store.get("jumpToPage");
    const targetPage = currentPageRef.current - 1;
    if (jumpToPage && targetPage >= 0) {
      jumpToPage(targetPage);
    }
  };
  const jumpToNextDestination = () => {
    const jumpToNextDestination2 = store.get("jumpToNextDestination");
    if (jumpToNextDestination2) {
      jumpToNextDestination2();
    }
  };
  const jumpToPreviousDestination = () => {
    const jumpToPreviousDestination2 = store.get("jumpToPreviousDestination");
    if (jumpToPreviousDestination2) {
      jumpToPreviousDestination2();
    }
  };
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element) {
        return;
      }
      const shouldHandleShortcuts = isMouseInsideRef.current || document.activeElement && element.contains(document.activeElement);
      if (!shouldHandleShortcuts) {
        return;
      }
      const shouldGoToNextPage = e.altKey && e.key === "ArrowDown" || !e.shiftKey && !e.altKey && e.key === "PageDown";
      const shouldGoToPreviousPage = e.altKey && e.key === "ArrowUp" || !e.shiftKey && !e.altKey && e.key === "PageUp";
      if (shouldGoToNextPage) {
        e.preventDefault();
        goToNextPage();
        return;
      }
      if (shouldGoToPreviousPage) {
        e.preventDefault();
        goToPreviousPage();
        return;
      }
      const isCommandPressed = isMac() ? e.metaKey && !e.ctrlKey : e.altKey;
      if (isCommandPressed) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            jumpToPreviousDestination();
            break;
          case "ArrowRight":
            e.preventDefault();
            jumpToNextDestination();
            break;
        }
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

const pageNavigationPlugin = (props) => {
  const pageNavigationPluginProps = React__namespace.useMemo(() => Object.assign({}, { enableShortcuts: true }, props), []);
  const store = React__namespace.useMemo(() => createStore(), []);
  const CurrentPageInputDecorator = () => /* @__PURE__ */ React__namespace.createElement(CurrentPageInput, { store });
  const CurrentPageLabelDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(CurrentPageLabel, { ...props2, store });
  const GoToFirstPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPage, { ...props2, store });
  const GoToFirstPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageButton, { ...props2 }));
  const GoToFirstPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToFirstPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const GoToLastPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToLastPage, { ...props2, store });
  const GoToLastPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToLastPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToLastPageButton, { ...props2 }));
  const GoToLastPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToLastPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToLastPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const GoToNextPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToNextPage, { ...props2, store });
  const GoToNextPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToNextPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToNextPageButton, { ...props2 }));
  const GoToNextPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToNextPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToNextPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const GoToPreviousPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPage, { ...props2, store });
  const GoToPreviousPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageButton, { ...props2 }));
  const GoToPreviousPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToPreviousPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const NumberOfPagesDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(NumberOfPages, { ...props2, store });
  const renderViewer = (props2) => {
    const { slot } = props2;
    if (!pageNavigationPluginProps.enableShortcuts) {
      return slot;
    }
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: props2.containerRef, numPages: props2.doc.numPages, store }), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  return {
    install: (pluginFunctions) => {
      store.update("jumpToDestination", pluginFunctions.jumpToDestination);
      store.update("jumpToNextDestination", pluginFunctions.jumpToNextDestination);
      store.update("jumpToNextPage", pluginFunctions.jumpToNextPage);
      store.update("jumpToPage", pluginFunctions.jumpToPage);
      store.update("jumpToPreviousDestination", pluginFunctions.jumpToPreviousDestination);
      store.update("jumpToPreviousPage", pluginFunctions.jumpToPreviousPage);
    },
    renderViewer,
    onDocumentLoad: (props2) => {
      store.update("doc", props2.doc);
      store.update("numberOfPages", props2.doc.numPages);
    },
    onViewerStateChange: (viewerState) => {
      store.update("currentPage", viewerState.pageIndex);
      return viewerState;
    },
    jumpToNextPage: () => {
      const jump = store.get("jumpToNextPage");
      if (jump) {
        jump();
      }
    },
    jumpToPage: (pageIndex) => {
      const jumpTo = store.get("jumpToPage");
      if (jumpTo) {
        jumpTo(pageIndex);
      }
    },
    jumpToPreviousPage: () => {
      const jump = store.get("jumpToPreviousPage");
      if (jump) {
        jump();
      }
    },
    CurrentPageInput: CurrentPageInputDecorator,
    CurrentPageLabel: CurrentPageLabelDecorator,
    GoToFirstPage: GoToFirstPageDecorator,
    GoToFirstPageButton: GoToFirstPageButtonDecorator,
    GoToFirstPageMenuItem: GoToFirstPageMenuItemDecorator,
    GoToLastPage: GoToLastPageDecorator,
    GoToLastPageButton: GoToLastPageButtonDecorator,
    GoToLastPageMenuItem: GoToLastPageMenuItemDecorator,
    GoToNextPage: GoToNextPageDecorator,
    GoToNextPageButton: GoToNextPageButtonDecorator,
    GoToNextPageMenuItem: GoToNextPageMenuItemDecorator,
    GoToPreviousPage: GoToPreviousPageDecorator,
    GoToPreviousPageButton: GoToPreviousPageButtonDecorator,
    GoToPreviousPageMenuItem: GoToPreviousPageMenuItemDecorator,
    NumberOfPages: NumberOfPagesDecorator
  };
};

exports.DownArrowIcon = DownArrowIcon;
exports.NextIcon = NextIcon;
exports.PreviousIcon = PreviousIcon;
exports.UpArrowIcon = UpArrowIcon;
exports.pageNavigationPlugin = pageNavigationPlugin;
