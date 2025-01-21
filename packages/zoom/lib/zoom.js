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

var styles$9 = {"menu":"rpv_223ba50d","menuRtl":"rpv_baed661d"};

const Menu = ({ children }) => {
  const containerRef = React__namespace.useRef(null);
  const visibleMenuItemsRef = React__namespace.useRef([]);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const handleKeyDown = (e) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    switch (e.key) {
      case "Tab":
        e.preventDefault();
        break;
      case "ArrowDown":
        e.preventDefault();
        moveToItem((_, currentIndex) => currentIndex + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveToItem((_, currentIndex) => currentIndex - 1);
        break;
      case "End":
        e.preventDefault();
        moveToItem((items, _) => items.length - 1);
        break;
      case "Home":
        e.preventDefault();
        moveToItem((_, __) => 0);
        break;
    }
  };
  const moveToItem = (getNextItem) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const items = visibleMenuItemsRef.current;
    const currentIndex = items.findIndex((item) => item.getAttribute("tabindex") === "0");
    const targetIndex = Math.min(items.length - 1, Math.max(0, getNextItem(items, currentIndex)));
    if (currentIndex >= 0 && currentIndex <= items.length - 1) {
      items[currentIndex].setAttribute("tabindex", "-1");
    }
    items[targetIndex].setAttribute("tabindex", "0");
    items[targetIndex].focus();
  };
  const findVisibleItems = (container) => {
    const visibleItems = [];
    container.querySelectorAll('.rpv-core__menu-item[role="menuitem"]').forEach((item) => {
      if (item instanceof HTMLElement) {
        const parent = item.parentElement;
        if (parent === container) {
          visibleItems.push(item);
        } else {
          if (window.getComputedStyle(parent).display !== "none") {
            visibleItems.push(item);
          }
        }
      }
    });
    return visibleItems;
  };
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const visibleItems = findVisibleItems(container);
    visibleMenuItemsRef.current = visibleItems;
  }, []);
  useIsomorphicLayoutEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref: containerRef,
      "aria-orientation": "vertical",
      className: classNames({
        [styles$9.menu]: true,
        [styles$9.menuRtl]: isRtl
      }),
      role: "menu",
      tabIndex: 0
    },
    children
  );
};

var styles$8 = {"divider":"rpv_316d3906"};

const MenuDivider = () => /* @__PURE__ */ React__namespace.createElement("div", { "aria-orientation": "horizontal", className: styles$8.divider, role: "separator" });

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

const useDebounceCallback = (callback, wait) => {
  const timeout = React__namespace.useRef();
  const cleanup = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };
  React__namespace.useEffect(() => {
    return () => cleanup();
  }, []);
  return React__namespace.useCallback(
    (...args) => {
      cleanup();
      timeout.current = setTimeout(() => {
        callback(...args);
      }, wait);
    },
    [callback, wait]
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

var styles$2 = {"overlay":"rpv_9a8b66e"};

const PopoverOverlay = ({ children, closeOnEscape, onClose }) => {
  const containerRef = React__namespace.useRef(null);
  useEscapeStack(() => {
    if (closeOnEscape) {
      onClose();
    }
  });
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.overlay, ref: containerRef }, children);
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
var SpecialZoomLevel = /* @__PURE__ */ ((SpecialZoomLevel2) => {
  SpecialZoomLevel2["ActualSize"] = "ActualSize";
  SpecialZoomLevel2["PageFit"] = "PageFit";
  SpecialZoomLevel2["PageWidth"] = "PageWidth";
  return SpecialZoomLevel2;
})(SpecialZoomLevel || {});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const isMac = () => typeof window !== "undefined" ? /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) : false;

const ZoomInIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z
            M23.5,23.499
            l-5.929-5.929
            M5.5,10.499h10
            M10.5,5.499v10`
  }
));

const ZoomOutIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z
            M23.5,23.499
            l-5.929-5.929
            M5.5,10.499h10`
  }
));

const useZoom = (store) => {
  const [scale, setScale] = React__namespace.useState(store.get("scale") || 0);
  const handleScaleChanged = (currentScale) => {
    setScale(currentScale);
  };
  React__namespace.useEffect(() => {
    store.subscribe("scale", handleScaleChanged);
    return () => {
      store.unsubscribe("scale", handleScaleChanged);
    };
  }, []);
  return { scale };
};

const CurrentScale = ({ children, store }) => {
  const { scale } = useZoom(store);
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, `${Math.round(props.scale * 100)}%`);
  const render = children || defaultChildren;
  return render({ scale });
};

