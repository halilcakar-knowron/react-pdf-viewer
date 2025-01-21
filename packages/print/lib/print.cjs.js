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

var styles$c = {"button":"rpv_62094e2d","buttonRtl":"rpv_98e1a8fd"};

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
        [styles$c.button]: true,
        [styles$c.buttonRtl]: isRtl
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React__namespace.useLayoutEffect : React__namespace.useEffect;

var styles$b = {"icon":"rpv_2a5a054d","iconRtl":"rpv_81d01ddd"};

const Icon = ({ children, ignoreDirection = false, size = 24 }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = !ignoreDirection && direction === TextDirection.RightToLeft;
  const width = `${size || 24}px`;
  return /* @__PURE__ */ React__namespace.createElement(
    "svg",
    {
      "aria-hidden": "true",
      className: classNames({
        [styles$b.icon]: true,
        [styles$b.iconRtl]: isRtl
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

var styles$a = {"item":"rpv_abc2baee","itemDisabled":"rpv_6e088b8a","itemLtr":"rpv_f9f8621c","itemRtl":"rpv_f9f8789c","icon":"rpv_abc27c54","iconLtr":"rpv_dd835ef6","iconRtl":"rpv_dd837576","label":"rpv_ccb63a79","labelLtr":"rpv_8a1fb2b1","labelRtl":"rpv_8a1fc931","checkLtr":"rpv_5a82a41d","checkRtl":"rpv_5a82ba9d"};

const MenuItem = ({ checked = false, children, icon = null, isDisabled = false, testId, onClick }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = testId ? { "data-testid": testId } : {};
  return /* @__PURE__ */ React__namespace.createElement(
    "button",
    {
      className: classNames({
        [styles$a.item]: true,
        [styles$a.itemDisabled]: isDisabled,
        [styles$a.itemLtr]: !isRtl,
        [styles$a.itemRtl]: isRtl
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
          [styles$a.icon]: true,
          [styles$a.iconLtr]: !isRtl,
          [styles$a.iconRtl]: isRtl
        })
      },
      icon
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$a.label]: true,
          [styles$a.labelLtr]: !isRtl,
          [styles$a.labelRtl]: isRtl
        })
      },
      children
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$a.checkLtr]: !isRtl,
          [styles$a.checkRtl]: isRtl
        })
      },
      checked && /* @__PURE__ */ React__namespace.createElement(CheckIcon, null)
    )
  );
};

var styles$9 = {"button":"rpv_799dde0c","buttonDisabled":"rpv_ec15b0a8","buttonRtl":"rpv_aa3418be","buttonSelected":"rpv_22f568c7"};

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
        [styles$9.button]: true,
        [styles$9.buttonDisabled]: isDisabled,
        [styles$9.buttonRtl]: isRtl,
        [styles$9.buttonSelected]: isSelected
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
};

var styles$8 = {"bar":"rpv_2affa46c","barRtl":"rpv_cb60365e","progress":"rpv_a1cee974"};

const ProgressBar = ({ progress }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles$8.bar]: true,
        [styles$8.barRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$8.progress, style: { width: `${progress}%` } }, progress, "%")
  );
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

const useLockScroll = () => {
  React__namespace.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};

var styles$7 = {"overlay":"rpv_2205272","body":"rpv_509faec0","bodyRtl":"rpv_46721b8a"};

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

