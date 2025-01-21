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

var styles$u = {"button":"rpv_62094e2d","buttonRtl":"rpv_98e1a8fd"};

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
        [styles$u.button]: true,
        [styles$u.buttonRtl]: isRtl
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

var styles$t = {"menu":"rpv_223ba50d","menuRtl":"rpv_baed661d"};

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
        [styles$t.menu]: true,
        [styles$t.menuRtl]: isRtl
      }),
      role: "menu",
      tabIndex: 0
    },
    children
  );
};

var styles$s = {"divider":"rpv_316d3906"};

const MenuDivider = () => /* @__PURE__ */ React__namespace.createElement("div", { "aria-orientation": "horizontal", className: styles$s.divider, role: "separator" });

var styles$r = {"icon":"rpv_2a5a054d","iconRtl":"rpv_81d01ddd"};

const Icon = ({ children, ignoreDirection = false, size = 24 }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = !ignoreDirection && direction === TextDirection.RightToLeft;
  const width = `${size || 24}px`;
  return /* @__PURE__ */ React__namespace.createElement(
    "svg",
    {
      "aria-hidden": "true",
      className: classNames({
        [styles$r.icon]: true,
        [styles$r.iconRtl]: isRtl
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

var styles$q = {"item":"rpv_abc2baee","itemDisabled":"rpv_6e088b8a","itemLtr":"rpv_f9f8621c","itemRtl":"rpv_f9f8789c","icon":"rpv_abc27c54","iconLtr":"rpv_dd835ef6","iconRtl":"rpv_dd837576","label":"rpv_ccb63a79","labelLtr":"rpv_8a1fb2b1","labelRtl":"rpv_8a1fc931","checkLtr":"rpv_5a82a41d","checkRtl":"rpv_5a82ba9d"};

const MenuItem = ({ checked = false, children, icon = null, isDisabled = false, testId, onClick }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attrs = testId ? { "data-testid": testId } : {};
  return /* @__PURE__ */ React__namespace.createElement(
    "button",
    {
      className: classNames({
        [styles$q.item]: true,
        [styles$q.itemDisabled]: isDisabled,
        [styles$q.itemLtr]: !isRtl,
        [styles$q.itemRtl]: isRtl
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
          [styles$q.icon]: true,
          [styles$q.iconLtr]: !isRtl,
          [styles$q.iconRtl]: isRtl
        })
      },
      icon
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$q.label]: true,
          [styles$q.labelLtr]: !isRtl,
          [styles$q.labelRtl]: isRtl
        })
      },
      children
    ),
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$q.checkLtr]: !isRtl,
          [styles$q.checkRtl]: isRtl
        })
      },
      checked && /* @__PURE__ */ React__namespace.createElement(CheckIcon, null)
    )
  );
};

var styles$p = {"button":"rpv_799dde0c","buttonDisabled":"rpv_ec15b0a8","buttonRtl":"rpv_aa3418be","buttonSelected":"rpv_22f568c7"};

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
        [styles$p.button]: true,
        [styles$p.buttonDisabled]: isDisabled,
        [styles$p.buttonRtl]: isRtl,
        [styles$p.buttonSelected]: isSelected
      }),
      type: "button",
      onClick,
      ...attrs
    },
    children
  );
};

var styles$o = {"bar":"rpv_2affa46c","barRtl":"rpv_cb60365e","progress":"rpv_a1cee974"};

const ProgressBar = ({ progress }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles$o.bar]: true,
        [styles$o.barRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$o.progress, style: { width: `${progress}%` } }, progress, "%")
  );
};

var styles$n = {"separator":"rpv_dbdc0dfd"};

const Separator = () => /* @__PURE__ */ React__namespace.createElement("div", { className: styles$n.separator });

var styles$m = {"spinner":"rpv_fd7f1e65","spinnerAnimation":"rpv_77b97e9f","spinner-animation":"rpv_2980221c"};

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
        [styles$m.spinner]: true,
        [styles$m.spinnerAnimation]: visible
      }),
      ref: containerRef,
      style: { height: size, width: size }
    }
  );
};

var styles$l = {"textbox":"rpv_5acb480f","textboxRtl":"rpv_ce17cbdb"};

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
      [styles$l.textbox]: true,
      [styles$l.textboxRtl]: isRtl
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

var styles$k = {"overlay":"rpv_2205272","body":"rpv_509faec0","bodyRtl":"rpv_46721b8a"};

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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$k.overlay, ref: overlayRef }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "aria-modal": "true",
      className: classNames({
        [styles$k.body]: true,
        [styles$k.bodyRtl]: isRtl
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

var styles$j = {"body":"rpv_33f641c8","bodyArrow":"rpv_19dd1f21","bodyRtl":"rpv_de324b82"};

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

var styles$i = {"arrow":"rpv_add41145","arrowTopLeft":"rpv_ee9ba1f7","arrowTopCenter":"rpv_a6e31245","arrowTopRight":"rpv_e52efe2c","arrowRightTop":"rpv_c9e661fe","arrowRightCenter":"rpv_3356ff0c","arrowRightBottom":"rpv_3231cce2","arrowBottomLeft":"rpv_d8db7bf7","arrowBottomCenter":"rpv_946c45","arrowBottomRight":"rpv_42ea642c","arrowLeftTop":"rpv_35de56c9","arrowLeftCenter":"rpv_9f46d261","arrowLeftBottom":"rpv_9e21a037"};

const Arrow = ({ customClassName, position }) => /* @__PURE__ */ React__namespace.createElement(
  "div",
  {
    className: classNames({
      [styles$i.arrow]: true,
      [styles$i.arrowTopLeft]: position === Position.TopLeft,
      [styles$i.arrowTopCenter]: position === Position.TopCenter,
      [styles$i.arrowTopRight]: position === Position.TopRight,
      [styles$i.arrowRightTop]: position === Position.RightTop,
      [styles$i.arrowRightCenter]: position === Position.RightCenter,
      [styles$i.arrowRightBottom]: position === Position.RightBottom,
      [styles$i.arrowBottomLeft]: position === Position.BottomLeft,
      [styles$i.arrowBottomCenter]: position === Position.BottomCenter,
      [styles$i.arrowBottomRight]: position === Position.BottomRight,
      [styles$i.arrowLeftTop]: position === Position.LeftTop,
      [styles$i.arrowLeftCenter]: position === Position.LeftCenter,
      [styles$i.arrowLeftBottom]: position === Position.LeftBottom,
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
        [styles$j.body]: true,
        [styles$j.bodyRtl]: isRtl
      }),
      id: `rpv-core__popover-body-${ariaControlsSuffix}`,
      ref: mergedContentRef,
      role: "dialog",
      tabIndex: -1
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$j.bodyArrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { id: innerId, ref: innerRef }, children)
  );
});
PopoverBody.displayName = "PopoverBody";

var styles$h = {"overlay":"rpv_9a8b66e"};

const PopoverOverlay = ({ children, closeOnEscape, onClose }) => {
  const containerRef = React__namespace.useRef(null);
  useEscapeStack(() => {
    if (closeOnEscape) {
      onClose();
    }
  });
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$h.overlay, ref: containerRef }, children);
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

