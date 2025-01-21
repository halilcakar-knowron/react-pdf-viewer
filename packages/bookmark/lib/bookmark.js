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

var styles$7 = {"skeleton":"rpv_673589cd"};

const Skeleton = ({ children }) => {
  const [node, setNode] = React__namespace.useState(null);
  const ref = React__namespace.useCallback((nodeEle) => {
    setNode(nodeEle);
  }, []);
  React__namespace.useEffect(() => {
    if (!node) {
      return;
    }
    const animation = node.animate(
      [
        {
          offset: 0,
          opacity: 1
        },
        {
          offset: 0.5,
          opacity: 0.5
        },
        {
          offset: 1,
          opacity: 1
        }
      ],
      {
        duration: 2 * 1e3,
        easing: "ease-in-out",
        iterations: Number.MAX_VALUE
      }
    );
    return () => {
      animation.cancel();
    };
  }, [node]);
  return children({
    attributes: {
      className: styles$7.skeleton
    },
    ref
  });
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
var SpecialZoomLevel = /* @__PURE__ */ ((SpecialZoomLevel2) => {
  SpecialZoomLevel2["ActualSize"] = "ActualSize";
  SpecialZoomLevel2["PageFit"] = "PageFit";
  SpecialZoomLevel2["PageWidth"] = "PageWidth";
  return SpecialZoomLevel2;
})(SpecialZoomLevel || {});

const normalizeDestination = (pageIndex, destArray) => {
  switch (destArray[1].name) {
    case "XYZ":
      return {
        bottomOffset: (_, viewportHeight) => destArray[3] === null ? viewportHeight : destArray[3],
        leftOffset: (_, __) => destArray[2] === null ? 0 : destArray[2],
        pageIndex,
        scaleTo: destArray[4]
      };
    case "Fit":
    case "FitB":
      return {
        bottomOffset: 0,
        leftOffset: 0,
        pageIndex,
        scaleTo: SpecialZoomLevel.PageFit
      };
    case "FitH":
    case "FitBH":
      return {
        bottomOffset: destArray[2],
        leftOffset: 0,
        pageIndex,
        scaleTo: SpecialZoomLevel.PageWidth
      };
    default:
      return {
        bottomOffset: 0,
        leftOffset: 0,
        pageIndex,
        scaleTo: 1
      };
  }
};
const pageOutlinesMap = /* @__PURE__ */ new Map();
const generateRefKey = (doc, outline) => `${doc.loadingTask.docId}___${outline.num}R${outline.gen === 0 ? "" : outline.gen}`;
const getPageIndex = (doc, outline) => {
  const key = generateRefKey(doc, outline);
  return pageOutlinesMap.has(key) ? pageOutlinesMap.get(key) : null;
};
const cacheOutlineRef = (doc, outline, pageIndex) => {
  pageOutlinesMap.set(generateRefKey(doc, outline), pageIndex);
};
const getDestination = (doc, dest) => {
  return new Promise((res) => {
    new Promise((resolve) => {
      if (typeof dest === "string") {
        doc.getDestination(dest).then((destArray) => {
          resolve(destArray);
        });
      } else {
        resolve(dest);
      }
    }).then((destArray) => {
      if ("object" === typeof destArray[0] && destArray[0] !== null) {
        const outlineRef = destArray[0];
        const pageIndex = getPageIndex(doc, outlineRef);
        if (pageIndex === null) {
          doc.getPageIndex(outlineRef).then((pageIndex2) => {
            cacheOutlineRef(doc, outlineRef, pageIndex2);
            getDestination(doc, dest).then((result) => res(result));
          });
        } else {
          res(normalizeDestination(pageIndex, destArray));
        }
      } else {
        const target = normalizeDestination(destArray[0], destArray);
        res(target);
      }
    });
  });
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const DownArrowIcon = () => {
  return /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M6.427,8.245A.5.5,0,0,1,6.862,7.5H17.138a.5.5,0,0,1,.435.749l-5.139,9a.5.5,0,0,1-.868,0Z" }));
};

const RightArrowIcon = () => /* @__PURE__ */ React__namespace.createElement(Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M9.248,17.572a.5.5,0,0,1-.748-.434V6.862a.5.5,0,0,1,.748-.434l8.992,5.138a.5.5,0,0,1,0,.868Z" }));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const shouldBeCollapsed = (bookmark) => {
  const { count, items } = bookmark;
  if (count === undefined) {
    return false;
  }
  if (count >= 0) {
    return false;
  }
  let numSubItems = items.length;
  if (numSubItems === 0) {
    return false;
  }
  let subItems = items.concat([]);
  while (subItems.length > 0) {
    const firstChild = subItems.shift();
    const children = firstChild.items;
    if (firstChild.count && children && firstChild.count > 0 && children.length > 0) {
      numSubItems += children.length;
      subItems = subItems.concat(children);
    }
  }
  return Math.abs(count) === numSubItems;
};

var styles$3 = {"item":"rpv_62cd0cf7","toggle":"rpv_f63d6438","title":"rpv_f76accf4"};

const useCollapse = (onToggle) => {
  const [node, setNode] = React__namespace.useState(null);
  const ref = React__namespace.useCallback((ele) => {
    setNode(ele);
  }, []);
  const collapse = React__namespace.useCallback(() => {
    if (!node) {
      return;
    }
    node.style.overflow = "hidden";
    node.style.height = `${node.getBoundingClientRect().height}px`;
    const collapsingAnimation = node.animate(
      [
        {
          height: `${node.scrollHeight}px`
        },
        {
          height: "0px"
        }
      ],
      {
        duration: 150
      }
    );
    collapsingAnimation.finished.then(() => {
      node.style.display = "none";
      node.style.overflow = "";
      onToggle();
    });
  }, [node]);
  const expand = React__namespace.useCallback(() => {
    if (!node) {
      return;
    }
    node.style.display = "";
    node.style.overflow = "hidden";
    node.style.height = `${node.getBoundingClientRect().height}px`;
    const expandingAnimation = node.animate(
      [
        {
          height: "0px"
        },
        {
          height: `${node.scrollHeight}px`
        }
      ],
      {
        duration: 150
      }
    );
    expandingAnimation.finished.then(() => {
      node.style.height = "";
      node.style.overflow = "";
      onToggle();
    });
  }, [node]);
  return [ref, collapse, expand];
};

const BookmarkItem = ({
  bookmark,
  depth,
  doc,
  index,
  isBookmarkExpanded,
  numberOfSiblings,
  pathFromRoot,
  renderBookmarkItem,
  store
}) => {
  const path = pathFromRoot ? `${pathFromRoot}.${index}` : `${index}`;
  const defaultIsCollapsed = React__namespace.useMemo(() => shouldBeCollapsed(bookmark), [bookmark]);
  const bookmarkExpandedMap = store.get("bookmarkExpandedMap");
  const defaultExpanded = isBookmarkExpanded ? isBookmarkExpanded({ bookmark, doc, depth, index }) : bookmarkExpandedMap && bookmarkExpandedMap.has(path) ? bookmarkExpandedMap.get(path) : !defaultIsCollapsed;
  const [expanded, setExpanded] = React__namespace.useState(defaultExpanded);
  const toggle = () => setExpanded((v) => !v);
  const [subItemsListRef, collapseSubItems, expandSubItems] = useCollapse(toggle);
  const hasSubItems = bookmark.items && bookmark.items.length > 0;
  const toggleSubItems = () => {
    store.updateCurrentValue("bookmarkExpandedMap", (currentValue) => currentValue.set(path, !expanded));
    expanded ? collapseSubItems() : expandSubItems();
  };
  const jumpToDest = () => {
    const { dest } = bookmark;
    if (!dest) {
      return;
    }
    const jumpToDestination = store.get("jumpToDestination");
    getDestination(doc, dest).then((target) => {
      if (jumpToDestination) {
        jumpToDestination({
          label: bookmark.title,
          ...target
        });
      }
    });
  };
  const clickBookmark = () => {
    if (hasSubItems && bookmark.dest) {
      jumpToDest();
    }
  };
  const clickItem = () => {
    if (!hasSubItems && bookmark.dest) {
      jumpToDest();
    }
  };
  const defaultRenderItem = (onClickItem, children) => /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: styles$3.item,
      style: {
        paddingLeft: `${depth * 1.25}rem`
      },
      onClick: onClickItem
    },
    children
  );
  const defaultRenderToggle = (expandIcon, collapseIcon) => hasSubItems ? /* @__PURE__ */ React__namespace.createElement("span", { className: styles$3.toggle, "data-testid": `bookmark__toggle-${depth}-${index}`, onClick: toggleSubItems }, expanded ? expandIcon : collapseIcon) : /* @__PURE__ */ React__namespace.createElement("span", { className: styles$3.toggle });
  const defaultRenderTitle = (onClickBookmark) => bookmark.url ? /* @__PURE__ */ React__namespace.createElement(
    "a",
    {
      className: styles$3.title,
      href: bookmark.url,
      rel: "noopener noreferrer nofollow",
      target: bookmark.newWindow ? "_blank" : ""
    },
    bookmark.title
  ) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.title, "aria-label": bookmark.title, onClick: onClickBookmark }, bookmark.title);
  return /* @__PURE__ */ React__namespace.createElement(
    "li",
    {
      "aria-expanded": expanded ? "true" : "false",
      "aria-label": bookmark.title,
      "aria-level": depth + 1,
      "aria-posinset": index + 1,
      "aria-setsize": numberOfSiblings,
      role: "treeitem",
      tabIndex: -1
    },
    renderBookmarkItem ? renderBookmarkItem({
      bookmark,
      depth,
      hasSubItems,
      index,
      isExpanded: expanded,
      path,
      defaultRenderItem,
      defaultRenderTitle,
      defaultRenderToggle,
      onClickItem: clickItem,
      onClickTitle: clickBookmark,
      onToggleSubItems: toggleSubItems
    }) : defaultRenderItem(
      clickItem,
      /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, defaultRenderToggle(/* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null), /* @__PURE__ */ React__namespace.createElement(RightArrowIcon, null)), defaultRenderTitle(clickBookmark))
    ),
    hasSubItems && /* @__PURE__ */ React__namespace.createElement(
      BookmarkList,
      {
        bookmarks: bookmark.items,
        depth: depth + 1,
        doc,
        isBookmarkExpanded,
        isRoot: false,
        pathFromRoot: path,
        ref: subItemsListRef,
        renderBookmarkItem,
        store
      }
    )
  );
};

