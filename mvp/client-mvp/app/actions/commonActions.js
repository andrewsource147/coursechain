export function checkMetamaskInstall() {
  return {
    type: "COMMON.CHECK_METAMASK_INSTALL"
  }
}

export function throwMetamaskError(err) {
  return {
    type: "COMMON.THROW_METAMASK_ERROR",
    payload: {err}
  }
}