var styles$g = {"body":"rpv_68737a2a","bodyRtl":"rpv_16369fe0","arrow":"rpv_a5ef4481","content":"rpv_4ba7c6f1"};

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
        [styles$g.body]: true,
        [styles$g.bodyRtl]: isRtl
      }),
      id: `rpv-core__tooltip-body-${ariaControlsSuffix}`,
      ref,
      role: "tooltip"
    },
    /* @__PURE__ */ React__namespace.createElement(Arrow, { customClassName: styles$g.arrow, position }),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$g.content }, children)
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

const BreakpointContext = React__namespace.createContext(Breakpoint.ExtraSmall);

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
function createStore(initialState) {
  let state = initialState || {};
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
var RotateDirection = /* @__PURE__ */ ((RotateDirection2) => {
  RotateDirection2["Backward"] = "Backward";
  RotateDirection2["Forward"] = "Forward";
  return RotateDirection2;
})(RotateDirection || {});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var ScrollMode = /* @__PURE__ */ ((ScrollMode2) => {
  ScrollMode2["Page"] = "Page";
  ScrollMode2["Horizontal"] = "Horizontal";
  ScrollMode2["Vertical"] = "Vertical";
  ScrollMode2["Wrapped"] = "Wrapped";
  return ScrollMode2;
})(ScrollMode || {});

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
var ViewMode = /* @__PURE__ */ ((ViewMode2) => {
  ViewMode2["DualPage"] = "DualPage";
  ViewMode2["DualPageWithCover"] = "DualPageWithCover";
  ViewMode2["SinglePage"] = "SinglePage";
  return ViewMode2;
})(ViewMode || {});

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

var styles$f = {"grab":"rpv_548bac0a","grabbing":"rpv_8f90bb4a"};

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
    ele.classList.add(styles$f.grab);
    ele.classList.remove(styles$f.grabbing);
    document.removeEventListener("mousemove", onMouseMoveHandler);
    document.removeEventListener("mouseup", onMouseUpHandler);
  };
  const onMouseDownHandler = (e) => {
    const ele = pagesRef.current;
    if (!ele || selectionMode === SelectionMode.Text) {
      return;
    }
    ele.classList.remove(styles$f.grab);
    ele.classList.add(styles$f.grabbing);
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
    selectionMode === SelectionMode.Hand ? ele.classList.add(styles$f.grab) : ele.classList.remove(styles$f.grab);
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

const MoreIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M12,0.5c1.381,0,2.5,1.119,2.5,2.5S13.381,5.5,12,5.5S9.5,4.381,9.5,3S10.619,0.5,12,0.5z
            M12,9.5
            c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5S9.5,13.381,9.5,12S10.619,9.5,12,9.5z
            M12,18.5c1.381,0,2.5,1.119,2.5,2.5
            s-1.119,2.5-2.5,2.5S9.5,22.381,9.5,21S10.619,18.5,12,18.5z`
  }
));

const MoreActionsPopover = ({ toolbarSlot }) => {
  const breakpoint = React__namespace.useContext(BreakpointContext);
  const isSmallBreakpoint = breakpoint === Breakpoint.ExtraSmall || breakpoint === Breakpoint.Small;
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const {
    DownloadMenuItem,
    EnterFullScreenMenuItem,
    GoToFirstPageMenuItem,
    GoToLastPageMenuItem,
    GoToNextPageMenuItem,
    GoToPreviousPageMenuItem,
    OpenMenuItem,
    PrintMenuItem,
    RotateBackwardMenuItem,
    RotateForwardMenuItem,
    ShowPropertiesMenuItem,
    SwitchScrollModeMenuItem,
    SwitchSelectionModeMenuItem,
    SwitchViewModeMenuItem,
    SwitchThemeMenuItem
  } = toolbarSlot;
  const renderTarget = (toggle, opened) => {
    const label = l10n && l10n.toolbar ? l10n.toolbar.moreActions : "More actions";
    return /* @__PURE__ */ React__namespace.createElement(
      Tooltip,
      {
        ariaControlsSuffix: "toolbar-more-actions",
        position: Position.BottomCenter,
        target: /* @__PURE__ */ React__namespace.createElement(
          MinimalButton,
          {
            ariaLabel: label,
            isSelected: opened,
            testId: "toolbar__more-actions-popover-target",
            onClick: toggle
          },
          /* @__PURE__ */ React__namespace.createElement(MoreIcon, null)
        ),
        content: () => label
      }
    );
  };
  const renderContent = (toggle) => {
    return /* @__PURE__ */ React__namespace.createElement(Menu, null, isSmallBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(SwitchThemeMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(EnterFullScreenMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(OpenMenuItem, null), /* @__PURE__ */ React__namespace.createElement(PrintMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(DownloadMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(MenuDivider, null)), /* @__PURE__ */ React__namespace.createElement(GoToFirstPageMenuItem, { onClick: toggle }), isSmallBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(GoToNextPageMenuItem, { onClick: toggle })), /* @__PURE__ */ React__namespace.createElement(GoToLastPageMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(MenuDivider, null), /* @__PURE__ */ React__namespace.createElement(RotateForwardMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(RotateBackwardMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(MenuDivider, null), /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeMenuItem, { mode: SelectionMode.Text, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeMenuItem, { mode: SelectionMode.Hand, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(MenuDivider, null), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: ScrollMode.Page, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: ScrollMode.Vertical, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: ScrollMode.Horizontal, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: ScrollMode.Wrapped, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(MenuDivider, null), !isSmallBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(SwitchViewModeMenuItem, { mode: ViewMode.SinglePage, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchViewModeMenuItem, { mode: ViewMode.DualPage, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchViewModeMenuItem, { mode: ViewMode.DualPageWithCover, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(MenuDivider, null)), /* @__PURE__ */ React__namespace.createElement(ShowPropertiesMenuItem, { onClick: toggle }));
  };
  return /* @__PURE__ */ React__namespace.createElement(
    Popover,
    {
      ariaControlsSuffix: "toolbar-more-actions",
      ariaHasPopup: "menu",
      position: Position.BottomCenter,
      target: renderTarget,
      content: renderContent,
      closeOnClickOutside: true,
      closeOnEscape: true
    }
  );
};

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

var styles$e = {"button":"rpv_603aaf14","buttonLtr":"rpv_4d1d3436","buttonRtl":"rpv_4d1d4ab6"};

const ExitFullScreenButton = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const exitFullScreenLabel = l10n && l10n.fullScreen ? l10n.fullScreen.exitFullScreen : "Exit full screen";
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles$e.button]: true,
        [styles$e.buttonLtr]: !isRtl,
        [styles$e.buttonRtl]: isRtl
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

var styles$d = {"overlay":"rpv_8f5c1bd3"};

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
  return fullScreenMode === FullScreenMode.Entering && /* @__PURE__ */ React__namespace.createElement("div", { className: styles$d.overlay }, /* @__PURE__ */ React__namespace.createElement(Spinner, null));
};

const ShortcutHandler$5 = ({ containerRef, getFullScreenTarget, store }) => {
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
        ShortcutHandler$5,
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

const DownloadIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M5.5,11.5c-.275,0-.341.159-.146.354l6.292,6.293a.5.5,0,0,0,.709,0l6.311-6.275c.2-.193.13-.353-.145-.355L15.5,11.5V1.5a1,1,0,0,0-1-1h-5a1,1,0,0,0-1,1V11a.5.5,0,0,1-.5.5Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M23.5,18.5v4a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1v-4" }));

const DownloadButton = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.download ? l10n.download.download : "Download";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "get-file",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(MinimalButton, { ariaLabel: label, testId: "get-file__download-button", onClick }, /* @__PURE__ */ React__namespace.createElement(DownloadIcon, null)),
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
const isChromeIOS = () => /iphone|ipod|ipad/i.test(navigator.userAgent) && /CriOS/i.test(navigator.userAgent);
const isSafariIOS = () => /iphone|ipod|ipad/i.test(navigator.userAgent) && !/CriOS/i.test(navigator.userAgent);
const encodeUint8Array = (data) => btoa(
  Array(data.length).fill("").map((_, i) => String.fromCharCode(data[i])).join("")
);
const download = (url, saveAs) => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", saveAs);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const downloadBlob = (data, saveAs, mimeType) => {
  const blobUrl = URL.createObjectURL(new Blob([data], { type: mimeType }));
  download(blobUrl, saveAs);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
  }
  return;
};
const downloadFile = (doc, saveAs) => {
  doc.getData().then((data) => {
    isSafariIOS() ? (
      // `application/pdf` is the correct MIME type for a PDF file. However, it's a known supported file type on iOS
      // and iOS will try to open the file instead of downloading it.
      // Using `application/octet-stream` forces iOS Safari to download the file
      downloadBlob(data, saveAs, "application/octet-stream")
    ) : isChromeIOS() ? download(`data:application/pdf;base64,${encodeUint8Array(data)}`, saveAs) : downloadBlob(data, saveAs, "application/pdf");
  });
};

const Download = ({ children, fileNameGenerator, store }) => {
  const [currentFile, setCurrentFile] = React__namespace.useState(store.get("file"));
  const [currentDocument, setCurrentDocument] = React__namespace.useState(store.get("doc"));
  const handleDocumentChanged = (doc) => {
    setCurrentDocument(doc);
  };
  const handleFileChanged = (file) => {
    setCurrentFile(file);
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    store.subscribe("file", handleFileChanged);
    return () => {
      store.subscribe("doc", handleDocumentChanged);
      store.unsubscribe("file", handleFileChanged);
    };
  }, []);
  const download = () => {
    if (currentDocument && currentFile) {
      downloadFile(currentDocument, fileNameGenerator(currentFile));
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(DownloadButton, { onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    onClick: download
  });
};

const DownloadMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.download ? l10n.download.download : "Download";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(DownloadIcon, null), testId: "get-file__download-menu", onClick }, label);
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getFileName$1 = (url) => {
  const str = url.split("/").pop();
  return str ? str.split("#")[0].split("?")[0] : url;
};

const getFilePlugin = (props) => {
  const store = React__namespace.useMemo(() => createStore({}), []);
  const defaultFileNameGenerator = (file) => file.name ? getFileName$1(file.name) : "document.pdf";
  const DownloadDecorator = (downloadProps) => /* @__PURE__ */ React__namespace.createElement(
    Download,
    {
      ...downloadProps,
      fileNameGenerator: props ? props.fileNameGenerator || defaultFileNameGenerator : defaultFileNameGenerator,
      store
    }
  );
  const DownloadButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(DownloadDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(DownloadButton, { ...props2 }));
  const DownloadMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(DownloadDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    DownloadMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  return {
    onDocumentLoad: (props2) => {
      store.update("doc", props2.doc);
      store.update("file", props2.file);
    },
    Download: DownloadDecorator,
    DownloadButton: DownloadButtonDecorator,
    DownloadMenuItem: DownloadMenuItemDecorator
  };
};

const OpenFileIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M18.5,7.5c.275,0,.341-.159.146-.354L12.354.854a.5.5,0,0,0-.708,0L5.354,7.147c-.2.195-.129.354.146.354h3v10a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V7.5Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M23.5,18.5v4a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1v-4" }));

var styles$c = {"container":"rpv_46d1c694","input":"rpv_bee9d35d"};

const useTriggerOpen = (store) => {
  const inputRef = React__namespace.useRef(null);
  const openFile = () => {
    const inputEle = inputRef.current;
    if (inputEle) {
      inputEle.click();
      if (store.get("triggerOpenFile")) {
        store.update("triggerOpenFile", false);
      }
    }
  };
  const handleOpenFileTriggered = (trigger) => {
    if (trigger) {
      openFile();
    }
  };
  React__namespace.useEffect(() => {
    store.subscribe("triggerOpenFile", handleOpenFileTriggered);
    return () => {
      store.unsubscribe("triggerOpenFile", handleOpenFileTriggered);
    };
  }, []);
  return {
    inputRef,
    openFile
  };
};

const OpenButton = ({ enableShortcuts, store, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.open ? l10n.open.openFile : "Open file";
  const { inputRef, openFile } = useTriggerOpen(store);
  const ariaKeyShortcuts = enableShortcuts ? isMac() ? "Meta+O" : "Ctrl+O" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "open",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement("div", { className: styles$c.container }, /* @__PURE__ */ React__namespace.createElement(
        "input",
        {
          accept: ".pdf",
          className: styles$c.input,
          multiple: false,
          ref: inputRef,
          tabIndex: -1,
          title: "",
          type: "file",
          onChange: onClick
        }
      ), /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "open__button",
          onClick: openFile
        },
        /* @__PURE__ */ React__namespace.createElement(OpenFileIcon, null)
      )),
      content: () => label
    }
  );
};

const Open = ({ children, enableShortcuts, store }) => {
  const handleOpenFiles = (e) => {
    const files = e.target.files;
    if (!files || !files.length) {
      return;
    }
    const openFile = store.get("openFile");
    if (openFile) {
      openFile(files[0]);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(OpenButton, { enableShortcuts, store, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    onClick: handleOpenFiles
  });
};

const OpenMenuItem = ({ store, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const label = l10n && l10n.open ? l10n.open.openFile : "Open file";
  const { inputRef, openFile } = useTriggerOpen(store);
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(OpenFileIcon, null), testId: "open__menu", onClick: openFile }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$c.container }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      accept: ".pdf",
      className: styles$c.input,
      multiple: false,
      ref: inputRef,
      tabIndex: -1,
      title: "",
      type: "file",
      onChange: onClick
    }
  ), label));
};

const ShortcutHandler$4 = ({ containerRef, store }) => {
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element || e.shiftKey || e.altKey || e.key !== "o") {
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
      store.update("triggerOpenFile", true);
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

const openPlugin = (props) => {
  const openPluginProps = React__namespace.useMemo(() => Object.assign({}, { enableShortcuts: true }, props), []);
  const store = React__namespace.useMemo(() => createStore({}), []);
  const OpenDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Open, { enableShortcuts: openPluginProps.enableShortcuts, ...props2, store });
  const OpenButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(OpenDecorator, null);
  const OpenMenuItemDecorator = () => /* @__PURE__ */ React__namespace.createElement(OpenDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(OpenMenuItem, { store, onClick: p.onClick }));
  const renderViewer = (props2) => {
    const { slot } = props2;
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, openPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler$4, { containerRef: props2.containerRef, store }), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  return {
    install: (pluginFunctions) => {
      store.update("openFile", pluginFunctions.openFile);
    },
    renderViewer,
    Open: OpenDecorator,
    OpenButton: OpenButtonDecorator,
    OpenMenuItem: OpenMenuItemDecorator
  };
};

const DownArrowIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M2.32,2.966h19.452c0.552,0.001,1,0.449,0.999,1.001c0,0.182-0.05,0.36-0.144,0.516L12.9,20.552
            c-0.286,0.472-0.901,0.624-1.373,0.338c-0.138-0.084-0.254-0.2-0.338-0.338L1.465,4.483C1.179,4.01,1.331,3.396,1.804,3.11
            C1.96,3.016,2.138,2.966,2.32,2.966z`
  }
));

