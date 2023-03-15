import { createAction } from '@reduxjs/toolkit';
import { c } from 'ttag';

import { ExtensionEndpoint, Maybe, TabId, WorkerStatus } from '@proton/pass/types';
import { pipe } from '@proton/pass/utils/fp';
import { Address, User } from '@proton/shared/lib/interfaces';

import { SynchronizationResult } from '../../sagas/workers/sync';
import * as requests from '../requests';
import withNotification from '../with-notification';
import withReceiver, { WithReceiverOptions } from '../with-receiver';
import withRequest from '../with-request';

/**
 * do not cast payload::cache to type `State`
 * in order to avoid circular type refs
 */
export const stateSync = createAction('state sync', (state: any, options?: WithReceiverOptions) =>
    withReceiver(options ?? {})({ payload: { state } })
);

export const wakeup = createAction(
    'wakeup',
    (payload: { status: WorkerStatus; endpoint: ExtensionEndpoint; tabId: TabId }) =>
        pipe(
            withReceiver({ receiver: payload.endpoint, tabId: payload.tabId }),
            withRequest({ id: requests.wakeup(payload.endpoint, payload.tabId), type: 'start' })
        )({ payload })
);

export const wakeupSuccess = createAction('wakeup success', (payload: { endpoint: ExtensionEndpoint; tabId: TabId }) =>
    pipe(
        withReceiver({ receiver: payload.endpoint, tabId: payload.tabId }),
        withRequest({ id: requests.wakeup(payload.endpoint, payload.tabId), type: 'success' })
    )({ payload })
);

export const boot = createAction('boot', withRequest({ id: requests.boot(), type: 'start' }));

export const bootFailure = createAction('boot failure', (error: unknown) =>
    pipe(
        withRequest({ id: requests.boot(), type: 'failure' }),
        withNotification({
            type: 'error',
            text: c('Error').t`Unable to boot`,
            error,
        })
    )({ payload: {} })
);

export const bootSuccess = createAction(
    'boot success',
    (payload: { user: Maybe<User>; addresses: Maybe<Address[]>; sync: Maybe<SynchronizationResult> }) =>
        withRequest({ id: requests.boot(), type: 'success' })({ payload })
);

export const syncIntent = createAction('sync intent', withRequest({ id: requests.syncing(), type: 'start' }));

export const syncSuccess = createAction('sync success', (payload: SynchronizationResult) =>
    pipe(
        withRequest({ id: requests.syncing(), type: 'success' }),
        withNotification({ type: 'info', text: c('Info').t`Successfully synced all vaults` })
    )({ payload })
);

export const syncFailure = createAction('sync failure', (error: unknown) =>
    pipe(
        withRequest({ id: requests.syncing(), type: 'failure' }),
        withNotification({
            type: 'error',
            text: c('Error').t`Unable to sync`,
            error,
        })
    )({ payload: {} })
);
