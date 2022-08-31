const historyAdapter = (fn: (e: Event) => void) => {
  const _historyWrap = function (type: "pushState" | "replaceState") {
    const orig = history[type];
    const e = new Event(type) as Event & { arguments?: IArguments };
    return function () {
      const rv = orig.apply(this, arguments);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
    };
  };
  history.pushState = _historyWrap("pushState");
  history.replaceState = _historyWrap("replaceState");
  window.addEventListener("pushState", function (e) {
    console.log("change pushState");
    fn && fn(e);
  });
  window.addEventListener("replaceState", function (e) {
    console.log("change replaceState");
    fn && fn(e);
  });
  window.addEventListener("popstate", function (e) {
    fn && fn(e);
    // const url = `${window.location.pathname}${window.location.search}`;
    // window.history.pushState(e.state, document.title, url);
  });
};

export default historyAdapter;
