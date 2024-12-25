export function getCurrentURL() {
  return window.location.origin;
}

export const joinPaths = (...args) => args.join("/");

export function getLastTimeFromData(data) {
  let time = new Date(0).getTime();
  data.map((ele) => {
    if (new Date(ele.date).getTime() > time) {
      time = new Date(ele.date).getTime();
    }
  });
}