var styles$2 = {"list":"rpv_9977cbd7"};

const BookmarkList = React__namespace.forwardRef(
  ({ bookmarks, depth = 0, doc, isBookmarkExpanded, isRoot, pathFromRoot, renderBookmarkItem, store }, ref) => /* @__PURE__ */ React__namespace.createElement(
    "ul",
    {
      className: styles$2.list,
      ref,
      role: isRoot ? "tree" : "group",
      style: {
        display: isRoot ? "block" : "none"
      },
      tabIndex: -1
    },
    bookmarks.map((bookmark, index) => /* @__PURE__ */ React__namespace.createElement(
      BookmarkItem,
      {
        bookmark,
        depth,
        doc,
        index,
        isBookmarkExpanded,
        key: index,
        numberOfSiblings: bookmarks.length,
        pathFromRoot,
        renderBookmarkItem,
        store
      }
    ))
  )
);
BookmarkList.displayName = "BookmarkList";

const BookmarkListRoot = ({ bookmarks, doc, isBookmarkExpanded, renderBookmarkItem, store }) => {
  const containerRef = React__namespace.useRef(null);
  const handleKeyDown = (e) => {
    const container = containerRef.current;
    if (!container || !(e.target instanceof HTMLElement) || !container.contains(e.target)) {
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveToItem((bookmarkElements, activeEle) => bookmarkElements.indexOf(activeEle) + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        toggle(0 /* Collapse */);
        break;
      case "ArrowRight":
        e.preventDefault();
        toggle(1 /* Expand */);
        break;
      case "ArrowUp":
        e.preventDefault;
        moveToItem((bookmarkElements, activeEle) => bookmarkElements.indexOf(activeEle) - 1);
        break;
      case "End":
        e.preventDefault();
        moveToItem((bookmarkElements, _) => bookmarkElements.length - 1);
        break;
      case " ":
      case "Enter":
      case "Space":
        e.preventDefault();
        clickBookmark();
        break;
      case "Home":
        e.preventDefault();
        moveToItem((_, __) => 0);
        break;
    }
  };
  const clickBookmark = () => {
    const closestItem = document.activeElement?.closest(`.${styles$3.item}`);
    const titleEle = closestItem?.querySelector(`.${styles$3.title}`);
    if (titleEle) {
      titleEle.click();
    }
  };
  const moveToItem = (getItemIndex) => {
    const container = containerRef.current;
    const bookmarkElements = [].slice.call(container?.getElementsByClassName(styles$3.item));
    if (bookmarkElements.length === 0) {
      return;
    }
    const activeEle = document.activeElement;
    const targetIndex = Math.min(
      bookmarkElements.length - 1,
      Math.max(0, getItemIndex(bookmarkElements, activeEle))
    );
    const targetEle = bookmarkElements[targetIndex];
    activeEle.setAttribute("tabindex", "-1");
    targetEle.setAttribute("tabindex", "0");
    targetEle.focus();
  };
  const toggle = (toggle2) => {
    const container = containerRef.current;
    const bookmarkElements = [].slice.call(container?.getElementsByClassName(styles$3.item));
    if (bookmarkElements.length === 0) {
      return;
    }
    const closestItem = document.activeElement?.closest(`.${styles$3.item}`);
    const expanedAttribute = toggle2 === 0 /* Collapse */ ? "true" : "false";
    if (closestItem && closestItem.parentElement?.getAttribute("aria-expanded") === expanedAttribute) {
      const toggleEle = closestItem.querySelector(`.${styles$3.toggle}`);
      if (toggleEle) {
        toggleEle.click();
      }
    }
  };
  React__namespace.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  React__namespace.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const bookmarkElements = [].slice.call(container.getElementsByClassName(styles$3.item));
    if (bookmarkElements.length > 0) {
      bookmarkElements[0].focus();
      bookmarkElements[0].setAttribute("tabindex", "0");
    }
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", { ref: containerRef }, /* @__PURE__ */ React__namespace.createElement(
    BookmarkList,
    {
      bookmarks,
      depth: 0,
      doc,
      isBookmarkExpanded,
      isRoot: true,
      pathFromRoot: "",
      renderBookmarkItem,
      store
    }
  ));
};

