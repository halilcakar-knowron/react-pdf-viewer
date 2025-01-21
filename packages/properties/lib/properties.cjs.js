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

var styles$8 = {"separator":"rpv_dbdc0dfd"};

const Separator = () => /* @__PURE__ */ React__namespace.createElement("div", { className: styles$8.separator });

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

var styles$6 = {"overlay":"rpv_2205272","body":"rpv_509faec0","bodyRtl":"rpv_46721b8a"};

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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$6.overlay, ref: overlayRef }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "aria-modal": "true",
      className: classNames({
        [styles$6.body]: true,
        [styles$6.bodyRtl]: isRtl
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

var styles$3 = {"body":"rpv_68737a2a","bodyRtl":"rpv_16369fe0","arrow":"rpv_a5ef4481","content":"rpv_4ba7c6f1"};

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
        [styles$3.body]: true,
        [styles$3.bodyRtl]: isRtl
      }),
      id: `rpv-core__tooltip-body-${ariaControlsSuffix}`,
      ref,
      role: "tooltip"
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$3.arrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.content }, children)
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

const InfoIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M12,1.001c6.075,0,11,4.925,11,11s-4.925,11-11,11s-11-4.925-11-11S5.925,1.001,12,1.001z
            M14.5,17.005H13
            c-0.552,0-1-0.448-1-1v-6.5c0-0.276-0.224-0.5-0.5-0.5H10
            M11.745,6.504L11.745,6.504
            M11.745,6.5c-0.138,0-0.25,0.112-0.25,0.25
            S11.607,7,11.745,7s0.25-0.112,0.25-0.25S11.883,6.5,11.745,6.5`
  }
));

var styles$2 = {"loader":"rpv_1c26ac9a"};

const PropertiesLoader = ({ doc, render }) => {
  const [data, setData] = React__namespace.useState();
  React__namespace.useEffect(() => {
    doc.getMetadata().then((meta) => {
      return Promise.resolve(meta);
    }).then((meta) => {
      return doc.getDownloadInfo().then((d) => {
        return Promise.resolve({
          fileName: meta.contentDispositionFilename || "",
          info: meta.info,
          length: d.length
        });
      });
    }).then((response) => {
      setData(response);
    });
  }, []);
  return data ? render(data) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.loader }, /* @__PURE__ */ React__namespace.createElement(Spinner, null));
};

var styles$1 = {"item":"rpv_6ea31738","itemRtl":"rpv_f50c4012","label":"rpv_65e1676f","value":"rpv_666e79ec"};

const PropertyItem = ({ label, value }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  return /* @__PURE__ */ React__namespace.createElement(
    "dl",
    {
      className: classNames({
        [styles$1.item]: true,
        [styles$1.itemRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("dt", { className: styles$1.label }, label, ":"),
    /* @__PURE__ */ React__namespace.createElement("dd", { className: styles$1.value }, value || "-")
  );
};

var styles = {"modal":"rpv_255a805a","section":"rpv_650b4d52","footer":"rpv_7a08e58e"};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const dateRegex = new RegExp(
  "^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?"
);
const parse = (value, min, max, defaultValue) => {
  const parsed = parseInt(value, 10);
  return parsed >= min && parsed <= max ? parsed : defaultValue;
};
const convertDate = (input) => {
  const matches = dateRegex.exec(input);
  if (!matches) {
    return null;
  }
  const year = parseInt(matches[1], 10);
  const month = parse(matches[2], 1, 12, 1) - 1;
  const day = parse(matches[3], 1, 31, 1);
  let hour = parse(matches[4], 0, 23, 0);
  let minute = parse(matches[5], 0, 59, 0);
  const second = parse(matches[6], 0, 59, 0);
  const universalTimeRelation = matches[7] || "Z";
  const offsetHour = parse(matches[8], 0, 23, 0);
  const offsetMinute = parse(matches[9], 0, 59, 0);
  switch (universalTimeRelation) {
    case "-":
      hour += offsetHour;
      minute += offsetMinute;
      break;
    case "+":
      hour -= offsetHour;
      minute -= offsetMinute;
      break;
  }
  return new Date(Date.UTC(year, month, day, hour, minute, second));
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getFileName = (url) => {
  const str = url.split("/").pop();
  return str ? str.split("#")[0].split("?")[0] : url;
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getFileSize = (bytes) => {
  const sufixes = ["B", "kB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
};

const PropertiesModal = ({ doc, fileName, onToggle }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const formatDate = (input) => {
    const date = convertDate(input);
    return date ? `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}` : "";
  };
  const renderData = (data) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.section }, /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.fileName : "File name",
      value: data.fileName || getFileName(fileName)
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.fileSize : "File size",
      value: getFileSize(data.length)
    }
  )), /* @__PURE__ */ React__namespace.createElement(Separator, null), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.section }, /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.title : "Title",
      value: data.info.Title
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.author : "Author",
      value: data.info.Author
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.subject : "Subject",
      value: data.info.Subject
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.keywords : "Keywords",
      value: data.info.Keywords
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.creator : "Creator",
      value: data.info.Creator
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.creationDate : "Creation date",
      value: formatDate(data.info.CreationDate)
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.modificationDate : "Modification date",
      value: formatDate(data.info.ModDate)
    }
  )), /* @__PURE__ */ React__namespace.createElement(Separator, null), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.section }, /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.pdfProducer : "PDF producer",
      value: data.info.Producer
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.pdfVersion : "PDF version",
      value: data.info.PDFFormatVersion
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.pageCount : "Page count",
      value: `${doc.numPages}`
    }
  )));
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles.modal }, /* @__PURE__ */ React__namespace.createElement(PropertiesLoader, { doc, render: renderData }), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footer }, /* @__PURE__ */ React__namespace.createElement(Button, { onClick: onToggle }, l10n && l10n.properties ? l10n.properties.close : "Close")));
};

const ShowPropertiesButton = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.properties ? l10n.properties.showProperties : "Show properties";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "properties",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(MinimalButton, { ariaLabel: label, testId: "properties__button", onClick }, /* @__PURE__ */ React__namespace.createElement(InfoIcon, null)),
      content: () => label
    }
  );
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
  return { currentDoc };
};

const ShowProperties = ({ children, store }) => {
  const { currentDoc } = useDocument(store);
  const fileName = store.get("fileName") || "";
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ShowPropertiesButton, { ...props });
  const render = children || defaultChildren;
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(
    Modal,
    {
      ariaControlsSuffix: "properties",
      target: (toggle) => render({
        onClick: toggle
      }),
      content: (toggle) => /* @__PURE__ */ React__namespace.createElement(PropertiesModal, { doc: currentDoc, fileName, onToggle: toggle }),
      closeOnClickOutside: true,
      closeOnEscape: true
    }
  ) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const ShowPropertiesMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.properties ? l10n.properties.showProperties : "Show properties";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(InfoIcon, null), testId: "properties__menu", onClick }, label);
};

const propertiesPlugin = () => {
  const store = React__namespace.useMemo(
    () => createStore({
      fileName: ""
    }),
    []
  );
  const ShowPropertiesDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(ShowProperties, { ...props, store });
  const ShowPropertiesButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ShowProperties, { store });
  const ShowPropertiesMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(ShowPropertiesDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(ShowPropertiesMenuItem, { ...p }));
  return {
    onDocumentLoad: (props) => {
      store.update("doc", props.doc);
    },
    onViewerStateChange: (viewerState) => {
      store.update("fileName", viewerState.file.name);
      return viewerState;
    },
    ShowProperties: ShowPropertiesDecorator,
    ShowPropertiesButton: ShowPropertiesButtonDecorator,
    ShowPropertiesMenuItem: ShowPropertiesMenuItemDecorator
  };
};

exports.InfoIcon = InfoIcon;
exports.propertiesPlugin = propertiesPlugin;