const ModalBody = ({ ariaControlsSuffix, children, closeOnClickOutside, closeOnEscape, onClose }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const overlayRef = React__namespace.useRef(null);
  const contentRef = React__namespace.useRef();
  const animationOptions = {
    duration: 150,
    fill: "forwards"
  };
  const handleClose = () => {
    const overlayEle = overlayRef.current;
    const contentEle = contentRef.current;
    if (!overlayEle || !contentEle) {
      return;
    }
    contentEle.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)"
        },
        {
          opacity: 0,
          transform: "scale(0.9)"
        }
      ],
      animationOptions
    );
    const overlayAnimation = overlayEle.animate(
      [
        {
          background: "rgba(0, 0, 0, 0.8)",
          opacity: 1
        },
        {
          background: "rgba(0, 0, 0, 1)",
          opacity: 0
        }
      ],
      animationOptions
    );
    overlayAnimation.finished.then(() => {
      onClose();
    });
  };
  const [contentCallbackRef] = useClickOutsideStack(closeOnClickOutside, handleClose);
  const mergedContentRef = mergeRefs([contentRef, contentCallbackRef]);
  useLockScroll();
  useEscapeStack(() => {
    if (closeOnEscape) {
      handleClose();
    }
  });
  React__namespace.useEffect(() => {
    const overlayEle = overlayRef.current;
    const contentEle = contentRef.current;
    if (!overlayEle || !contentEle) {
      return;
    }
    const overlayAnimation = overlayEle.animate(
      [
        {
          background: "rgba(0, 0, 0, 1)",
          opacity: 0
        },
        {
          background: "rgba(0, 0, 0, 0.8)",
          opacity: 1
        }
      ],
      animationOptions
    );
    const contentAnimation = contentEle.animate(
      [
        {
          opacity: 0,
          transform: "scale(0.9)"
        },
        {
          opacity: 1,
          transform: "scale(1)"
        }
      ],
      animationOptions
    );
    return () => {
      overlayAnimation.cancel();
      contentAnimation.cancel();
    };
  }, []);
  React__namespace.useEffect(() => {
    const contentEle = contentRef.current;
    if (!contentEle) {
      return;
    }
    const maxHeight = document.body.clientHeight * 0.75;
    if (contentEle.getBoundingClientRect().height >= maxHeight) {
      contentEle.style.overflow = "auto";
      contentEle.style.maxHeight = `${maxHeight}px`;
    }
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$7.overlay, ref: overlayRef }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "aria-modal": "true",
      className: classNames({
        [styles$7.body]: true,
        [styles$7.bodyRtl]: isRtl
      }),
      id: `rpv-core__modal-body-${ariaControlsSuffix}`,
      ref: mergedContentRef,
      role: "dialog",
      tabIndex: -1
    },
    children({ onClose: handleClose })
  ));
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

const Modal = ({ ariaControlsSuffix, closeOnClickOutside, closeOnEscape, content, isOpened = false, target }) => {
  const controlsSuffix = ariaControlsSuffix || `${uniqueId()}`;
  const { opened, toggle } = useToggle(isOpened);
  const renderTarget = (toggle2, opened2) => {
    return target ? /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        "aria-expanded": opened2 ? "true" : "false",
        "aria-haspopup": "dialog",
        "aria-controls": `rpv-core__modal-body-${controlsSuffix}`
      },
      target(toggle2, opened2)
    ) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
  };
  const renderContent = (toggle2) => /* @__PURE__ */ React__namespace.createElement(
    ModalBody,
    {
      ariaControlsSuffix: controlsSuffix,
      closeOnClickOutside,
      closeOnEscape,
      onClose: toggle2
    },
    ({ onClose }) => content(onClose)
  );
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, renderTarget(toggle, opened), opened && /* @__PURE__ */ React__namespace.createElement(Stack, null, renderContent(toggle)));
};

var styles$6 = {"body":"rpv_33f641c8","bodyArrow":"rpv_19dd1f21","bodyRtl":"rpv_de324b82"};

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

var styles$5 = {"arrow":"rpv_add41145","arrowTopLeft":"rpv_ee9ba1f7","arrowTopCenter":"rpv_a6e31245","arrowTopRight":"rpv_e52efe2c","arrowRightTop":"rpv_c9e661fe","arrowRightCenter":"rpv_3356ff0c","arrowRightBottom":"rpv_3231cce2","arrowBottomLeft":"rpv_d8db7bf7","arrowBottomCenter":"rpv_946c45","arrowBottomRight":"rpv_42ea642c","arrowLeftTop":"rpv_35de56c9","arrowLeftCenter":"rpv_9f46d261","arrowLeftBottom":"rpv_9e21a037"};