var styles$1 = {"list":"rpv_ebc43488","item":"rpv_ebc2fefd","toggle":"rpv_197eecbe","title":"rpv_8d331bae"};

const BookmarkItemSkeleton = ({ depth = 0, icon }) => {
  const width = React__namespace.useMemo(() => 10 * randomNumber(4, 8), []);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.item, style: { paddingLeft: `${depth * 1.25}rem` } }, /* @__PURE__ */ React__namespace.createElement("span", { className: styles$1.toggle }, icon ? icon : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.title }, /* @__PURE__ */ React__namespace.createElement(Skeleton, null, ({ attributes, ref }) => /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref,
      ...attributes,
      style: {
        borderRadius: "calc(var(--rpv-radius) - 4px)",
        height: "1rem",
        width: `${width}%`
      }
    }
  ))));
};

const BookmarkSkeleton = () => /* @__PURE__ */ React__namespace.createElement("ul", { className: styles$1.list }, /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, null)), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { icon: /* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null) }), /* @__PURE__ */ React__namespace.createElement("ul", { className: styles$1.list }, /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { depth: 1 })), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { depth: 1 })), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { depth: 1 })))), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { icon: /* @__PURE__ */ React__namespace.createElement(RightArrowIcon, null) })));

var styles = {"empty":"rpv_151ef427","emptyRtl":"rpv_dd1f88c3","container":"rpv_2f6be5b","containerRtl":"rpv_e7d3220f"};

