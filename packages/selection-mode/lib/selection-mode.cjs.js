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

var styles$6 = {"icon":"rpv_2a5a054d","iconRtl":"rpv_81d01ddd"};

const Icon = ({ children, ignoreDirection = false, size = 24 }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = !ignoreDirection && direction === TextDirection.RightToLeft;
  const width = `${size || 24}px`;
  return /* @__PURE__ */ React__namespace.createElement(
    "svg",
    {
      "aria-hidden": "true",
      className: classNames({
        [styles$6.icon]: true,
        [styles$6.iconRtl]: isRtl
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

var styles$5 = {"item":"rpv_abc2baee","itemDisabled":"rpv_6e088b8a","itemLtr":"rpv_f9f8621c","itemRtl":"rpv_f9f8789c","icon":"rpv_abc27c54","iconLtr":"rpv_dd835ef6","iconRtl":"rpv_dd837576","label":"rpv_ccb63a79","labelLtr":"rpv_8a1fb2b1","labelRtl":"rpv_8a1fc931","checkLtr":"rpv_5a82a41d","checkRtl":"rpv_5a82ba9d"};

const MenuItem = ({ checked = false, children, icon = null, isDisabled = false, testId, onClick }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = testId ? { "data-testid": testId } : {};
  return /* @__PURE__ */ React__namespace.createElement(
    "button",
    {
      className: classNames({
        [styles$5.item]: true,
        [styles$5.itemDisabled]: isDisabled,
        [styles$5.itemLtr]: !isRtl,
        [styles$5.itemRtl]: isRtl
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
          [styles$5.icon]: true,
          [styles$5.iconLtr]: !isRtl,
          [styles$5.iconRtl]: isRtl
        })
      },
      icon
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$5.label]: true,
          [styles$5.labelLtr]: !isRtl,
          [styles$5.labelRtl]: isRtl
        })
      },
      children
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$5.checkLtr]: !isRtl,
          [styles$5.checkRtl]: isRtl
        })
      },
      checked && /* @__PURE__ */ React__namespace.createElement(CheckIcon, null)
    )
  );
};

var styles$4 = {"button":"rpv_799dde0c","buttonDisabled":"rpv_ec15b0a8","buttonRtl":"rpv_aa3418be","buttonSelected":"rpv_22f568c7"};

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
        [styles$4.button]: true,
        [styles$4.buttonDisabled]: isDisabled,
        [styles$4.buttonRtl]: isRtl,
        [styles$4.buttonSelected]: isSelected
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
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

const HandToolIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M11.5,5.5v-2C11.5,2.672,12.172,2,13,2s1.5,0.672,1.5,1.5v2 M14.5,11.5v-6C14.5,4.672,15.172,4,16,4
            c0.828,0,1.5,0.672,1.5,1.5v3 M17.5,13V8.5C17.5,7.672,18.172,7,19,7s1.5,0.672,1.5,1.5v10c0,2.761-2.239,5-5,5h-3.335
            c-1.712-0.001-3.305-0.876-4.223-2.321C6.22,18.467,4.083,14,4.083,14c-0.378-0.545-0.242-1.292,0.303-1.67
            c0.446-0.309,1.044-0.281,1.458,0.07L8.5,15.5v-10C8.5,4.672,9.172,4,10,4s1.5,0.672,1.5,1.5v6`
  }
));

const TextSelectionIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M13.675,11.671l2.941-2.941c0.195-0.196,0.195-0.512-0.001-0.707C16.563,7.971,16.5,7.931,16.43,7.906
            L4.168,3.527C3.908,3.434,3.622,3.57,3.529,3.83c-0.039,0.109-0.039,0.228,0,0.336l4.379,12.262
            c0.093,0.26,0.379,0.396,0.639,0.303c0.07-0.025,0.133-0.065,0.185-0.117l2.943-2.943l6.146,6.146c0.195,0.195,0.512,0.195,0.707,0
            l1.293-1.293c0.195-0.195,0.195-0.512,0-0.707L13.675,11.671z`
  }
));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var SelectionMode = /* @__PURE__ */ ((SelectionMode2) => {
  SelectionMode2["Hand"] = "Hand";
  SelectionMode2["Text"] = "Text";
  return SelectionMode2;
})(SelectionMode || {});

const SwitchSelectionModeDecorator = ({ children, mode, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  let label = "";
  let icon = /* @__PURE__ */ React__namespace.createElement(TextSelectionIcon, null);
  switch (mode) {
    case SelectionMode.Hand:
      label = l10n && l10n.selectionMode ? l10n.selectionMode.handTool : "Hand tool";
      icon = /* @__PURE__ */ React__namespace.createElement(HandToolIcon, null);
      break;
    case SelectionMode.Text:
    default:
      label = l10n && l10n.selectionMode ? l10n.selectionMode.textSelectionTool : "Text selection tool";
      icon = /* @__PURE__ */ React__namespace.createElement(TextSelectionIcon, null);
      break;
  }
  return children({ icon, label, onClick });
};

const SwitchSelectionModeButton = ({ isSelected, mode, onClick }) => {
  let testId = "";
  switch (mode) {
    case SelectionMode.Hand:
      testId = "selection-mode__hand-button";
      break;
    case SelectionMode.Text:
    default:
      testId = "selection-mode__text-button";
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "selection-mode-switch",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: props.label,
          isSelected,
          testId,
          onClick: props.onClick
        },
        props.icon
      ),
      content: () => props.label
    }
  ));
};

