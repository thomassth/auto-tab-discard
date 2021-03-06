/* global log, query */

const observe = activeInfo => chrome.tabs.get(activeInfo.tabId, tab => tab.index - 1 >= 0 && query({
  windowId: activeInfo.windowId,
  index: tab.index - 1,
  discarded: true
}).then(tbs => {
  if (tbs.length) {
    console.log(tbs, tbs[0].id);
    log('release discarding of the previous tab', tbs[0]);
    chrome.tabs.reload(tbs[0].id);
  }
}));

function enable() {
  log('previous.enable is called');
  chrome.tabs.onActivated.addListener(observe);
}
function disable() {
  log('previous.disable is called');
  chrome.tabs.onActivated.removeListener(observe);
}

export {
  enable,
  disable
};
