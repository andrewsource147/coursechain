import { takeLatest, put, call } from 'redux-saga/effects'
import {newWeb3Instance} from "../services/blockchain/web3"
import * as commonActions from "../actions/commonActions"

function* checMetamaskInstall() {
  const web3Instance = newWeb3Instance();

  if (web3Instance === false) {
    yield put(commonActions.throwMetamaskError("Metamask is not installed"));
    return
  }

  //check network is correct
  const networkId = yield call([web3Instance, web3Instance.getNetworkId]);

  if (networkId !== 3) {
    yield put(commonActions.throwMetamaskError("Network is not in ropsten network"));
  }
}

export default function* commonWatcher() {
  yield takeLatest("COMMON.CHECK_METAMASK_INSTALL", checMetamaskInstall)
}