const BookmarkLoader = ({ doc, isBookmarkExpanded, renderBookmarkItem, store }) => {
  const { l10n } = React__namespace.useContext(LocalizationContext);
  const { direction } = React__namespace.useContext(ThemeContext);
  const isRtl = direction === TextDirection.RightToLeft;
  const [bookmarks, setBookmarks] = React__namespace.useState({
    isLoaded: false,
    items: []
  });
  React__namespace.useEffect(() => {
    if (!doc) {
      return;
    }
    setBookmarks({
      isLoaded: false,
      items: []
    });
    doc.getOutline().then((outline) => {
      setBookmarks({
        isLoaded: true,
        items: outline || []
      });
    });
  }, [doc]);
  return !doc || !bookmarks.isLoaded ? /* @__PURE__ */ React__namespace.createElement(BookmarkSkeleton, null) : bookmarks.items.length === 0 ? /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "bookmark__empty",
      className: classNames({
        [styles.empty]: true,
        [styles.emptyRtl]: isRtl
      })
    },
    l10n && l10n.bookmark ? l10n.bookmark.noBookmark : "There is no bookmark"
  ) : /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "bookmark__container",
      className: classNames({
        [styles.container]: true,
        [styles.containerRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement(
      BookmarkListRoot,
      {
        bookmarks: bookmarks.items,
        doc,
        isBookmarkExpanded,
        renderBookmarkItem,
        store
      }
    )
  );
};

const BookmarkListWithStore = ({ isBookmarkExpanded, renderBookmarkItem, store }) => {
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
  return /* @__PURE__ */ React__namespace.createElement(
    BookmarkLoader,
    {
      doc: currentDoc,
      isBookmarkExpanded,
      renderBookmarkItem,
      store
    }
  );
};

const bookmarkPlugin = () => {
  const store = React__namespace.useMemo(
    () => createStore({
      bookmarkExpandedMap: /* @__PURE__ */ new Map()
    }),
    []
  );
  const BookmarksDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(
    BookmarkListWithStore,
    {
      isBookmarkExpanded: props?.isBookmarkExpanded,
      renderBookmarkItem: props?.renderBookmarkItem,
      store
    }
  );
  return {
    install: (pluginFunctions) => {
      store.update("jumpToDestination", pluginFunctions.jumpToDestination);
    },
    onDocumentLoad: (props) => {
      store.update("doc", props.doc);
    },
    Bookmarks: BookmarksDecorator
  };
};

exports.DownArrowIcon = DownArrowIcon;
exports.RightArrowIcon = RightArrowIcon;
exports.bookmarkPlugin = bookmarkPlugin;
