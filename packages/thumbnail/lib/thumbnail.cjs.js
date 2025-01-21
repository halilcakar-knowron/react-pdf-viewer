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

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var ThumbnailDirection = /* @__PURE__ */ ((ThumbnailDirection2) => {
  ThumbnailDirection2["Horizontal"] = "Horizontal";
  ThumbnailDirection2["Vertical"] = "Vertical";
  return ThumbnailDirection2;
})(ThumbnailDirection || {});

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

const LazyRender = ({ attrs, children, testId }) => {
  const [visible, setVisible] = React__namespace.useState(false);
  const containerAttrs = testId ? { ...attrs, "data-testid": testId } : attrs;
  const handleVisibilityChanged = (params) => {
    if (params.isVisible) {
      setVisible(true);
    }
  };
  const containerRef = useIntersectionObserver({
    once: true,
    onVisibilityChanged: handleVisibilityChanged
  });
  return /* @__PURE__ */ React__namespace.createElement("div", { ref: containerRef, ...containerAttrs }, visible && children);
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

const usePrevious = (value) => {
  const ref = React__namespace.useRef(value);
  React__namespace.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const OUT_OF_RANGE_VISIBILITY = -9999;
const useRenderQueue = ({ doc }) => {
  const { numPages } = doc;
  const docId = doc.loadingTask.docId;
  const initialPageVisibilities = React__namespace.useMemo(
    () => Array(numPages).fill(null).map((_, pageIndex) => ({
      pageIndex,
      renderStatus: "NotRenderedYet" /* NotRenderedYet */,
      visibility: OUT_OF_RANGE_VISIBILITY
    })),
    [docId]
  );
  const latestRef = React__namespace.useRef({
    currentRenderingPage: -1,
    startRange: 0,
    endRange: numPages - 1,
    visibilities: initialPageVisibilities
  });
  const markNotRendered = () => {
    for (let i = 0; i < numPages; i++) {
      latestRef.current.visibilities[i].renderStatus = "NotRenderedYet" /* NotRenderedYet */;
    }
  };
  const markRendered = (pageIndex) => {
    latestRef.current.visibilities[pageIndex].renderStatus = "Rendered" /* Rendered */;
  };
  const markRendering = (pageIndex) => {
    if (latestRef.current.currentRenderingPage !== -1 && latestRef.current.currentRenderingPage !== pageIndex && latestRef.current.visibilities[latestRef.current.currentRenderingPage].renderStatus === "Rendering" /* Rendering */) {
      latestRef.current.visibilities[latestRef.current.currentRenderingPage].renderStatus = "NotRenderedYet" /* NotRenderedYet */;
    }
    latestRef.current.visibilities[pageIndex].renderStatus = "Rendering" /* Rendering */;
    latestRef.current.currentRenderingPage = pageIndex;
  };
  const setRange = (startIndex, endIndex) => {
    latestRef.current.startRange = startIndex;
    latestRef.current.endRange = endIndex;
    for (let i = 0; i < numPages; i++) {
      if (i < startIndex || i > endIndex) {
        latestRef.current.visibilities[i].visibility = OUT_OF_RANGE_VISIBILITY;
        latestRef.current.visibilities[i].renderStatus = "NotRenderedYet" /* NotRenderedYet */;
      } else if (latestRef.current.visibilities[i].visibility === OUT_OF_RANGE_VISIBILITY) {
        latestRef.current.visibilities[i].visibility = -1;
      }
    }
  };
  const setOutOfRange = (pageIndex) => {
    setVisibility(pageIndex, OUT_OF_RANGE_VISIBILITY);
  };
  const setVisibility = (pageIndex, visibility) => {
    latestRef.current.visibilities[pageIndex].visibility = visibility;
  };
  const getHighestPriorityPage = () => {
    const visiblePages = latestRef.current.visibilities.slice(latestRef.current.startRange, latestRef.current.endRange + 1).filter((item) => item.visibility > OUT_OF_RANGE_VISIBILITY);
    if (!visiblePages.length) {
      return -1;
    }
    const firstVisiblePage = visiblePages[0].pageIndex;
    const lastVisiblePage = visiblePages[visiblePages.length - 1].pageIndex;
    const numVisiblePages = visiblePages.length;
    let maxVisibilityPageIndex = -1;
    let maxVisibility = -1;
    for (let i = 0; i < numVisiblePages; i++) {
      if (visiblePages[i].renderStatus === "Rendering" /* Rendering */) {
        return -1;
      }
      if (visiblePages[i].renderStatus === "NotRenderedYet" /* NotRenderedYet */) {
        if (maxVisibilityPageIndex === -1 || visiblePages[i].visibility > maxVisibility) {
          maxVisibilityPageIndex = visiblePages[i].pageIndex;
          maxVisibility = visiblePages[i].visibility;
        }
      }
    }
    if (maxVisibilityPageIndex > -1) {
      return maxVisibilityPageIndex;
    }
    if (lastVisiblePage + 1 < numPages && latestRef.current.visibilities[lastVisiblePage + 1].renderStatus !== "Rendered" /* Rendered */) {
      return lastVisiblePage + 1;
    } else if (firstVisiblePage - 1 >= 0 && latestRef.current.visibilities[firstVisiblePage - 1].renderStatus !== "Rendered" /* Rendered */) {
      return firstVisiblePage - 1;
    }
    return -1;
  };
  const isInRange = (pageIndex) => pageIndex >= latestRef.current.startRange && pageIndex <= latestRef.current.endRange;
  return {
    getHighestPriorityPage,
    isInRange,
    markNotRendered,
    markRendered,
    markRendering,
    setOutOfRange,
    setRange,
    setVisibility
  };
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
const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

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

var styles$3 = {"cover":"rpv_34a2d621","loader":"rpv_6f09fae9","inner":"rpv_34f6d0c0","image":"rpv_34f62bc5"};

const CoverInner = ({ doc, getPageIndex, renderSpinner, store, width }) => {
  const { numPages } = doc;
  const targetPage = getPageIndex ? getPageIndex({ numPages }) : 0;
  const normalizePage = Math.max(0, Math.min(targetPage, numPages - 1));
  const initialPagesRotation = store.get("pagesRotation") || /* @__PURE__ */ new Map();
  const initialTargetPageRotation = initialPagesRotation.has(normalizePage) ? initialPagesRotation.get(normalizePage) : 0;
  const [src, setSrc] = useSafeState("");
  const renderTask = React__namespace.useRef();
  const [rotation, setRotation] = React__namespace.useState(store.get("rotation") || 0);
  const [pageRotation, setPageRotation] = React__namespace.useState(initialTargetPageRotation);
  const [isVisible, setVisible] = React__namespace.useState(false);
  const handlePagesRotationChanged = (rotations) => {
    const pageRotation2 = rotations.has(normalizePage) ? rotations.get(normalizePage) : 0;
    setPageRotation(pageRotation2);
  };
  const handleRotationChanged = (currentRotation) => {
    setRotation(currentRotation);
  };
  const handleVisibilityChanged = (params) => {
    setVisible(params.isVisible);
  };
  const containerRef = useIntersectionObserver({
    onVisibilityChanged: handleVisibilityChanged
  });
  React__namespace.useEffect(() => {
    if (!isVisible) {
      return;
    }
    const containerEle = containerRef.current;
    if (!containerEle) {
      return;
    }
    setSrc("");
    getPage(doc, normalizePage).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      const viewportRotation = viewport.rotation;
      const rotationValue = (viewportRotation + rotation + pageRotation) % 360;
      const isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
      const w = isVertical ? viewport.width : viewport.height;
      const h = isVertical ? viewport.height : viewport.width;
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d", { alpha: false });
      if (!canvasContext) {
        return;
      }
      const containerWidth = containerEle.clientWidth;
      const containerHeight = containerEle.clientHeight;
      const scaled = width ? width / w : Math.min(containerWidth / w, containerHeight / h);
      const canvasWidth = scaled * w;
      const canvasHeight = scaled * h;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      canvas.style.opacity = "0";
      const renderViewport = page.getViewport({
        rotation: rotationValue,
        scale: scaled
      });
      renderTask.current = page.render({ canvasContext, viewport: renderViewport });
      renderTask.current.promise.then(
        () => {
          setSrc(canvas.toDataURL());
          canvas.width = 0;
          canvas.height = 0;
        },
        () => {
        }
      );
    });
  }, [pageRotation, isVisible]);
  React__namespace.useEffect(() => {
    store.subscribe("pagesRotation", handlePagesRotationChanged);
    store.subscribe("rotation", handleRotationChanged);
    return () => {
      store.unsubscribe("pagesRotation", handlePagesRotationChanged);
      store.unsubscribe("rotation", handleRotationChanged);
    };
  }, []);
  React__namespace.useEffect(() => {
    return () => {
      renderTask.current?.cancel();
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", { ref: containerRef, className: styles$3.inner, "data-testid": "thumbnail__cover-inner" }, src ? /* @__PURE__ */ React__namespace.createElement("img", { className: styles$3.image, "data-testid": "thumbnail__cover-image", src }) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.loader, "data-testid": "thumbnail__cover-loader" }, renderSpinner ? renderSpinner() : /* @__PURE__ */ React__namespace.createElement(Spinner, null)));
};

const Cover = ({ getPageIndex, renderSpinner, store, width }) => {
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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.cover }, currentDoc ? /* @__PURE__ */ React__namespace.createElement(
    CoverInner,
    {
      doc: currentDoc,
      getPageIndex,
      renderSpinner,
      store,
      width
    }
  ) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.loader }, renderSpinner ? renderSpinner() : /* @__PURE__ */ React__namespace.createElement(Spinner, null)));
};