const SwitchSelectionMode = ({ children, mode, store }) => {
  const onClick = () => store.update("selectionMode", mode);
  const isSelected = mode === store.get("selectionMode");
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeButton, { isSelected, mode: props.mode, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isSelected,
    mode,
    onClick
  });
};

const SwitchSelectionModeMenuItem = ({
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case SelectionMode.Hand:
      testId = "selection-mode__hand-menu";
      break;
    case SelectionMode.Text:
    default:
      testId = "selection-mode__text-menu";
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(MenuItem, { checked: isSelected, icon: props.icon, testId, onClick: props.onClick }, props.label));
};

var styles = {"grab":"rpv_548bac0a","grabbing":"rpv_8f90bb4a"};

const Tracker = ({ store }) => {
  const pagesRef = React__namespace.useRef(null);
  const [selectionMode, setSelectionMode] = React__namespace.useState(SelectionMode.Text);
  const pos = React__namespace.useRef({ top: 0, left: 0, x: 0, y: 0 });
  const onMouseMoveHandler = (e) => {
    const ele = pagesRef.current;
    if (!ele) {
      return;
    }
    ele.scrollTop = pos.current.top - (e.clientY - pos.current.y);
    ele.scrollLeft = pos.current.left - (e.clientX - pos.current.x);
  };
  const onMouseUpHandler = () => {
    const ele = pagesRef.current;
    if (!ele) {
      return;
    }
    ele.classList.add(styles.grab);
    ele.classList.remove(styles.grabbing);
    document.removeEventListener("mousemove", onMouseMoveHandler);
    document.removeEventListener("mouseup", onMouseUpHandler);
  };
  const onMouseDownHandler = (e) => {
    const ele = pagesRef.current;
    if (!ele || selectionMode === SelectionMode.Text) {
      return;
    }
    ele.classList.remove(styles.grab);
    ele.classList.add(styles.grabbing);
    e.preventDefault();
    e.stopPropagation();
    pos.current = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY
    };
    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler);
  };
  const handlePagesContainer = (getPagesContainer) => {
    pagesRef.current = getPagesContainer();
  };
  const handleSelectionModeChanged = (mode) => {
    setSelectionMode(mode);
  };
  React__namespace.useEffect(() => {
    const ele = pagesRef.current;
    if (!ele) {
      return;
    }
    selectionMode === SelectionMode.Hand ? ele.classList.add(styles.grab) : ele.classList.remove(styles.grab);
    ele.addEventListener("mousedown", onMouseDownHandler);
    return () => {
      ele.removeEventListener("mousedown", onMouseDownHandler);
    };
  }, [selectionMode]);
  React__namespace.useEffect(() => {
    store.subscribe("getPagesContainer", handlePagesContainer);
    store.subscribe("selectionMode", handleSelectionModeChanged);
    return () => {
      store.unsubscribe("getPagesContainer", handlePagesContainer);
      store.unsubscribe("selectionMode", handleSelectionModeChanged);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const selectionModePlugin = (props) => {
  const store = React__namespace.useMemo(() => createStore(), []);
  const SwitchSelectionModeDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionMode, { ...props2, store });
  const SwitchSelectionModeButtonDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode: props2.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchSelectionModeButton,
    {
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
      }
    }
  ));
  const SwitchSelectionModeMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode: props2.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchSelectionModeMenuItem,
    {
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const renderViewer = (props2) => {
    const currentSlot = props2.slot;
    if (currentSlot.subSlot && currentSlot.subSlot.children) {
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(Tracker, { store }), currentSlot.subSlot.children);
    }
    return currentSlot;
  };
  return {
    install: (pluginFunctions) => {
      store.update("selectionMode", props && props.selectionMode ? props.selectionMode : SelectionMode.Text);
      store.update("getPagesContainer", pluginFunctions.getPagesContainer);
    },
    renderViewer,
    SwitchSelectionMode: SwitchSelectionModeDecorator,
    SwitchSelectionModeButton: SwitchSelectionModeButtonDecorator,
    SwitchSelectionModeMenuItem: SwitchSelectionModeMenuItemDecorator
  };
};

exports.HandToolIcon = HandToolIcon;
exports.SelectionMode = SelectionMode;
exports.TextSelectionIcon = TextSelectionIcon;
exports.selectionModePlugin = selectionModePlugin;
