'use strict';

var React = require('react');
require('react-dom');

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

var styles$6 = {"spinner":"rpv_fd7f1e65","spinnerAnimation":"rpv_77b97e9f","spinner-animation":"rpv_2980221c"};

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
        [styles$6.spinner]: true,
        [styles$6.spinnerAnimation]: visible
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

[
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
const getFileName = (url) => {
  const str = url.split("/").pop();
  return str ? str.split("#")[0].split("?")[0] : url;
};

const downloadFile = (url, data) => {
  const blobUrl = typeof data === "string" ? "" : URL.createObjectURL(new Blob([data], { type: "" }));
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = blobUrl || url;
  link.setAttribute("download", getFileName(url));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
  }
};

var styles$2 = {"list":"rpv_74ff328a","listRtl":"rpv_d9b8b80","item":"rpv_74fdfcff"};

const AttachmentList = ({ files }) => {
  const containerRef = React__namespace.useRef(null);
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const attachmentItemsRef = React__namespace.useRef([]);
  const clickDownloadLabel = l10n && l10n.attachment ? l10n.attachment.clickToDownload : "Click to download";
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveToItem((items, activeEle) => items.indexOf(activeEle) + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveToItem((items, activeEle) => items.indexOf(activeEle) - 1);
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
  const moveToItem = (getItemIndex) => {
    const container = containerRef.current;
    const attachmentItems = [].slice.call(container.getElementsByClassName(styles$2.item));
    if (attachmentItems.length === 0) {
      return;
    }
    attachmentItems.forEach((item) => item.setAttribute("tabindex", "-1"));
    const activeEle = document.activeElement;
    const targetIndex = Math.min(
      attachmentItems.length - 1,
      Math.max(0, getItemIndex(attachmentItems, activeEle))
    );
    const targetEle = attachmentItems[targetIndex];
    targetEle.setAttribute("tabindex", "0");
    targetEle.focus();
  };
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const attachmentItems = [].slice.call(container.getElementsByClassName(styles$2.item));
    attachmentItemsRef.current = attachmentItems;
    if (attachmentItems.length > 0) {
      const firstItem = attachmentItems[0];
      firstItem.focus();
      firstItem.setAttribute("tabindex", "0");
    }
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "attachment__list",
      className: classNames({
        [styles$2.list]: true,
        [styles$2.listRtl]: isRtl
      }),
      ref: containerRef,
      tabIndex: -1,
      onKeyDown: handleKeyDown
    },
    files.map((file) => /* @__PURE__ */ React__namespace.createElement(
      "button",
      {
        className: styles$2.item,
        key: file.fileName,
        tabIndex: -1,
        title: clickDownloadLabel,
        type: "button",
        onClick: () => downloadFile(file.fileName, file.data)
      },
      file.fileName
    ))
  );
};

var styles$1 = {"empty":"rpv_a9033fd6","emptyRtl":"rpv_3122eab4"};

const AttachmentLoader = ({ doc }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const noAttachmentLabel = l10n && l10n.attachment ? l10n.attachment.noAttachment : "There is no attachment";
  const [attachments, setAttachments] = React__namespace.useState({
    files: [],
    isLoaded: false
  });
  React__namespace.useEffect(() => {
    doc.getAttachments().then((response) => {
      const files = response ? Object.keys(response).map((file) => {
        return {
          data: response[file].content,
          fileName: response[file].filename
        };
      }) : [];
      setAttachments({
        files,
        isLoaded: true
      });
    });
  }, [doc]);
  return !attachments.isLoaded ? /* @__PURE__ */ React__namespace.createElement(Spinner, null) : attachments.files.length === 0 ? /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "attachment__empty",
      className: classNames({
        [styles$1.empty]: true,
        [styles$1.emptyRtl]: isRtl
      })
    },
    noAttachmentLabel
  ) : /* @__PURE__ */ React__namespace.createElement(AttachmentList, { files: attachments.files });
};

var styles = {"container":"rpv_fdd432ce"};

const AttachmentListWithStore = ({ store }) => {
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
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(AttachmentLoader, { doc: currentDoc }) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(Spinner, null));
};

const attachmentPlugin = () => {
  const store = React__namespace.useMemo(() => createStore({}), []);
  const AttachmentsDecorator = () => /* @__PURE__ */ React__namespace.createElement(AttachmentListWithStore, { store });
  return {
    onDocumentLoad: (props) => {
      store.update("doc", props.doc);
    },
    Attachments: AttachmentsDecorator
  };
};

exports.attachmentPlugin = attachmentPlugin;