const defaultSpinner = () => /* @__PURE__ */ React__namespace.createElement(Spinner, null);
const SpinnerContext = React__namespace.createContext({
  renderSpinner: defaultSpinner
});

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

const ThumbnailItem = ({ page, pageHeight, pageIndex, pageWidth, rotation, thumbnailHeight, thumbnailWidth, onRenderCompleted }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const renderTask = React__namespace.useRef();
  const [src, setSrc] = React__namespace.useState("");
  const thumbnailLabel = l10n && l10n.thumbnail ? l10n.thumbnail.thumbnailLabel : "Thumbnail of page {{pageIndex}}";
  React__namespace.useEffect(() => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d", { alpha: false });
    if (!canvasContext) {
      return;
    }
    const w = thumbnailWidth;
    const h = w / (pageWidth / pageHeight);
    const scale = w / pageWidth;
    canvas.height = h;
    canvas.width = w;
    canvas.style.height = `${h}px`;
    canvas.style.width = `${w}px`;
    const viewport = page.getViewport({ rotation, scale });
    renderTask.current = page.render({ canvasContext, viewport });
    renderTask.current.promise.then(
      () => {
        setSrc(canvas.toDataURL());
        onRenderCompleted(pageIndex);
      },
      () => {
        onRenderCompleted(pageIndex);
      }
    );
    return () => {
      renderTask.current?.cancel();
    };
  }, [rotation]);
  return !src ? React__namespace.useContext(SpinnerContext).renderSpinner() : /* @__PURE__ */ React__namespace.createElement(
    "img",
    {
      "aria-label": thumbnailLabel.replace("{{pageIndex}}", `${pageIndex + 1}`),
      src,
      height: `${thumbnailHeight}px`,
      width: `${thumbnailWidth}px`
    }
  );
};