const NextIcon$1 = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M0.541,5.627L11.666,18.2c0.183,0.207,0.499,0.226,0.706,0.043c0.015-0.014,0.03-0.028,0.043-0.043
            L23.541,5.627`
  }
));

const PreviousIcon$1 = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
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

var styles$b = {"container":"rpv_638e1576"};

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
  return /* @__PURE__ */ React__namespace.createElement("span", { className: styles$b.container }, /* @__PURE__ */ React__namespace.createElement(
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

const useDocument$2 = (store) => {
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
  const currentDoc = useDocument$2(store);
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
        /* @__PURE__ */ React__namespace.createElement(NextIcon$1, null)
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
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(NextIcon$1, null), isDisabled, testId: "page-navigation__next-menu", onClick }, label);
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
        /* @__PURE__ */ React__namespace.createElement(PreviousIcon$1, null)
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
      icon: /* @__PURE__ */ React__namespace.createElement(PreviousIcon$1, null),
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

const ShortcutHandler$3 = ({ containerRef, numPages, store }) => {
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
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(ShortcutHandler$3, { containerRef: props2.containerRef, numPages: props2.doc.numPages, store }), slot.children)
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

var styles$a = {"body":"rpv_6708d99b","footer":"rpv_cf113b54"};

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
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$a.body }, l10n && l10n.print ? l10n.print.disallowPrint : "The document does not allow to print"), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$a.footer }, /* @__PURE__ */ React__namespace.createElement(Button, { onClick: close }, l10n && l10n.print ? l10n.print.close : "Close")));
      },
      isOpened: true
    }
  );
};

var styles$9 = {"container":"rpv_ede6da6e","inner":"rpv_cf06dac3","innerRtl":"rpv_eeaccca7","progress":"rpv_9b3f42a0","message":"rpv_ed452534"};

const PrintProgress = ({ numLoadedPages, numPages, onCancel }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const progress = Math.floor(numLoadedPages * 100 / numPages);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$9.container }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: classNames({
        [styles$9.inner]: true,
        [styles$9.innerRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$9.message }, l10n && l10n.print ? l10n.print.preparingDocument : "Preparing document ..."),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$9.progress }, /* @__PURE__ */ React__namespace.createElement(ProgressBar, { progress })),
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

var styles$8 = {"page":"rpv_3441ef3f","image":"rpv_539eb2ab"};

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
  return src && /* @__PURE__ */ React__namespace.createElement("div", { className: styles$8.page }, /* @__PURE__ */ React__namespace.createElement(
    "img",
    {
      className: styles$8.image,
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

var styles$7 = {"zone":"rpv_ef75ad00","htmlPrinting":"rpv_1f5dd034","bodyPrinting":"rpv_f9a11b2b"};

const PrintZone = ({ doc, numLoadedPages, pagesRotation, pageSizes, printPages, printStatus, rotation, onCancel, onLoad }) => {
  const canvas = React__namespace.useMemo(() => document.createElement("canvas"), []);
  const container = React__namespace.useMemo(() => {
    const zoneEle = document.querySelector(`.${styles$7.zone}`);
    if (zoneEle) {
      return zoneEle;
    }
    const div = document.createElement("div");
    div.classList.add(styles$7.zone);
    div.setAttribute("data-testid", "print__zone");
    document.body.appendChild(div);
    return div;
  }, []);
  React__namespace.useEffect(() => {
    if (printStatus === PrintStatus.Ready) {
      document.documentElement.classList.add(styles$7.htmlPrinting);
      document.body.classList.add(styles$7.bodyPrinting);
      window.print();
    }
    const handler = () => {
      if (printStatus === PrintStatus.Ready) {
        document.documentElement.classList.remove(styles$7.htmlPrinting);
        document.body.classList.remove(styles$7.bodyPrinting);
        const zones = document.querySelectorAll(`.${styles$7.zone}`);
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

const ShortcutHandler$2 = ({ containerRef, store }) => {
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
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, printPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler$2, { containerRef: renderViewerProps.containerRef, store }), /* @__PURE__ */ React__namespace.createElement(
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

var styles$6 = {"loader":"rpv_1c26ac9a"};

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
  return data ? render(data) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$6.loader }, /* @__PURE__ */ React__namespace.createElement(Spinner, null));
};

var styles$5 = {"item":"rpv_6ea31738","itemRtl":"rpv_f50c4012","label":"rpv_65e1676f","value":"rpv_666e79ec"};

const PropertyItem = ({ label, value }) => {
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  return /* @__PURE__ */ React__namespace.createElement(
    "dl",
    {
      className: classNames({
        [styles$5.item]: true,
        [styles$5.itemRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("dt", { className: styles$5.label }, label, ":"),
    /* @__PURE__ */ React__namespace.createElement("dd", { className: styles$5.value }, value || "-")
  );
};

var styles$4 = {"modal":"rpv_255a805a","section":"rpv_650b4d52","footer":"rpv_7a08e58e"};

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
  const renderData = (data) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$4.section }, /* @__PURE__ */ React__namespace.createElement(
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
  )), /* @__PURE__ */ React__namespace.createElement(Separator, null), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$4.section }, /* @__PURE__ */ React__namespace.createElement(
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
  )), /* @__PURE__ */ React__namespace.createElement(Separator, null), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$4.section }, /* @__PURE__ */ React__namespace.createElement(
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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$4.modal }, /* @__PURE__ */ React__namespace.createElement(PropertiesLoader, { doc, render: renderData }), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$4.footer }, /* @__PURE__ */ React__namespace.createElement(Button, { onClick: onToggle }, l10n && l10n.properties ? l10n.properties.close : "Close")));
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

const useDocument$1 = (store) => {
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
  const { currentDoc } = useDocument$1(store);
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

const RotateBackwardIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M3.434,10.537c0.141-0.438,0.316-0.864,0.523-1.274
            M3.069,14.425C3.023,14.053,3,13.679,3,13.305 c0-0.291,0.014-0.579,0.041-0.863
            M4.389,18.111c-0.341-0.539-0.623-1.112-0.843-1.711
            M7.163,20.9 c-0.543-0.345-1.048-0.747-1.506-1.2
            M10.98,22.248c-0.65-0.074-1.29-0.218-1.909-0.431
            M10,4.25h2 c4.987,0.015,9.017,4.069,9.003,9.055c-0.013,4.581-3.456,8.426-8.008,8.945
            M13.5,1.75L10,4.25l3.5,2.5`
  }
));

const RotateForwardIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M20.566,10.537c-0.141-0.438-0.316-0.864-0.523-1.274
            M20.931,14.425C20.977,14.053,21,13.679,21,13.305 c0-0.291-0.014-0.579-0.041-0.863
            M19.611,18.111c0.341-0.539,0.624-1.114,0.843-1.713
            M16.837,20.9 c0.543-0.345,1.048-0.747,1.506-1.2
            M13.02,22.248c0.65-0.074,1.29-0.218,1.909-0.431
            M14,4.25h-2 c-4.987,0.015-9.017,4.069-9.003,9.055c0.013,4.581,3.456,8.426,8.008,8.945
            M10.5,1.75l3.5,2.5l-3.5,2.5`
  }
));

const RotateButton = ({ direction, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const backwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateBackward : "Rotate counterclockwise";
  const forwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateForward : "Rotate clockwise";
  const label = direction === RotateDirection.Backward ? backwardLabel : forwardLabel;
  const icon = direction === RotateDirection.Backward ? /* @__PURE__ */ React__namespace.createElement(RotateBackwardIcon, null) : /* @__PURE__ */ React__namespace.createElement(RotateForwardIcon, null);
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "rotate",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: label,
          testId: direction === RotateDirection.Backward ? "rotate__backward-button" : "rotate__forward-button",
          onClick
        },
        icon
      ),
      content: () => label
    }
  );
};

const Rotate = ({ children, direction, store }) => {
  const onClick = () => {
    const rotate = store.get("rotate");
    if (rotate) {
      rotate(direction);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(RotateButton, { direction: props.direction, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    direction,
    onClick
  });
};

const RotateMenuItem = ({ direction, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const backwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateBackward : "Rotate counterclockwise";
  const forwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateForward : "Rotate clockwise";
  const label = direction === RotateDirection.Backward ? backwardLabel : forwardLabel;
  const icon = direction === RotateDirection.Backward ? /* @__PURE__ */ React__namespace.createElement(RotateBackwardIcon, null) : /* @__PURE__ */ React__namespace.createElement(RotateForwardIcon, null);
  return /* @__PURE__ */ React__namespace.createElement(
    MenuItem,
    {
      icon,
      testId: direction === RotateDirection.Backward ? "rotate__backward-menu" : "rotate__forward-menu",
      onClick
    },
    label
  );
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const RotatePage = ({ children, store }) => {
  const onRotatePage = (pageIndex, direction) => {
    const rotatePage = store.get("rotatePage");
    if (rotatePage) {
      rotatePage(pageIndex, direction);
    }
  };
  return children({
    onRotatePage
  });
};

const rotatePlugin = () => {
  const store = React__namespace.useMemo(() => createStore(), []);
  const RotateDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(Rotate, { ...props, store });
  const RotateBackwardButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: RotateDirection.Backward }, (props) => /* @__PURE__ */ React__namespace.createElement(RotateButton, { ...props }));
  const RotateBackwardMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: RotateDirection.Backward }, (p) => /* @__PURE__ */ React__namespace.createElement(
    RotateMenuItem,
    {
      direction: p.direction,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  const RotateForwardButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: RotateDirection.Forward }, (props) => /* @__PURE__ */ React__namespace.createElement(RotateButton, { ...props }));
  const RotateForwardMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: RotateDirection.Forward }, (p) => /* @__PURE__ */ React__namespace.createElement(
    RotateMenuItem,
    {
      direction: p.direction,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  const RotatePageDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(RotatePage, { ...props, store });
  return {
    install: (pluginFunctions) => {
      store.update("rotate", pluginFunctions.rotate);
      store.update("rotatePage", pluginFunctions.rotatePage);
    },
    Rotate: RotateDecorator,
    RotateBackwardButton: RotateBackwardButtonDecorator,
    RotateBackwardMenuItem: RotateBackwardMenuItemDecorator,
    RotateForwardButton: RotateForwardButtonDecorator,
    RotateForwardMenuItem: RotateForwardMenuItemDecorator,
    RotatePage: RotatePageDecorator
  };
};

const DualPageCoverViewModeIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("rect", { x: "0.5", y: "0.497", width: "22", height: "22", rx: "1", ry: "1" }), /* @__PURE__ */ React__namespace.createElement("line", { x1: "0.5", y1: "6.497", x2: "22.5", y2: "6.497" }), /* @__PURE__ */ React__namespace.createElement("line", { x1: "11.5", y1: "6.497", x2: "11.5", y2: "22.497" }));

const DualPageViewModeIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("rect", { x: "0.5", y: "0.497", width: "22", height: "22", rx: "1", ry: "1" }), /* @__PURE__ */ React__namespace.createElement("line", { x1: "11.5", y1: "0.497", x2: "11.5", y2: "22.497" }));

const HorizontalScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M6.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z
            M14.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z
            M22.5,21.5 c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z`
  }
));

const PageScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("rect", { x: "0.5", y: "0.497", width: "22", height: "22", rx: "1", ry: "1" }));

const VerticalScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M23.5,5.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V5.5z
            M23.5,13.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V13.5z
            M23.5,21.5 c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V21.5z`
  }
));

const WrappedScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z
            M23.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z
            M10.5,22.5 c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z
            M23.5,22.5c0,0.552-0.448,1-1,1 h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z`
  }
));

const SwitchScrollModeDecorator = ({ children, mode, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  let label = "";
  let icon = /* @__PURE__ */ React__namespace.createElement(VerticalScrollingIcon, null);
  switch (mode) {
    case ScrollMode.Horizontal:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.horizontalScrolling : "Horizontal scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(HorizontalScrollingIcon, null);
      break;
    case ScrollMode.Page:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.pageScrolling : "Page scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(PageScrollingIcon, null);
      break;
    case ScrollMode.Wrapped:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.wrappedScrolling : "Wrapped scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(WrappedScrollingIcon, null);
      break;
    case ScrollMode.Vertical:
    default:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.verticalScrolling : "Vertical scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(VerticalScrollingIcon, null);
      break;
  }
  return children({ icon, label, onClick });
};

const SwitchScrollModeButton = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case ScrollMode.Horizontal:
      testId = "scroll-mode__horizontal-button";
      break;
    case ScrollMode.Page:
      testId = "scroll-mode__page-button";
      break;
    case ScrollMode.Wrapped:
      testId = "scroll-mode__wrapped-button";
      break;
    case ScrollMode.Vertical:
    default:
      testId = "scroll-mode__vertical-button";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "scroll-mode-switch",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: props.label,
          isDisabled,
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

const switchScrollMode = (store, scrollMode) => {
  store.get("switchScrollMode")(scrollMode);
  const currentViewMode = store.get("viewMode");
  if ((scrollMode === ScrollMode.Horizontal || scrollMode === ScrollMode.Wrapped) && currentViewMode !== ViewMode.SinglePage) {
    store.get("switchViewMode")(ViewMode.SinglePage);
  }
};

const useScrollMode = (store) => {
  const [scrollMode, setScrollMode] = React__namespace.useState(store.get("scrollMode") || ScrollMode.Vertical);
  const handleScrollModeChanged = (currentScrollMode) => {
    setScrollMode(currentScrollMode);
  };
  React__namespace.useEffect(() => {
    store.subscribe("scrollMode", handleScrollModeChanged);
    return () => {
      store.unsubscribe("scrollMode", handleScrollModeChanged);
    };
  }, []);
  return { scrollMode };
};

const useViewMode = (store) => {
  const [viewMode, setViewMode] = React__namespace.useState(store.get("viewMode") || ViewMode.SinglePage);
  const handleViewModeChanged = (currentViewMode) => {
    setViewMode(currentViewMode);
  };
  React__namespace.useEffect(() => {
    store.subscribe("viewMode", handleViewModeChanged);
    return () => {
      store.unsubscribe("viewMode", handleViewModeChanged);
    };
  }, []);
  return { viewMode };
};

const SwitchScrollMode = ({ children, mode, store }) => {
  const { viewMode } = useViewMode(store);
  const { scrollMode } = useScrollMode(store);
  const onClick = () => {
    switchScrollMode(store, mode);
  };
  const isSelected = scrollMode === mode;
  const isDisabled = (mode === ScrollMode.Horizontal || mode === ScrollMode.Wrapped) && viewMode !== ViewMode.SinglePage;
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(
    SwitchScrollModeButton,
    {
      isDisabled,
      isSelected,
      mode: props.mode,
      onClick: props.onClick
    }
  );
  const render = children || defaultChildren;
  return render({
    isDisabled,
    isSelected,
    mode,
    onClick
  });
};

const SwitchScrollModeMenuItem = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case ScrollMode.Horizontal:
      testId = "scroll-mode__horizontal-menu";
      break;
    case ScrollMode.Page:
      testId = "scroll-mode__page-menu";
      break;
    case ScrollMode.Wrapped:
      testId = "scroll-mode__wrapped-menu";
      break;
    case ScrollMode.Vertical:
    default:
      testId = "scroll-mode__vertical-menu";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    MenuItem,
    {
      checked: isSelected,
      icon: props.icon,
      isDisabled,
      testId,
      onClick: props.onClick
    },
    props.label
  ));
};