const WHEEL_EVENT_OPTIONS = {
  passive: false
};
let svgElement;
const createSvgElement = () => {
  return svgElement || (svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg"));
};
const PinchZoom = ({ pagesContainerRef, store }) => {
  const zoomTo = useDebounceCallback((scale) => {
    const zoom = store.get("zoom");
    if (zoom) {
      zoom(scale);
    }
  }, 40);
  const handleWheelEvent = (e) => {
    if (!e.ctrlKey) {
      return;
    }
    e.preventDefault();
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const scaleDiff = 1 - e.deltaY / 100;
    const originX = e.clientX - rect.left;
    const originY = e.clientY - rect.top;
    const currentScale = store.get("scale");
    const matrix = createSvgElement().createSVGMatrix().translate(originX, originY).scale(scaleDiff).translate(-originX, -originY).scale(currentScale);
    zoomTo(matrix.a);
  };
  useIsomorphicLayoutEffect(() => {
    const pagesContainer = pagesContainerRef.current;
    if (!pagesContainer) {
      return;
    }
    pagesContainer.addEventListener("wheel", handleWheelEvent, WHEEL_EVENT_OPTIONS);
    return () => {
      pagesContainer.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const LEVELS = [
  0.1,
  0.2,
  0.3,
  0.4,
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
  1.1,
  1.3,
  1.5,
  1.7,
  1.9,
  2.1,
  2.4,
  2.7,
  3,
  3.3,
  3.7,
  4.1,
  4.6,
  5.1,
  5.7,
  6.3,
  7,
  7.7,
  8.5,
  9.4,
  10
];
const increase = (currentLevel) => {
  const found = LEVELS.find((item) => item > currentLevel);
  return found || currentLevel;
};
const decrease = (currentLevel) => {
  const found = LEVELS.findIndex((item) => item >= currentLevel);
  return found === -1 || found === 0 ? currentLevel : LEVELS[found - 1];
};

const ShortcutHandler = ({ containerRef, store }) => {
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element || e.shiftKey || e.altKey) {
        return;
      }
      const isCommandPressed = isMac() ? e.metaKey : e.ctrlKey;
      if (!isCommandPressed) {
        return;
      }
      if (!document.activeElement || !element.contains(document.activeElement)) {
        return;
      }
      const zoom = store.get("zoom");
      if (!zoom) {
        return;
      }
      const scale = store.get("scale") || 1;
      let newScale = 1;
      switch (e.key) {
        case "-":
          newScale = decrease(scale);
          break;
        case "=":
          newScale = increase(scale);
          break;
        case "0":
          newScale = 1;
          break;
        default:
          newScale = scale;
          break;
      }
      if (newScale !== scale) {
        e.preventDefault();
        zoom(newScale);
      }
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

var styles = {"target":"rpv_97efec6c","scaleLtr":"rpv_40d5565b","scaleRtl":"rpv_40d56cdb","arrow":"rpv_3e2b1ce"};

const DEFAULT_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
const ZoomPopover = ({ levels = DEFAULT_LEVELS, scale, onZoom }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const getSpcialLevelLabel = (level) => {
    switch (level) {
      case SpecialZoomLevel.ActualSize:
        return l10n && l10n.zoom ? l10n.zoom.actualSize : "Actual size";
      case SpecialZoomLevel.PageFit:
        return l10n && l10n.zoom ? l10n.zoom.pageFit : "Page fit";
      case SpecialZoomLevel.PageWidth:
        return l10n && l10n.zoom ? l10n.zoom.pageWidth : "Page width";
    }
  };
  const zoomDocumentLabel = l10n && l10n.zoom ? l10n.zoom.zoomDocument : "Zoom document";
  const renderTarget = (toggle) => {
    const click = () => {
      toggle();
    };
    return /* @__PURE__ */ React__namespace.createElement(MinimalButton, { ariaLabel: zoomDocumentLabel, testId: "zoom__popover-target", onClick: click }, /* @__PURE__ */ React__namespace.createElement("span", { className: styles.target }, /* @__PURE__ */ React__namespace.createElement(
      "span",
      {
        "data-testid": "zoom__popover-target-scale",
        className: classNames({
          [styles.scaleLtr]: !isRtl,
          [styles.scaleRtl]: isRtl
        })
      },
      Math.round(scale * 100),
      "%"
    ), /* @__PURE__ */ React__namespace.createElement("span", { className: styles.arrow })));
  };
  const renderContent = (toggle) => /* @__PURE__ */ React__namespace.createElement(Menu, null, Object.keys(SpecialZoomLevel).map((k) => {
    const level = k;
    const clickMenuItem = () => {
      toggle();
      onZoom(level);
    };
    return /* @__PURE__ */ React__namespace.createElement(MenuItem, { key: level, onClick: clickMenuItem }, getSpcialLevelLabel(level));
  }), /* @__PURE__ */ React__namespace.createElement(MenuDivider, null), levels.map((level) => {
    const clickMenuItem = () => {
      toggle();
      onZoom(level);
    };
    return /* @__PURE__ */ React__namespace.createElement(MenuItem, { key: level, onClick: clickMenuItem }, `${Math.round(level * 100)}%`);
  }));
  return /* @__PURE__ */ React__namespace.createElement(
    Popover,
    {
      ariaControlsSuffix: "zoom",
      ariaHasPopup: "menu",
      position: Position.BottomCenter,
      target: renderTarget,
      content: renderContent,
      closeOnClickOutside: true,
      closeOnEscape: true
    }
  );
};

const Zoom = ({ children, levels, store }) => {
  const { scale } = useZoom(store);
  const zoomTo = (newLevel) => {
    const zoom = store.get("zoom");
    if (zoom) {
      zoom(newLevel);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ZoomPopover, { levels, scale: props.scale, onZoom: props.onZoom });
  const render = children || defaultChildren;
  return render({
    scale,
    onZoom: zoomTo
  });
};

const ZoomInButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomIn : "Zoom in";
  const ariaKeyShortcuts = enableShortcuts ? isMac() ? "Meta+=" : "Ctrl+=" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "zoom-in",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "zoom__in-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(ZoomInIcon, null)
      ),
      content: () => label
    }
  );
};

const ZoomIn = ({ children, enableShortcuts, store }) => {
  const { scale } = useZoom(store);
  const zoomIn = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      const newLevel = increase(scale);
      zoom(newLevel);
    }
  };
  const render = children || ZoomInButton;
  return render({
    enableShortcuts,
    onClick: zoomIn
  });
};

const ZoomInMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomIn : "Zoom in";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(ZoomInIcon, null), testId: "zoom__in-menu", onClick }, label);
};

const ZoomOutButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomOut : "Zoom out";
  const ariaKeyShortcuts = enableShortcuts ? isMac() ? "Meta+-" : "Ctrl+-" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "zoom-out",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "zoom__out-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(ZoomOutIcon, null)
      ),
      content: () => label
    }
  );
};

const ZoomOut = ({ children, enableShortcuts, store }) => {
  const { scale } = useZoom(store);
  const zoomIn = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      const newLevel = decrease(scale);
      zoom(newLevel);
    }
  };
  const render = children || ZoomOutButton;
  return render({
    enableShortcuts,
    onClick: zoomIn
  });
};

const ZoomOutMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomOut : "Zoom out";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(ZoomOutIcon, null), testId: "zoom__out-menu", onClick }, label);
};

const zoomPlugin = (props) => {
  const zoomPluginProps = React__namespace.useMemo(() => Object.assign({}, { enableShortcuts: true }, props), []);
  const store = React__namespace.useMemo(() => createStore({}), []);
  const CurrentScaleDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(CurrentScale, { ...props2, store });
  const ZoomInDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomIn, { enableShortcuts: zoomPluginProps.enableShortcuts, ...props2, store });
  const ZoomInButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ZoomInDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomInButton, { ...props2 }));
  const ZoomInMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomInDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    ZoomInMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const ZoomOutDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomOut, { enableShortcuts: zoomPluginProps.enableShortcuts, ...props2, store });
  const ZoomOutButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ZoomOutDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomOutButton, { ...props2 }));
  const ZoomOutMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomOutDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    ZoomOutMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const ZoomDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Zoom, { ...props2, store });
  const ZoomPopoverDecorator = (zoomPopverProps) => /* @__PURE__ */ React__namespace.createElement(ZoomDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomPopover, { levels: zoomPopverProps?.levels, ...props2 }));
  const renderViewer = (props2) => {
    const { slot } = props2;
    if (!zoomPluginProps.enableShortcuts) {
      return slot;
    }
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: props2.containerRef, store }), /* @__PURE__ */ React__namespace.createElement(PinchZoom, { pagesContainerRef: props2.pagesContainerRef, store }), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  return {
    renderViewer,
    install: (pluginFunctions) => {
      store.update("zoom", pluginFunctions.zoom);
    },
    onViewerStateChange: (viewerState) => {
      store.update("scale", viewerState.scale);
      return viewerState;
    },
    zoomTo: (scale) => {
      const zoom = store.get("zoom");
      if (zoom) {
        zoom(scale);
      }
    },
    CurrentScale: CurrentScaleDecorator,
    ZoomIn: ZoomInDecorator,
    ZoomInButton: ZoomInButtonDecorator,
    ZoomInMenuItem: ZoomInMenuItemDecorator,
    ZoomOut: ZoomOutDecorator,
    ZoomOutButton: ZoomOutButtonDecorator,
    ZoomOutMenuItem: ZoomOutMenuItemDecorator,
    Zoom: ZoomDecorator,
    ZoomPopover: ZoomPopoverDecorator
  };
};

exports.ZoomInIcon = ZoomInIcon;
exports.ZoomOutIcon = ZoomOutIcon;
exports.zoomPlugin = zoomPlugin;