var styles$2 = {"container":"rpv_87cfa5a9"};

const ThumbnailContainer = ({
  doc,
  pageHeight,
  pageIndex,
  pageRotation,
  pageWidth,
  rotation,
  shouldRender,
  thumbnailWidth,
  onRenderCompleted,
  onVisibilityChanged
}) => {
  const [pageSize, setPageSize] = useSafeState({
    height: pageHeight,
    page: null,
    viewportRotation: 0,
    width: pageWidth
  });
  const { page, height, width } = pageSize;
  const scale = width / height;
  const isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
  const w = isVertical ? thumbnailWidth : thumbnailWidth / scale;
  const h = isVertical ? thumbnailWidth / scale : thumbnailWidth;
  React__namespace.useEffect(() => {
    if (shouldRender) {
      getPage(doc, pageIndex).then((pdfPage) => {
        const viewport = pdfPage.getViewport({ scale: 1 });
        setPageSize({
          height: viewport.height,
          page: pdfPage,
          viewportRotation: viewport.rotation,
          width: viewport.width
        });
      });
    }
  }, [shouldRender]);
  const rotationNumber = (pageSize.viewportRotation + rotation + pageRotation) % 360;
  const containerRef = useIntersectionObserver({
    onVisibilityChanged: (visibility) => {
      onVisibilityChanged(pageIndex, visibility);
    }
  });
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: styles$2.container,
      "data-testid": `thumbnail__container-${pageIndex}`,
      ref: containerRef,
      style: {
        height: `${h}px`,
        width: `${w}px`
      }
    },
    !page ? React__namespace.useContext(SpinnerContext).renderSpinner() : /* @__PURE__ */ React__namespace.createElement(
      ThumbnailItem,
      {
        page,
        pageHeight: isVertical ? height : width,
        pageIndex,
        pageWidth: isVertical ? width : height,
        rotation: rotationNumber,
        thumbnailHeight: h,
        thumbnailWidth: w,
        onRenderCompleted
      }
    )
  );
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const scrollToBeVisibleVertically = (ele, container) => {
  const top = ele.getBoundingClientRect().top - container.getBoundingClientRect().top;
  const eleHeight = ele.clientHeight;
  const containerHeight = container.clientHeight;
  if (top < 0) {
    container.scrollTop += top;
    return;
  }
  if (top + eleHeight <= containerHeight) {
    return;
  }
  container.scrollTop += top + eleHeight - containerHeight;
};
const scrollToBeVisibleHorizontally = (ele, container) => {
  const left = ele.getBoundingClientRect().left - container.getBoundingClientRect().left;
  const eleWidth = ele.clientWidth;
  const containerWidth = container.clientWidth;
  if (left < 0) {
    container.scrollLeft += left;
    return;
  }
  if (left + eleWidth <= containerWidth) {
    return;
  }
  container.scrollLeft += left + eleWidth - containerWidth;
};

