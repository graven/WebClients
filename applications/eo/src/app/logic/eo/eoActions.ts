import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getEOMessage, getEOToken } from '@proton/shared/lib/api/eo';
import { decodeUtf8Base64, encodeUtf8Base64 } from 'pmcrypto';
import { get } from 'proton-mail/src/app/helpers/attachment/attachmentLoader';
import { MessageState, OutsideKey } from 'proton-mail/src/app/logic/messages/messagesTypes';
import { createBlob } from 'proton-mail/src/app/helpers/message/messageEmbeddeds';
import { preloadImage } from 'proton-mail/src/app/helpers/dom';
import { EO_DECRYPTED_TOKEN_KEY, EO_PASSWORD_KEY, EO_TOKEN_KEY } from '../../constants';
import { convertEOtoMessageState, decrypt } from '../../helpers/message';
import {
    EODocumentInitializeParams,
    EOInitParams,
    EOInitResult,
    EOLoadEmbeddedParams,
    EOLoadEmbeddedResults,
    EOLoadRemoteParams,
    EOLoadRemoteResults,
    EOMessage,
    EOMessageParams,
    EOTokenParams,
} from './eoType';

export const init = createAsyncThunk<EOInitResult, EOInitParams>('eo/init', async ({ get }) => {
    try {
        const token = get(EO_TOKEN_KEY);
        const decryptedToken = get(EO_DECRYPTED_TOKEN_KEY);
        const password = get(EO_PASSWORD_KEY);

        return {
            token,
            decryptedToken: decryptedToken ? decodeUtf8Base64(decryptedToken) : undefined,
            password: password ? decodeUtf8Base64(password) : undefined,
        };
    } catch (error: any | undefined) {
        console.log(error);
        throw error;
    }
});

export const loadEOToken = createAsyncThunk<string, EOTokenParams>('eo/token/load', async ({ api, id, set }) => {
    try {
        const { Token } = await api(getEOToken(id));

        set(EO_TOKEN_KEY, Token);

        return Token;
    } catch (error: any | undefined) {
        console.log(error);
        throw error;
    }
});

export const loadEOMessage = createAsyncThunk<{ eoMessage: EOMessage; messageState: MessageState }, EOMessageParams>(
    'eo/message/load',
    async ({ api, token, id, password, set }) => {
        try {
            // Get the actual message
            const { Message } = await api(getEOMessage(token, id));

            // Decrypt message bodies (body + replies bodies)
            await decrypt(Message?.Body, password).then((body) => {
                Message.DecryptedBody = body;
            });

            const messageState = convertEOtoMessageState(Message, token) as any;

            if (set) {
                set(EO_DECRYPTED_TOKEN_KEY, encodeUtf8Base64(token));
                set(EO_PASSWORD_KEY, encodeUtf8Base64(password));
            }

            return { eoMessage: Message, messageState };
        } catch (error: any | undefined) {
            console.log(error);
            throw error;
        }
    }
);

export const EODocumentInitializePending = createAction<void>('eo/message/document/initialize/pending');

export const EODocumentInitializeFulfilled = createAction<EODocumentInitializeParams>(
    'eo/message/document/initialize/fulfilled'
);

export const EOLoadEmbedded = createAsyncThunk<EOLoadEmbeddedResults, EOLoadEmbeddedParams>(
    'eo/message/embedded/load',
    async ({ attachments, api, messageVerification, password, id, decryptedToken }) => {
        return Promise.all(
            attachments.map(async (attachment) => {
                const buffer = await get(
                    attachment,
                    messageVerification,
                    {
                        type: 'outside',
                        id,
                        password,
                        decryptedToken,
                    } as OutsideKey,
                    api
                );
                return {
                    attachment,
                    blob: createBlob(attachment, buffer.data as Uint8Array),
                };
            })
        );
    }
);

export const EOLoadRemote = createAsyncThunk<EOLoadRemoteResults[], EOLoadRemoteParams>(
    'eo/message/remote/load',
    async ({ imagesToLoad }) => {
        return Promise.all(
            imagesToLoad.map(async (image): Promise<EOLoadRemoteResults> => {
                try {
                    await preloadImage(image.url as string);
                    return { image };
                } catch (error: any) {
                    return { image, error };
                }
            })
        );
    }
);
