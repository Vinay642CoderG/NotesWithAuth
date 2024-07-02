import { lazy } from "react";

function lazyLoad(resolve) {
    return lazy(() =>
      new Promise((res, rej) => {
        setTimeout((val) =>res(resolve), 500);
      })
    );
  }

export default lazyLoad;