var styles$1 = {"container":"rpv_fcb6421e","containerRtl":"rpv_5d99636c","containerHorizontal":"rpv_43a01ce2","containerVertical":"rpv_78f00fb4","inner":"rpv_8b9d9a73","innerDual":"rpv_f5b5d58f","item":"rpv_db36b756","innerDualCover":"rpv_c390af68","itemSingle":"rpv_806cf3e","itemDualCover":"rpv_959661e5","itemDualEven":"rpv_702f252c","itemDualCoverOdd":"rpv_a72b4d0a","itemDualOdd":"rpv_f31a6edd","itemDualCoverEven":"rpv_3e3a0c9f","itemSelected":"rpv_4a6d5811","label":"rpv_8bc1cb11"};

const ThumbnailList = ({
  currentPage,
  doc,
  labels,
  pagesRotation,
  pageHeight,
  pageWidth,
  renderCurrentPageLabel,
  renderThumbnailItem,
  rotatedPage,
  rotation,
  thumbnailDirection,
  thumbnailWidth,
  viewMode,
  onJumpToPage,
  onRotatePage
}) => {
  const { numPages } = doc;
  const docId = doc.loadingTask.docId;
  const containerRef = React__namespace.useRef(null);
  const thumbnailsRef = React__namespace.useRef([]);
  const [currentFocused, setCurrentFocused] = React__namespace.useState(currentPage);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const [renderPageIndex, setRenderPageIndex] = React__namespace.useState(-1);
  const isMounted = useIsMounted();
  const previousViewMode = usePrevious(viewMode);
  const hasRenderingThumbnailRef = React__namespace.useRef(false);
  const renderQueue = useRenderQueue({ doc });
  const pageIndexes = React__namespace.useMemo(
    () => Array(numPages).fill(0).map((_, pageIndex) => pageIndex),
    [docId]
  );
  const chunks = React__namespace.useMemo(() => {
    switch (viewMode) {
      case ViewMode.DualPage:
        return chunk(pageIndexes, 2);
      case ViewMode.DualPageWithCover:
        return [[pageIndexes[0]]].concat(chunk(pageIndexes.slice(1), 2));
      case ViewMode.SinglePage:
      default:
        return chunk(pageIndexes, 1);
    }
  }, [docId, viewMode]);
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        activateNextItem();
        break;
      case "ArrowUp":
        activatePreviousItem();
        break;
      case "Enter":
        jumpToFocusedPage();
        break;
    }
  };
  const activateNextItem = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const items = thumbnailsRef.current;
    const nextItem = currentFocused + 1;
    if (nextItem < items.length) {
      if (currentFocused >= 0) {
        items[currentFocused].setAttribute("tabindex", "-1");
      }
      setCurrentFocused(nextItem);
    }
  };
  const activatePreviousItem = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const items = thumbnailsRef.current;
    const prevItem = currentFocused - 1;
    if (prevItem >= 0) {
      if (currentFocused >= 0) {
        items[currentFocused].setAttribute("tabindex", "-1");
      }
      setCurrentFocused(prevItem);
    }
  };
  const jumpToFocusedPage = () => {
    if (currentFocused >= 0 && currentFocused < numPages) {
      onJumpToPage(currentFocused);
    }
  };
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    thumbnailsRef.current = Array.from(container.querySelectorAll(`.${styles$1.item}`));
  }, [viewMode]);
  React__namespace.useEffect(() => {
    const thumbnails = thumbnailsRef.current;
    if (thumbnails.length === 0 || currentFocused < 0 || currentFocused > thumbnails.length) {
      return;
    }
    const thumbnailEle = thumbnails[currentFocused];
    thumbnailEle.setAttribute("tabindex", "0");
    thumbnailEle.focus();
  }, [currentFocused]);
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const thumbnails = thumbnailsRef.current;
    if (!container || thumbnails.length === 0 || currentPage < 0 || currentPage > thumbnails.length) {
      return;
    }
    const thumbnailContainer = thumbnails[currentPage].closest(`.${styles$1.inner}`);
    if (thumbnailContainer) {
      thumbnailDirection === ThumbnailDirection.Vertical ? scrollToBeVisibleVertically(thumbnailContainer, container) : scrollToBeVisibleHorizontally(thumbnailContainer, container);
    }
  }, [currentPage, thumbnailDirection]);
  const handleRenderCompleted = React__namespace.useCallback(
    (pageIndex) => {
      if (isMounted.current) {
        renderQueue.markRendered(pageIndex);
        hasRenderingThumbnailRef.current = false;
        renderNextThumbnail();
      }
    },
    [docId]
  );
  const handleVisibilityChanged = React__namespace.useCallback(
    (pageIndex, visibility) => {
      visibility.isVisible ? renderQueue.setVisibility(pageIndex, visibility.ratio) : (
        // Notice that we don't virtualize the list of thumbnails
        renderQueue.setOutOfRange(pageIndex)
      );
      renderNextThumbnail();
    },
    [docId]
  );
  const renderNextThumbnail = React__namespace.useCallback(() => {
    if (hasRenderingThumbnailRef.current) {
      return;
    }
    const nextPage = renderQueue.getHighestPriorityPage();
    if (nextPage > -1) {
      renderQueue.markRendering(nextPage);
      hasRenderingThumbnailRef.current = true;
      setRenderPageIndex(nextPage);
    }
  }, [docId]);
  React__namespace.useEffect(() => {
    if (rotatedPage >= 0) {
      renderQueue.markRendering(rotatedPage);
      hasRenderingThumbnailRef.current = true;
      setRenderPageIndex(rotatedPage);
    }
  }, [docId, rotatedPage]);
  useIsomorphicLayoutEffect(() => {
    if (previousViewMode !== viewMode) {
      renderQueue.markNotRendered();
      renderNextThumbnail();
    }
  }, [viewMode]);
  const renderPageThumbnail = (pageIndex) => {
    const isCover = viewMode === ViewMode.DualPageWithCover && (pageIndex === 0 || numPages % 2 === 0 && pageIndex === numPages - 1);
    const key = `${doc.loadingTask.docId}___${pageIndex}`;
    const pageLabel = labels.length === numPages ? labels[pageIndex] : `${pageIndex + 1}`;
    const label = renderCurrentPageLabel ? renderCurrentPageLabel({ currentPage, pageIndex, numPages, pageLabel }) : pageLabel;
    const pageRotation = pagesRotation.has(pageIndex) ? pagesRotation.get(pageIndex) : 0;
    const thumbnail = /* @__PURE__ */ React__namespace.createElement(
      ThumbnailContainer,
      {
        doc,
        pageHeight,
        pageIndex,
        pageRotation,
        pageWidth,
        rotation,
        shouldRender: renderPageIndex === pageIndex,
        thumbnailWidth,
        onRenderCompleted: handleRenderCompleted,
        onVisibilityChanged: handleVisibilityChanged
      }
    );
    return renderThumbnailItem ? renderThumbnailItem({
      currentPage,
      key,
      numPages,
      pageIndex,
      renderPageLabel: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, label),
      renderPageThumbnail: thumbnail,
      onJumpToPage: () => onJumpToPage(pageIndex),
      onRotatePage: (direction2) => onRotatePage(pageIndex, direction2)
    }) : /* @__PURE__ */ React__namespace.createElement("div", { key }, /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: classNames({
          [styles$1.item]: true,
          [styles$1.itemDualEven]: viewMode === ViewMode.DualPage && pageIndex % 2 === 0,
          [styles$1.itemDualOdd]: viewMode === ViewMode.DualPage && pageIndex % 2 === 1,
          [styles$1.itemDualCover]: isCover,
          [styles$1.itemDualCoverEven]: viewMode === ViewMode.DualPageWithCover && !isCover && pageIndex % 2 === 0,
          [styles$1.itemDualCoverOdd]: viewMode === ViewMode.DualPageWithCover && !isCover && pageIndex % 2 === 1,
          [styles$1.itemSingle]: viewMode === ViewMode.SinglePage,
          [styles$1.itemSelected]: currentPage === pageIndex
        }),
        role: "button",
        tabIndex: currentPage === pageIndex ? 0 : -1,
        onClick: () => onJumpToPage(pageIndex)
      },
      thumbnail
    ), /* @__PURE__ */ React__namespace.createElement("div", { "data-testid": `thumbnail__label-${pageIndex}`, className: styles$1.label }, label));
  };
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref: containerRef,
      "data-testid": "thumbnail__list",
      className: classNames({
        [styles$1.container]: true,
        [styles$1.containerHorizontal]: thumbnailDirection === ThumbnailDirection.Horizontal,
        [styles$1.containerRtl]: isRtl,
        [styles$1.containerVertical]: thumbnailDirection === ThumbnailDirection.Vertical
      }),
      onKeyDown: handleKeyDown
    },
    chunks.map((chunkItem, index) => {
      switch (viewMode) {
        case ViewMode.DualPage:
          break;
        case ViewMode.DualPageWithCover:
          break;
        case ViewMode.SinglePage:
      }
      return /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          className: classNames({
            [styles$1.inner]: true,
            [styles$1.innerDual]: viewMode === ViewMode.DualPage,
            [styles$1.innerDualCover]: viewMode === ViewMode.DualPageWithCover
          }),
          key: `${index}___${viewMode}`
        },
        chunkItem.map((pageIndex) => renderPageThumbnail(pageIndex))
      );
    })
  );
};