const SwitchViewModeDecorator = ({ children, mode, onClick }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  let label = "";
  let icon = /* @__PURE__ */ React__namespace.createElement(PageScrollingIcon, null);
  switch (mode) {
    case ViewMode.DualPage:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.dualPage : "Dual page";
      icon = /* @__PURE__ */ React__namespace.createElement(DualPageViewModeIcon, null);
      break;
    case ViewMode.DualPageWithCover:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.dualPageCover : "Dual page with cover";
      icon = /* @__PURE__ */ React__namespace.createElement(DualPageCoverViewModeIcon, null);
      break;
    case ViewMode.SinglePage:
    default:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.singlePage : "Single page";
      icon = /* @__PURE__ */ React__namespace.createElement(PageScrollingIcon, null);
      break;
  }
  return children({ icon, label, onClick });
};

const SwitchViewModeButton = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case ViewMode.DualPage:
      testId = "view-mode__dual-button";
      break;
    case ViewMode.DualPageWithCover:
      testId = "view-mode__dual-cover-button";
      break;
    case ViewMode.SinglePage:
    default:
      testId = "view-mode__single-button";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "view-mode-switch",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        MinimalButton,
        {
          ariaLabel: props.label,
          isDisabled,
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

const switchViewMode = (store, viewMode) => {
  store.get("switchViewMode")(viewMode);
  const currentScrollMode = store.get("scrollMode");
  if ((currentScrollMode === ScrollMode.Horizontal || currentScrollMode === ScrollMode.Wrapped) && viewMode !== ViewMode.SinglePage) {
    store.get("switchScrollMode")(ScrollMode.Vertical);
  }
};

const SwitchViewMode = ({ children, mode, store }) => {
  const { viewMode } = useViewMode(store);
  const { scrollMode } = useScrollMode(store);
  const onClick = () => {
    switchViewMode(store, mode);
  };
  const isSelected = viewMode === mode;
  const isDisabled = (scrollMode === ScrollMode.Horizontal || scrollMode === ScrollMode.Wrapped) && mode !== ViewMode.SinglePage;
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(
    SwitchViewModeButton,
    {
      isDisabled,
      isSelected,
      mode: props.mode,
      onClick: props.onClick
    }
  );
  const render = children || defaultChildren;
  return render({
    isDisabled,
    isSelected,
    mode,
    onClick
  });
};

const SwitchViewModeMenuItem = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case ViewMode.DualPage:
      testId = "view-mode__dual-menu";
      break;
    case ViewMode.DualPageWithCover:
      testId = "view-mode__dual-cover-menu";
      break;
    case ViewMode.SinglePage:
    default:
      testId = "view-mode__single-menu";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    MenuItem,
    {
      checked: isSelected,
      icon: props.icon,
      isDisabled,
      testId,
      onClick: props.onClick
    },
    props.label
  ));
};

const scrollModePlugin = () => {
  const store = React__namespace.useMemo(
    () => createStore({
      scrollMode: ScrollMode.Vertical,
      viewMode: ViewMode.SinglePage,
      switchScrollMode: () => {
      },
      switchViewMode: () => {
      }
    }),
    []
  );
  const SwitchScrollModeDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchScrollMode, { ...props, store });
  const SwitchScrollModeButtonDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchScrollModeButton,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
      }
    }
  ));
  const SwitchScrollModeMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchScrollModeMenuItem,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  const SwitchViewModeDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchViewMode, { ...props, store });
  const SwitchViewModeButtonDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchViewModeButton,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
      }
    }
  ));
  const SwitchViewModeMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchViewModeMenuItem,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  return {
    install: (pluginFunctions) => {
      store.update("switchScrollMode", pluginFunctions.switchScrollMode);
      store.update("switchViewMode", pluginFunctions.switchViewMode);
    },
    // Plugin functions
    onViewerStateChange: (viewerState) => {
      store.update("scrollMode", viewerState.scrollMode);
      store.update("viewMode", viewerState.viewMode);
      return viewerState;
    },
    switchScrollMode: (scrollMode) => {
      switchScrollMode(store, scrollMode);
    },
    switchViewMode: (viewMode) => {
      switchViewMode(store, viewMode);
    },
    SwitchScrollMode: SwitchScrollModeDecorator,
    SwitchScrollModeButton: SwitchScrollModeButtonDecorator,
    SwitchScrollModeMenuItem: SwitchScrollModeMenuItemDecorator,
    SwitchViewMode: SwitchViewModeDecorator,
    SwitchViewModeButton: SwitchViewModeButtonDecorator,
    SwitchViewModeMenuItem: SwitchViewModeMenuItemDecorator
  };
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