const Arrow = ({ customClassName, position }) => /* @__PURE__ */ React__namespace.createElement(
  "div",
  {
    className: classNames({
      [styles$5.arrow]: true,
      [styles$5.arrowTopLeft]: position === Position.TopLeft,
      [styles$5.arrowTopCenter]: position === Position.TopCenter,
      [styles$5.arrowTopRight]: position === Position.TopRight,
      [styles$5.arrowRightTop]: position === Position.RightTop,
      [styles$5.arrowRightCenter]: position === Position.RightCenter,
      [styles$5.arrowRightBottom]: position === Position.RightBottom,
      [styles$5.arrowBottomLeft]: position === Position.BottomLeft,
      [styles$5.arrowBottomCenter]: position === Position.BottomCenter,
      [styles$5.arrowBottomRight]: position === Position.BottomRight,
      [styles$5.arrowLeftTop]: position === Position.LeftTop,
      [styles$5.arrowLeftCenter]: position === Position.LeftCenter,
      [styles$5.arrowLeftBottom]: position === Position.LeftBottom,
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
        [styles$6.body]: true,
        [styles$6.bodyRtl]: isRtl
      }),
      id: `rpv-core__popover-body-${ariaControlsSuffix}`,
      ref: mergedContentRef,
      role: "dialog",
      tabIndex: -1
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$6.bodyArrow, position }),
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

var styles$4 = {"body":"rpv_68737a2a","bodyRtl":"rpv_16369fe0","arrow":"rpv_a5ef4481","content":"rpv_4ba7c6f1"};

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
        [styles$4.body]: true,
        [styles$4.bodyRtl]: isRtl
      }),
      id: `rpv-core__tooltip-body-${ariaControlsSuffix}`,
      ref,
      role: "tooltip"
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$4.arrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$4.content }, children)
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

const PrintIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M7.5,19.499h9 M7.5,16.499h9 M5.5,16.5h-3c-1.103-0.003-1.997-0.897-2-2v-6c0.003-1.103,0.897-1.997,2-2h19
            c1.103,0.003,1.997,0.897,2,2v6c-0.003,1.103-0.897,1.997-2,2h-3
            M5.5,4.5v-4h9.586c0.265,0,0.52,0.105,0.707,0.293l2.414,2.414
            C18.395,3.394,18.5,3.649,18.5,3.914V4.5
            M18.5,22.5c0,0.552-0.448,1-1,1h-11c-0.552,0-1-0.448-1-1v-9h13V22.5z
            M3.5,8.499
            c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S2.948,8.499,3.5,8.499z
            M14.5,0.499v4h4`
  }
));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getAllPagesNumbers = (doc) => Array(doc.numPages).fill(0).map((_, i) => i);

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const generateRange = (min, max) => Array(max - min + 1).fill(0).map((_, i) => min + i);
const removeDuplicate = (arr) => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
const getCustomPagesNumbers = (customPages) => {
  return (doc) => {
    const results = [];
    customPages.replace(/\s+/g, "").split(",").forEach((part) => {
      const range = part.split("-").map((c) => parseInt(c, 10)).filter((c) => Number.isInteger(c));
      if (range.length === 1) {
        results.push(range[0] - 1);
      } else if (range.length === 2) {
        results.push(...generateRange(range[0] - 1, range[1] - 1));
      }
    });
    return removeDuplicate(results).filter((i) => i >= 0 && i < doc.numPages);
  };
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getEvenPagesNumbers = (doc) => Array(doc.numPages).fill(0).map((_, i) => i).filter((i) => (i + 1) % 2 === 0);

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getOddPagesNumbers = (doc) => Array(doc.numPages).fill(0).map((_, i) => i).filter((i) => (i + 1) % 2 === 1);

const PrintButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.print ? l10n.print.print : "Print";
  const ariaKeyShortcuts = enableShortcuts ? isMac() ? "Meta+P" : "Ctrl+P" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "print",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "print__button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(PrintIcon, null)
      ),
      content: () => label
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
var PrintStatus = /* @__PURE__ */ ((PrintStatus2) => {
  PrintStatus2["CheckingPermission"] = "CheckingPermission";
  PrintStatus2["Inactive"] = "Inactive";
  PrintStatus2["Preparing"] = "Preparing";
  PrintStatus2["Cancelled"] = "Cancelled";
  PrintStatus2["Ready"] = "Ready";
  return PrintStatus2;
})(PrintStatus || {});

const Print = ({ children, enableShortcuts, store }) => {
  const print = () => {
    store.update("printStatus", PrintStatus.CheckingPermission);
  };
  const render = children || PrintButton;
  return render({
    enableShortcuts,
    onClick: print
  });
};

var styles$3 = {"body":"rpv_6708d99b","footer":"rpv_cf113b54"};

const PERMISSION_PRINT = 4;
const PERMISSION_PRINT_HIGHT_QUALITY = 2048;
const CheckPrintPermission = ({ doc, store }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const [isAllowed, setIsAllowed] = React__namespace.useState(true);
  React__namespace.useEffect(() => {
    doc.getPermissions().then((permissions) => {
      const canPrint = permissions === null || permissions.includes(PERMISSION_PRINT) || permissions.includes(PERMISSION_PRINT_HIGHT_QUALITY);
      canPrint ? store.update("printStatus", PrintStatus.Preparing) : setIsAllowed(false);
    });
  }, []);
  return isAllowed ? /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null) : /* @__PURE__ */ React__namespace.createElement(
    Modal,
    {
      ariaControlsSuffix: "print-permission",
      closeOnClickOutside: false,
      closeOnEscape: false,
      content: (toggle) => {
        const close = () => {
          toggle();
          store.update("printStatus", PrintStatus.Cancelled);
        };
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.body }, l10n && l10n.print ? l10n.print.disallowPrint : "The document does not allow to print"), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.footer }, /* @__PURE__ */ React__namespace.createElement(Button, { onClick: close }, l10n && l10n.print ? l10n.print.close : "Close")));
      },
      isOpened: true
    }
  );
};

var styles$2 = {"container":"rpv_ede6da6e","inner":"rpv_cf06dac3","innerRtl":"rpv_eeaccca7","progress":"rpv_9b3f42a0","message":"rpv_ed452534"};

const PrintProgress = ({ numLoadedPages, numPages, onCancel }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const progress = Math.floor(numLoadedPages * 100 / numPages);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.container }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles$2.inner]: true,
        [styles$2.innerRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.message }, l10n && l10n.print ? l10n.print.preparingDocument : "Preparing document ..."),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.progress }, /* @__PURE__ */ React__namespace.createElement(ProgressBar, { progress })),
    /* @__PURE__ */ React__namespace.createElement(Button, { onClick: onCancel }, l10n && l10n.print ? l10n.print.cancel : "Cancel")
  ));
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const isRunningInJest = () => typeof process !== "undefined" && process.env.JEST_WORKER_ID !== undefined;

var styles$1 = {"page":"rpv_3441ef3f","image":"rpv_539eb2ab"};

const PageThumbnail = ({ canvas, page, pageHeight, pageIndex, pageWidth, rotation, onLoad }) => {
  const renderTask = React__namespace.useRef();
  const [src, setSrc] = useSafeState("");
  const testWithJest = React__namespace.useMemo(() => isRunningInJest(), []);
  const handleImageLoad = () => {
    if (!testWithJest) {
      onLoad();
    }
  };
  React__namespace.useEffect(() => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }
    const printUnit = 150 / 72;
    canvas.height = Math.floor(pageHeight * printUnit);
    canvas.width = Math.floor(pageWidth * printUnit);
    const canvasContext = canvas.getContext("2d");
    canvasContext.save();
    canvasContext.fillStyle = "rgb(255, 255, 255)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
    const viewport = page.getViewport({ rotation, scale: 1 });
    renderTask.current = page.render({
      canvasContext,
      intent: "print",
      transform: [printUnit, 0, 0, printUnit, 0, 0],
      viewport
    });
    renderTask.current.promise.then(
      () => {
        if ("toBlob" in canvas && "createObjectURL" in URL) {
          canvas.toBlob((blob) => {
            if (blob) {
              setSrc(URL.createObjectURL(blob));
              testWithJest && onLoad();
            }
          });
        } else {
          setSrc(canvas.toDataURL());
          testWithJest && onLoad();
        }
      },
      () => {
      }
    );
  }, []);
  return src && /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.page }, /* @__PURE__ */ React__namespace.createElement(
    "img",
    {
      className: styles$1.image,
      "data-testid": `print__thumbnail-${pageIndex}`,
      src,
      onLoad: handleImageLoad
    }
  ));
};

const PageThumbnailContainer = ({ canvas, doc, pageIndex, pageRotation, pageSize, rotation, shouldRender, onLoad }) => {
  const [page, setPage] = useSafeState(null);
  const isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
  React__namespace.useEffect(() => {
    if (shouldRender) {
      getPage(doc, pageIndex).then((pdfPage) => {
        setPage(pdfPage);
      });
    }
  }, [shouldRender]);
  const rotationNumber = (pageSize.rotation + rotation + pageRotation) % 360;
  return page && /* @__PURE__ */ React__namespace.createElement(
    PageThumbnail,
    {
      canvas,
      page,
      pageHeight: isVertical ? pageSize.pageHeight : pageSize.pageWidth,
      pageIndex,
      pageWidth: isVertical ? pageSize.pageWidth : pageSize.pageHeight,
      rotation: rotationNumber,
      onLoad
    }
  );
};

var styles = {"zone":"rpv_ef75ad00","htmlPrinting":"rpv_1f5dd034","bodyPrinting":"rpv_f9a11b2b"};

const PrintZone = ({ doc, numLoadedPages, pagesRotation, pageSizes, printPages, printStatus, rotation, onCancel, onLoad }) => {
  const canvas = React__namespace.useMemo(() => document.createElement("canvas"), []);
  const container = React__namespace.useMemo(() => {
    const zoneEle = document.querySelector(`.${styles.zone}`);
    if (zoneEle) {
      return zoneEle;
    }
    const div = document.createElement("div");
    div.classList.add(styles.zone);
    div.setAttribute("data-testid", "print__zone");
    document.body.appendChild(div);
    return div;
  }, []);
  React__namespace.useEffect(() => {
    if (printStatus === PrintStatus.Ready) {
      document.documentElement.classList.add(styles.htmlPrinting);
      document.body.classList.add(styles.bodyPrinting);
      window.print();
    }
    const handler = () => {
      if (printStatus === PrintStatus.Ready) {
        document.documentElement.classList.remove(styles.htmlPrinting);
        document.body.classList.remove(styles.bodyPrinting);
        const zones = document.querySelectorAll(`.${styles.zone}`);
        if (zones) {
          zones.forEach((zoneEle) => {
            zoneEle.parentElement?.removeChild(zoneEle);
          });
        }
        canvas.height = 0;
        canvas.width = 0;
        document.removeEventListener("mousemove", handler);
        onCancel();
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [printStatus]);
  const pageHeight = pageSizes[0].pageHeight;
  const pageWidth = pageSizes[0].pageWidth;
  return ReactDOM.createPortal(
    /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, printPages.map((pageIndex, loopIndex) => /* @__PURE__ */ React__namespace.createElement(
      PageThumbnailContainer,
      {
        key: pageIndex,
        canvas,
        doc,
        pageIndex,
        pageRotation: pagesRotation.has(pageIndex) ? pagesRotation.get(pageIndex) : 0,
        pageSize: pageSizes[pageIndex],
        rotation,
        shouldRender: loopIndex === numLoadedPages,
        onLoad
      }
    )), /* @__PURE__ */ React__namespace.createElement(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: `@page { size: ${pageWidth}pt ${pageHeight}pt }`
        }
      }
    )),
    container
  );
};

const PrintContainer = ({ doc, pagesRotation, pageSizes, renderProgressBar, rotation, setPages, store }) => {
  const [printStatus, setPrintStatus] = React__namespace.useState(PrintStatus.Inactive);
  const [numLoadedPagesForPrint, setNumLoadedPagesForPrint] = React__namespace.useState(0);
  const printPages = React__namespace.useMemo(() => {
    const { numPages } = doc;
    return setPages(doc).filter((index) => index >= 0 && index < numPages);
  }, [doc, setPages]);
  const numPrintPages = printPages.length;
  const cancelPrinting = () => {
    setNumLoadedPagesForPrint(0);
    setPrintStatus(PrintStatus.Inactive);
  };
  const handlePrintStatus = (status) => setPrintStatus(status);
  const onLoadPage = () => {
    const total = numLoadedPagesForPrint + 1;
    if (total <= numPrintPages) {
      setNumLoadedPagesForPrint(total);
      total === numPrintPages && setPrintStatus(PrintStatus.Ready);
    }
  };
  React__namespace.useEffect(() => {
    store.subscribe("printStatus", handlePrintStatus);
    return () => {
      store.unsubscribe("printStatus", handlePrintStatus);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, printStatus === PrintStatus.CheckingPermission && /* @__PURE__ */ React__namespace.createElement(CheckPrintPermission, { doc, store }), printStatus === PrintStatus.Preparing && (renderProgressBar ? renderProgressBar(numLoadedPagesForPrint, numPrintPages, cancelPrinting) : /* @__PURE__ */ React__namespace.createElement(
    PrintProgress,
    {
      numLoadedPages: numLoadedPagesForPrint,
      numPages: numPrintPages,
      onCancel: cancelPrinting
    }
  )), (printStatus === PrintStatus.Preparing || printStatus === PrintStatus.Ready) && numLoadedPagesForPrint <= numPrintPages && /* @__PURE__ */ React__namespace.createElement(
    PrintZone,
    {
      doc,
      numLoadedPages: numLoadedPagesForPrint,
      pagesRotation,
      pageSizes,
      printPages,
      printStatus,
      rotation,
      onCancel: cancelPrinting,
      onLoad: onLoadPage
    }
  ));
};

const PrintMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.print ? l10n.print.print : "Print";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(PrintIcon, null), testId: "print__menu", onClick }, label);
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
      if (!element || e.shiftKey || e.altKey || e.key !== "p") {
        return;
      }
      const isCommandPressed = isMac() ? e.metaKey : e.ctrlKey;
      if (!isCommandPressed) {
        return;
      }
      if (!document.activeElement || !element.contains(document.activeElement)) {
        return;
      }
      e.preventDefault();
      store.update("printStatus", PrintStatus.Preparing);
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

const printPlugin = (props) => {
  const printPluginProps = React__namespace.useMemo(
    () => Object.assign(
      {},
      {
        enableShortcuts: true,
        setPages: (doc) => Array(doc.numPages).fill(0).map((_, i) => i)
      },
      props
    ),
    []
  );
  const store = React__namespace.useMemo(
    () => createStore({
      printStatus: PrintStatus.Inactive
    }),
    []
  );
  const print = () => {
    store.update("printStatus", PrintStatus.CheckingPermission);
  };
  const PrintDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Print, { enableShortcuts: printPluginProps.enableShortcuts, ...props2, store });
  const PrintButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(PrintDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(PrintButton, { ...props2 }));
  const PrintMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(PrintDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    PrintMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const renderViewer = (renderViewerProps) => {
    const { slot } = renderViewerProps;
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, printPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: renderViewerProps.containerRef, store }), /* @__PURE__ */ React__namespace.createElement(
        PrintContainer,
        {
          doc: renderViewerProps.doc,
          pagesRotation: renderViewerProps.pagesRotation,
          pageSizes: renderViewerProps.pageSizes,
          renderProgressBar: props?.renderProgressBar,
          rotation: renderViewerProps.rotation,
          setPages: printPluginProps.setPages,
          store
        }
      ), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  const setPages = (printPages) => {
    printPluginProps.setPages = printPages;
  };
  return {
    print,
    renderViewer,
    Print: PrintDecorator,
    PrintButton: PrintButtonDecorator,
    PrintMenuItem: PrintMenuItemDecorator,
    setPages
  };
};

exports.PrintIcon = PrintIcon;
exports.getAllPagesNumbers = getAllPagesNumbers;
exports.getCustomPagesNumbers = getCustomPagesNumbers;
exports.getEvenPagesNumbers = getEvenPagesNumbers;
exports.getOddPagesNumbers = getOddPagesNumbers;
exports.printPlugin = printPlugin;