var styles = {"container":"rpv_16d088e5","loader":"rpv_3031ee2f"};

const ThumbnailListWithStore = ({ renderCurrentPageLabel, renderThumbnailItem, store, thumbnailDirection, thumbnailWidth }) => {
  const [currentDoc, setCurrentDoc] = React__namespace.useState(store.get("doc"));
  const [currentPage, setCurrentPage] = React__namespace.useState(store.get("currentPage") || 0);
  const [pageHeight, setPageHeight] = React__namespace.useState(store.get("pageHeight") || 0);
  const [pageWidth, setPageWidth] = React__namespace.useState(store.get("pageWidth") || 0);
  const [rotation, setRotation] = React__namespace.useState(store.get("rotation") || 0);
  const [pagesRotation, setPagesRotation] = React__namespace.useState(store.get("pagesRotation") || /* @__PURE__ */ new Map());
  const [rotatedPage, setRotatedPage] = React__namespace.useState(store.get("rotatedPage") || -1);
  const [viewMode, setViewMode] = React__namespace.useState(store.get("viewMode"));
  const handleCurrentPageChanged = (currentPageIndex) => {
    setCurrentPage(currentPageIndex);
  };
  const handleDocumentChanged = (doc) => {
    setCurrentDoc(doc);
  };
  const handlePageHeightChanged = (height) => {
    setPageHeight(height);
  };
  const handlePageWidthChanged = (width) => {
    setPageWidth(width);
  };
  const handleRotationChanged = (currentRotation) => {
    setRotation(currentRotation);
  };
  const handlePagesRotationChanged = (rotations) => {
    setPagesRotation(rotations);
  };
  const handleRotatedPage = (rotatedPage2) => {
    setRotatedPage(rotatedPage2);
  };
  const handleViewModeChanged = (viewMode2) => {
    setViewMode(viewMode2);
  };
  const jump = (pageIndex) => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(pageIndex);
    }
  };
  const rotatePage = (pageIndex, direction) => {
    store.get("rotatePage")(pageIndex, direction);
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    store.subscribe("pageHeight", handlePageHeightChanged);
    store.subscribe("pageWidth", handlePageWidthChanged);
    store.subscribe("rotatedPage", handleRotatedPage);
    store.subscribe("rotation", handleRotationChanged);
    store.subscribe("pagesRotation", handlePagesRotationChanged);
    store.subscribe("viewMode", handleViewModeChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
      store.unsubscribe("pageHeight", handlePageHeightChanged);
      store.unsubscribe("pageWidth", handlePageWidthChanged);
      store.unsubscribe("rotatedPage", handleRotatedPage);
      store.unsubscribe("rotation", handleRotationChanged);
      store.unsubscribe("pagesRotation", handlePagesRotationChanged);
      store.unsubscribe("viewMode", handleViewModeChanged);
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    store.subscribe("currentPage", handleCurrentPageChanged);
    return () => {
      store.unsubscribe("currentPage", handleCurrentPageChanged);
    };
  }, []);
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(
    LazyRender,
    {
      testId: "thumbnail__list-container",
      attrs: {
        className: styles.container
      }
    },
    /* @__PURE__ */ React__namespace.createElement(FetchLabels, { doc: currentDoc }, (labels) => /* @__PURE__ */ React__namespace.createElement(
      ThumbnailList,
      {
        currentPage,
        doc: currentDoc,
        labels,
        pagesRotation,
        pageHeight,
        pageWidth,
        renderCurrentPageLabel,
        renderThumbnailItem,
        rotatedPage,
        rotation,
        thumbnailDirection,
        thumbnailWidth,
        viewMode,
        onJumpToPage: jump,
        onRotatePage: rotatePage
      }
    ))
  ) : /* @__PURE__ */ React__namespace.createElement("div", { "data-testid": "thumbnail-list__loader", className: styles.loader }, React__namespace.useContext(SpinnerContext).renderSpinner());
};