var styles$3 = {"highlights":"rpv_5852b0f8","highlight":"rpv_a802aadb","highlightCurrent":"rpv_bd8fce1e"};

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
      className: styles$3.highlight,
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
    const highlightEle = container.querySelector(`.${styles$3.highlight}[data-index="${matchPosition.matchIndex}"]`);
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
        currentMatchRef.current.classList.remove(styles$3.highlightCurrent);
      }
      currentMatchRef.current = highlightEle;
      highlightEle.classList.add(styles$3.highlightCurrent);
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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.highlights, "data-testid": `search__highlights-${pageIndex}`, ref: containerRef }, renderHighlightElements({
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

const ShortcutHandler$1 = ({ containerRef, store }) => {
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

var styles$2 = {"popover":"rpv_be1278b5","inputCounter":"rpv_119fcec2","counter":"rpv_ea7700c","counterLtr":"rpv_4ee9303e","counterRtl":"rpv_4ee946be","label":"rpv_1a0edd04","checkbox":"rpv_380e43b3","footer":"rpv_1e5b198b","footerItem":"rpv_e0f04b3e","footerButtonLtr":"rpv_2013f20d","footerButtonRtl":"rpv_2014088d"};

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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.popover }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.inputCounter }, /* @__PURE__ */ React__namespace.createElement(
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
        [styles$2.counter]: true,
        [styles$2.counterLtr]: !isRtl,
        [styles$2.counterRtl]: isRtl
      })
    },
    isQuerying && /* @__PURE__ */ React__namespace.createElement(Spinner, { testId: "search__popover-searching", size: "1rem" }),
    !isQuerying && /* @__PURE__ */ React__namespace.createElement("span", { "data-testid": "search__popover-num-matches" }, currentMatch, "/", numberOfMatches)
  )), /* @__PURE__ */ React__namespace.createElement("label", { className: styles$2.label }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      className: styles$2.checkbox,
      "data-testid": "search__popover-match-case",
      checked: matchCase,
      type: "checkbox",
      onChange: onChangeMatchCase
    }
  ), " ", l10n && l10n.search ? l10n.search.matchCase : "Match case"), /* @__PURE__ */ React__namespace.createElement("label", { className: styles$2.label }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      className: styles$2.checkbox,
      checked: wholeWords,
      "data-testid": "search__popover-whole-words",
      type: "checkbox",
      onChange: onChangeWholeWords
    }
  ), " ", l10n && l10n.search ? l10n.search.wholeWords : "Whole words"), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.footer }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.footerItem }, /* @__PURE__ */ React__namespace.createElement(
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
  )), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.footerItem }, /* @__PURE__ */ React__namespace.createElement(
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
        [styles$2.footerButtonLtr]: !isRtl,
        [styles$2.footerButtonRtl]: isRtl
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
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, searchPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler$1, { containerRef: renderViewerProps.containerRef, store }), currentSlot.subSlot.children);
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

const DarkIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M19.5,15.106l2.4-2.4a1,1,0,0,0,0-1.414l-2.4-2.4V5.5a1,1,0,0,0-1-1H15.106l-2.4-2.4a1,1,0,0,0-1.414,0l-2.4,2.4H5.5a1,1,0,0,0-1,1V8.894l-2.4,2.4a1,1,0,0,0,0,1.414l2.4,2.4V18.5a1,1,0,0,0,1,1H8.894l2.4,2.4a1,1,0,0,0,1.414,0l2.4-2.4H18.5a1,1,0,0,0,1-1Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M10,6.349a6,6,0,0,1,0,11.3,6,6,0,1,0,0-11.3Z" }));

const LightIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M19.491,15.106l2.4-2.4a1,1,0,0,0,0-1.414l-2.4-2.4V5.5a1,1,0,0,0-1-1H15.1L12.7,2.1a1,1,0,0,0-1.414,0l-2.4,2.4H5.491a1,1,0,0,0-1,1V8.894l-2.4,2.4a1,1,0,0,0,0,1.414l2.4,2.4V18.5a1,1,0,0,0,1,1H8.885l2.4,2.4a1,1,0,0,0,1.414,0l2.4-2.4h3.394a1,1,0,0,0,1-1Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.491,6c4,0,6,2.686,6,6s-2,6-6,6Z" }));

const SwitchThemeButton = ({ onClick }) => {
  const theme = React__namespace.useContext(ThemeContext);
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const isDarkTheme = theme.currentTheme === "dark";
  const label = l10n && l10n.theme ? isDarkTheme ? l10n.theme.switchLightTheme : l10n.theme.switchDarkTheme : isDarkTheme ? "Switch to the light theme" : "Switch to the dark theme";
  return /* @__PURE__ */ React__namespace.createElement(
    Tooltip,
    {
      ariaControlsSuffix: "theme-switch",
      position: Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(MinimalButton, { ariaLabel: label, testId: "theme__switch-button", onClick }, isDarkTheme ? /* @__PURE__ */ React__namespace.createElement(LightIcon, null) : /* @__PURE__ */ React__namespace.createElement(DarkIcon, null)),
      content: () => label
    }
  );
};

const SwitchTheme = ({ children }) => {
  const theme = React__namespace.useContext(ThemeContext);
  const defaultChildern = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchThemeButton, { onClick: props.onClick });
  const render = children || defaultChildern;
  return render({
    onClick: () => theme.setCurrentTheme(theme.currentTheme === "dark" ? "light" : "dark")
  });
};

const SwitchThemeMenuItem = ({ onClick }) => {
  const theme = React__namespace.useContext(ThemeContext);
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const isDarkTheme = theme.currentTheme === "dark";
  const label = l10n && l10n.theme ? isDarkTheme ? l10n.theme.switchLightTheme : l10n.theme.switchDarkTheme : isDarkTheme ? "Switch to the light theme" : "Switch to the dark theme";
  return /* @__PURE__ */ React__namespace.createElement(MenuItem, { icon: isDarkTheme ? /* @__PURE__ */ React__namespace.createElement(LightIcon, null) : /* @__PURE__ */ React__namespace.createElement(DarkIcon, null), testId: "theme__switch-menu", onClick }, label);
};

const themePlugin = () => {
  const SwitchThemeDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchTheme, { ...props });
  const SwitchThemeButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(SwitchThemeDecorator, null, (props) => /* @__PURE__ */ React__namespace.createElement(SwitchThemeButton, { ...props }));
  const SwitchThemeMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchThemeDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchThemeMenuItem,
    {
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  return {
    SwitchTheme: SwitchThemeDecorator,
    SwitchThemeButton: SwitchThemeButtonDecorator,
    SwitchThemeMenuItem: SwitchThemeMenuItemDecorator
  };
};

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

var styles$1 = {"target":"rpv_97efec6c","scaleLtr":"rpv_40d5565b","scaleRtl":"rpv_40d56cdb","arrow":"rpv_3e2b1ce"};

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
    return /* @__PURE__ */ React__namespace.createElement(MinimalButton, { ariaLabel: zoomDocumentLabel, testId: "zoom__popover-target", onClick: click }, /* @__PURE__ */ React__namespace.createElement("span", { className: styles$1.target }, /* @__PURE__ */ React__namespace.createElement(
      "span",
      {
        "data-testid": "zoom__popover-target-scale",
        className: classNames({
          [styles$1.scaleLtr]: !isRtl,
          [styles$1.scaleRtl]: isRtl
        })
      },
      Math.round(scale * 100),
      "%"
    ), /* @__PURE__ */ React__namespace.createElement("span", { className: styles$1.arrow })));
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

var styles = {"toolbar":"rpv_fa73c6a8","toolbarRtl":"rpv_66fc1aa2","left":"rpv_9116fbfa","center":"rpv_97eff788","right":"rpv_921ee489","item":"rpv_9115d706","label":"rpv_91c6a161"};

const renderDefaultToolbar = (transformToolbarSlot) => (
  // eslint-disable-next-line react/display-name
  (defaultToolbarSlot) => {
    const toolbarSlot = React__namespace.useMemo(() => transformToolbarSlot(defaultToolbarSlot), []);
    const { direction } = React__namespace.useContext(ThemeContext);
    const breakpoint = React__namespace.useContext(BreakpointContext);
    const isMediumBreakpoint = breakpoint !== Breakpoint.ExtraSmall && breakpoint !== Breakpoint.Small;
    const isRtl = direction === TextDirection.RightToLeft;
    const {
      CurrentPageInput,
      Download,
      EnterFullScreen,
      GoToNextPage,
      GoToPreviousPage,
      NumberOfPages,
      Open,
      Print,
      ShowSearchPopover,
      SwitchTheme,
      Zoom,
      ZoomIn,
      ZoomOut
    } = toolbarSlot;
    return /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        "data-testid": "toolbar",
        className: classNames({
          [styles.toolbar]: true,
          [styles.toolbarRtl]: isRtl
        }),
        role: "toolbar",
        "aria-orientation": "horizontal"
      },
      /* @__PURE__ */ React__namespace.createElement("div", { className: styles.left }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(ShowSearchPopover, null)), breakpoint !== Breakpoint.ExtraSmall && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(GoToPreviousPage, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(CurrentPageInput, null), /* @__PURE__ */ React__namespace.createElement("span", { className: styles.label }, /* @__PURE__ */ React__namespace.createElement(NumberOfPages, null))), breakpoint !== Breakpoint.ExtraSmall && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(GoToNextPage, null))),
      /* @__PURE__ */ React__namespace.createElement("div", { className: styles.center }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(ZoomOut, null)), breakpoint !== Breakpoint.ExtraSmall && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Zoom, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(ZoomIn, null))),
      /* @__PURE__ */ React__namespace.createElement("div", { className: styles.right }, isMediumBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(SwitchTheme, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(EnterFullScreen, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Open, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Download, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Print, null))), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(MoreActionsPopover, { toolbarSlot })))
    );
  }
);

const defaultTransform = (slot) => {
  const { NumberOfPages } = slot;
  return Object.assign({}, slot, {
    NumberOfPages: () => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, "/ ", /* @__PURE__ */ React__namespace.createElement(NumberOfPages, null))
  });
};
const DefaultToobar = (toolbarSlot) => renderDefaultToolbar(defaultTransform)(toolbarSlot);

const Toolbar = ({ children, slot }) => {
  const render = children || DefaultToobar;
  return render(slot);
};

const toolbarPlugin = (props) => {
  const fullScreenPluginInstance = fullScreenPlugin(props ? props.fullScreenPlugin : {});
  const getFilePluginInstance = getFilePlugin(props ? props.getFilePlugin : {});
  const openPluginInstance = openPlugin(props ? props.openPlugin : {});
  const pageNavigationPluginInstance = pageNavigationPlugin(props ? props.pageNavigationPlugin : {});
  const printPluginInstance = printPlugin(props ? props.printPlugin : {});
  const propertiesPluginInstance = propertiesPlugin();
  const rotatePluginInstance = rotatePlugin();
  const scrollModePluginInstance = scrollModePlugin();
  const searchPluginInstance = searchPlugin(props ? props.searchPlugin : {});
  const selectionModePluginInstance = selectionModePlugin(props ? props.selectionModePlugin : {});
  const themePluginInstance = themePlugin();
  const zoomPluginInstance = zoomPlugin(props ? props.zoomPlugin : {});
  const plugins = [
    fullScreenPluginInstance,
    getFilePluginInstance,
    openPluginInstance,
    pageNavigationPluginInstance,
    printPluginInstance,
    propertiesPluginInstance,
    rotatePluginInstance,
    scrollModePluginInstance,
    searchPluginInstance,
    selectionModePluginInstance,
    themePluginInstance,
    zoomPluginInstance
  ];
  const ToolbarDecorator = React__namespace.useCallback((props2) => {
    const { EnterFullScreen, EnterFullScreenMenuItem } = fullScreenPluginInstance;
    const { Download, DownloadMenuItem } = getFilePluginInstance;
    const { Open, OpenMenuItem } = openPluginInstance;
    const {
      CurrentPageInput,
      CurrentPageLabel,
      GoToFirstPage,
      GoToFirstPageMenuItem,
      GoToLastPage,
      GoToLastPageMenuItem,
      GoToNextPage,
      GoToNextPageMenuItem,
      GoToPreviousPage,
      GoToPreviousPageMenuItem,
      NumberOfPages
    } = pageNavigationPluginInstance;
    const { Print, PrintMenuItem } = printPluginInstance;
    const { ShowProperties, ShowPropertiesMenuItem } = propertiesPluginInstance;
    const { Rotate, RotateBackwardMenuItem, RotateForwardMenuItem } = rotatePluginInstance;
    const { SwitchScrollMode, SwitchScrollModeMenuItem, SwitchViewMode, SwitchViewModeMenuItem } = scrollModePluginInstance;
    const { Search, ShowSearchPopover } = searchPluginInstance;
    const { SwitchSelectionMode, SwitchSelectionModeMenuItem } = selectionModePluginInstance;
    const { SwitchTheme, SwitchThemeMenuItem } = themePluginInstance;
    const { CurrentScale, Zoom, ZoomIn, ZoomInMenuItem, ZoomOut, ZoomOutMenuItem } = zoomPluginInstance;
    return /* @__PURE__ */ React__namespace.createElement(
      Toolbar,
      {
        ...props2,
        slot: {
          CurrentPageInput,
          CurrentPageLabel,
          CurrentScale,
          Download,
          DownloadMenuItem,
          EnterFullScreen,
          EnterFullScreenMenuItem,
          GoToFirstPage,
          GoToFirstPageMenuItem,
          GoToLastPage,
          GoToLastPageMenuItem,
          GoToNextPage,
          GoToNextPageMenuItem,
          GoToPreviousPage,
          GoToPreviousPageMenuItem,
          NumberOfPages,
          Open,
          OpenMenuItem,
          Print,
          PrintMenuItem,
          Rotate,
          RotateBackwardMenuItem,
          RotateForwardMenuItem,
          Search,
          ShowProperties,
          ShowPropertiesMenuItem,
          ShowSearchPopover,
          SwitchScrollMode,
          SwitchScrollModeMenuItem,
          SwitchSelectionMode,
          SwitchSelectionModeMenuItem,
          SwitchViewMode,
          SwitchViewModeMenuItem,
          SwitchTheme,
          SwitchThemeMenuItem,
          Zoom,
          ZoomIn,
          ZoomInMenuItem,
          ZoomOut,
          ZoomOutMenuItem
        }
      }
    );
  }, []);
  return {
    // Plugin instances
    fullScreenPluginInstance,
    getFilePluginInstance,
    openPluginInstance,
    pageNavigationPluginInstance,
    printPluginInstance,
    propertiesPluginInstance,
    rotatePluginInstance,
    scrollModePluginInstance,
    searchPluginInstance,
    selectionModePluginInstance,
    themePluginInstance,
    zoomPluginInstance,
    dependencies: plugins,
    renderDefaultToolbar,
    Toolbar: ToolbarDecorator
  };
};

exports.MoreActionsPopover = MoreActionsPopover;
exports.MoreIcon = MoreIcon;
exports.toolbarPlugin = toolbarPlugin;