const thumbnailPlugin = (pluginProps) => {
  const store = React__namespace.useMemo(
    () => createStore({
      rotatePage: () => {
      },
      viewMode: ViewMode.SinglePage
    }),
    []
  );
  const [docId, setDocId] = React__namespace.useState("");
  const CoverDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(Cover, { ...props, renderSpinner: pluginProps?.renderSpinner, store });
  const ThumbnailsDecorator = React__namespace.useCallback(
    (props) => /* @__PURE__ */ React__namespace.createElement(SpinnerContext.Provider, { value: { renderSpinner: pluginProps?.renderSpinner || defaultSpinner } }, /* @__PURE__ */ React__namespace.createElement(
      ThumbnailListWithStore,
      {
        renderCurrentPageLabel: pluginProps?.renderCurrentPageLabel,
        renderThumbnailItem: props?.renderThumbnailItem,
        store,
        thumbnailDirection: props?.thumbnailDirection || ThumbnailDirection.Vertical,
        thumbnailWidth: pluginProps?.thumbnailWidth || 100
      }
    )),
    [docId]
  );
  return {
    install: (pluginFunctions) => {
      store.update("jumpToPage", pluginFunctions.jumpToPage);
      store.update("rotatePage", pluginFunctions.rotatePage);
    },
    onDocumentLoad: (props) => {
      setDocId(props.doc.loadingTask.docId);
      store.update("doc", props.doc);
    },
    onViewerStateChange: (viewerState) => {
      store.update("currentPage", viewerState.pageIndex);
      store.update("pagesRotation", viewerState.pagesRotation);
      store.update("pageHeight", viewerState.pageHeight);
      store.update("pageWidth", viewerState.pageWidth);
      store.update("rotation", viewerState.rotation);
      store.update("rotatedPage", viewerState.rotatedPage);
      store.update("viewMode", viewerState.viewMode);
      return viewerState;
    },
    Cover: CoverDecorator,
    Thumbnails: ThumbnailsDecorator
  };
};

exports.ThumbnailDirection = ThumbnailDirection;
exports.thumbnailPlugin = thumbnailPlugin;
