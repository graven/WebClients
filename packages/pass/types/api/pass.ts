/**
 * ⚠️ Do not edit this file - it is autogenerated using
 * `https://github.com/MatthiasMargot/typegen/pull/34`
 * from the Pass API swagger OpenAPI file
 */
export enum ResponseCodeSuccess {
    ProtonResponseCode_1000 = 1000,
}

export type ProtonError = {
    Code?: number;
    /* Error message */
    Error?: string;
    /* Error description (can be an empty object) */
    Details?: {};
};

export type ItemCreateRequest = {
    /* Encrypted ID of the VaultKey used to create this item */
    KeyRotation: number;
    /* Version of the content format used to create the item */
    ContentFormatVersion: number;
    /* Encrypted item content encoded in Base64 */
    Content: string;
    /* Item key encrypted with the VaultKey, contents encoded in base64 */
    ItemKey: string;
};

export type CustomAliasCreateRequest = {
    /* Prefix for the alias to be created (prefix.xxx@domain.com) */
    Prefix: string;
    /* Signed suffix for the alias to be created (xxx.asdaa3@domain.com.signature) */
    SignedSuffix: string;
    /* IDs for the mailboxes that will receive emails sent to this alias */
    MailboxIDs: number[];
    Item: ItemCreateRequest2;
};

export type SetAliasMailboxesRequest = {
    /* IDs for the mailboxes that will receive emails sent to this alias */
    MailboxIDs: number[];
};

export type ImportItemBatchRequest = {
    /* Items to be imported */
    Items: ImportItemRequest[];
};

export type InviteAcceptRequest = {
    /* Invite keys encrypted and signed with the User Key */
    Keys: KeyRotationKeyPair[];
};

export type AliasAndItemCreateRequest = {
    Alias: CustomAliasCreateRequest;
    Item: ItemCreateRequest;
};

export type ItemsToTrashRequest = {
    /* Pairs of item IDs with their latest revision */
    Items: ItemIDRevision[];
};

export type ItemsToSoftDeleteRequest = {
    /* ItemIDs with their current revision */
    Items: ItemIDRevision2[];
    /* Skip checking that the items are in the trash. Allows to delete directly */
    SkipTrash?: boolean | null;
};

export type ItemUpdateRequest = {
    KeyRotation: number;
    /* Last item revision existing when the item was created */
    LastRevision: number;
    /* Encrypted item content encoded in Base64 */
    Content?: string;
    /* Version of the content format used to create the item */
    ContentFormatVersion: number;
};

export type UpdateItemLastUseTimeRequest = {
    /* Time when the item was last used.
     *                       If no value is passed then the current server time will be used. */
    LastUseTime?: number;
};

export type ItemMoveToShareRequest = {
    /* Encrypted ID of the destination share */
    ShareID?: string;
    Item: ItemCreateRequest;
};

export type KeyRotationRequest = {
    /* Current key rotation */
    CurrentKeyRotation?: number;
    /* New vault key base64 encoded, encrypted and signed with the current primary user key */
    VaultKey: string;
    /* New encryption keys for the items in the vault */
    ItemKeys?: EncodedKeyRotationItemKey[];
    /* Vault key encrypted for the users that have vault shares EXCEPT the current user */
    VaultKeyForShares?: EncodedKeyRotationShareKeyForAddress[];
    /* Item key encrypted each share of type item */
    ItemKeysForShares?: EncodedKeyRotationShareKeyForAddress[];
};

export type PendingShareKeyPromoteRequest = {
    /* Pending share keys to promote */
    Keys: EncryptedKeyWithRotation[];
};

export type UserSessionLockRequest = {
    /* Lock code to attach to this session */
    LockCode: string;
    /* Number of seconds the session will stay unlocked */
    UnlockedSecs: number;
};

export type UserSessionUnlockRequest = {
    /* Lock code to attach to this session */
    LockCode: string;
};

export type InviteCreateRequest = {
    /* List of keys encrypted for the other user's address key and signed with your address key */
    Keys: KeyRotationKeyPair[];
    /* Email of the target user */
    Email: string;
    /* Invite target type. 1 = Vault, 2 = Item */
    TargetType: number;
    /* Invite encrypted item ID (only in case the invite is of type Item) */
    ItemID?: string | null;
    /* Expiration time for the share */
    ExpirationTime?: number | null;
};

export type ShareUpdateRequest = {
    /* Permissions to set for this share */
    Permission?: number | null;
    /* Expiration time to set for this share */
    ExpireTime?: number | null;
};

export type VaultCreateRequest = {
    /* AddressID that should be displayed as the owner */
    AddressID: string;
    /* Vault content protocol buffer data encrypted with the vault key */
    Content: string;
    /* Vault content format version. Should be 1 for now. */
    ContentFormatVersion: number;
    /* Vault key encrypted and signed with the primary user key */
    EncryptedVaultKey: string;
};

export type VaultUpdateRequest = {
    /* Vault content protocol buffer data encrypted with the vault key */
    Content: string;
    /* Vault content format version. Should be 1 for now. */
    ContentFormatVersion: number;
    /* Key rotation used to encrypt the content */
    KeyRotation: number;
};

export type AliasOptionsResponse = {
    /* List of possible suffixes when creating a new alias. Only valid for 10 minutes */
    Suffixes: AliasSuffixResponse[];
    /* List of possible mailboxes when creating a new alias */
    Mailboxes: AliasMailboxResponse[];
    /* Whether the user can create new alias */
    CanCreateAlias: boolean;
};

export type ItemRevisionContentsResponse = {
    ItemID: string;
    Revision: number;
    ContentFormatVersion: number;
    KeyRotation?: number;
    /* Base64 encoded item contents */
    Content: string;
    /* Base64 encoded item key. Only for vault shares. */
    ItemKey?: string | null;
    /* Revision state. Values: 1 = Active, 2 = Trashed */
    State: number;
    /* In case this item contains an alias, this is the email address for the alias */
    AliasEmail?: string | null;
    /* Creation time of the item */
    CreateTime: number;
    /* Time of the latest modification of the item */
    ModifyTime: number;
    /* Time when the item was last used */
    LastUseTime?: number;
    /* Creation time of this revision */
    RevisionTime: number;
};

export type AliasDetailsResponse = {
    /* Email of the alias */
    Email: string;
    /* List of mailboxes of the alias */
    Mailboxes: AliasMailboxResponse2[];
    /* List of mailboxes that can be linked to the alias */
    AvailableMailboxes: AliasMailboxResponse2[];
};

export type ItemRevisionListResponse = {
    RevisionsData: ItemRevisionContentsResponse[];
    /* Total number of items */
    Total: number;
    /* Token to pass for getting the next page. Null if there is none */
    LastToken: string | null;
};

export type InvitesGetResponse = {
    /* Invites */
    Invites: InviteDataForUser[];
};

export type AliasAndItemResponse = {
    Alias: ItemRevisionContentsResponse;
    Item: ItemRevisionContentsResponse;
};

export type ItemTrashResponse = {
    /* Updated items */
    Items: ItemRevisionResponse[];
};

export type ItemLatestKeyResponse = {
    /* Key rotation */
    KeyRotation: number;
    /* Base64 representation of the encrypted Item Key */
    Key: string;
};

export type ItemGetKeysResponse = {
    /* Keys */
    Keys: ItemKeyResponse[];
    /* Total number of keys */
    Total: number;
};

export type ShareKeysResponse = {
    /* Keys */
    Keys: ShareKeyResponse[];
    /* Total number of keys */
    Total: number;
};

export type ShareKeyResponse = {
    /* Rotation for this key */
    KeyRotation: number;
    /* Base64 encoded key */
    Key: string;
    /* UserKeyID to open this key */
    UserKeyID?: string;
    /* When was this key created */
    CreateTime: number;
};

export type PendingShareKeysListResponse = {
    /* Pending share keys */
    Pending?: PendingShareKeyGetResponse[];
};

export type EventIDGetResponse = {
    /* Last event ID for this share */
    EventID?: string;
};

export type PassEventListResponse = {
    /* Updated share in case the vault content changes */
    UpdatedShare?: ShareGetResponse | null;
    /* New or updated items */
    UpdatedItems: ItemRevisionContentsResponse[];
    /* Deleted items */
    DeletedItemIDs: string[];
    /* Items that have the last use time updated */
    LastUseItems?: ItemIDLastUseTime[];
    /* New key rotation value if there has been a key rotation */
    NewKeyRotation?: number | null;
    /* New eventID if for future requests */
    LatestEventID: string;
    /* If there are more events to process this will be true */
    EventsPending: boolean;
    /* If the share needs a full refresh this will be true */
    FullRefresh?: boolean;
};

export type SessionLockStorageTokenResponse = {
    /* Storage token to encrypt the local storage */
    StorageToken: string;
};

export type SessionLockCheckExistsResponse = {
    /* Whether this session has a lock registered or not */
    Exists: boolean;
    /* If the lock exists, that is the unlocked time */
    UnlockedSecs?: number | null;
};

export type SharesGetResponse = {
    /* List of shares */
    Shares: ShareGetResponse[];
};

export type ShareGetResponse = {
    ShareID: string;
    VaultID: string;
    /* AddressID that will be displayed as the owner of the share */
    AddressID: string;
    /* Whether this vault is primary for this user */
    Primary: boolean;
    /* Type of share. 1 for vault, 2 for item */
    TargetType: number;
    /* TargetID for this share */
    TargetID: string;
    /* Permissions for this share */
    Permission: number;
    /* Base64 encoded content of the share. Only shown if it a vault share */
    Content?: string | null;
    /* Key rotation that should be used to open the content */
    ContentKeyRotation?: number | null;
    /* Content format version */
    ContentFormatVersion?: number | null;
    /* If the share will expire, when it will expire */
    ExpireTime?: number | null;
    /* Share creation time */
    CreateTime: number;
};

export type InvitesForVaultGetResponse = {
    /* Invites */
    Invites: VaultInviteData[];
};

export type ActiveSharesInVaultGetResponse = {
    /* Shares */
    Shares: ActiveShareGetResponse[];
    /* Total amount of shares */
    Total: number;
};

export type ActiveShareGetResponse = {
    /* ID of the share */
    ShareID: string;
    /* Name of the user */
    UserName: string;
    /* Email of the user */
    UserEmail: string;
    /* Type of share. 1 for vault, 2 for item */
    TargetType: number;
    /* ID of the top object that this share gives access to */
    TargetID: string;
    /* Permissions this share has */
    Permission: number;
    /* Expiration time if set */
    ExpireTime?: number | null;
    /* Creation time of this share */
    CreateTime: number;
};

export type GetMissingAliasResponse = {
    /* MissingAlias */
    MissingAlias?: MissingAliasDto[];
};

export type ItemCreateRequest2 = {};

export type ImportItemRequest = {
    Item: ItemCreateRequest;
    /* Alias email in case this item is an alias item */
    AliasEmail?: string | null;
    /* Wether this item is the trash. Default value is false. */
    Trashed?: boolean;
    /* When was this item created. By default it will be now */
    CreateTime?: number | null;
    /* When was this item modified. By default it will be now */
    ModifyTime?: number | null;
};

export type KeyRotationKeyPair = {
    /* Key rotation */
    KeyRotation: number;
    /* Encrypted key encoded in base64 */
    Key: string;
};

export type ItemIDRevision = {};

export type ItemIDRevision2 = {
    /* ItemID */
    ItemID: string;
    /* Current revision for the item */
    Revision: number;
};

export type EncodedKeyRotationItemKey = {
    /* ItemID for this encrypted key */
    ItemID: string;
    /* Base64 encoded item key */
    ItemKey: string;
};

export type EncodedKeyRotationShareKeyForAddress = {
    /* ShareID for this key */
    ShareID: string;
    /* AddressID to which this key is encrypted */
    AddressID: string;
    /* Base64 encoded key encrypted for the address key of the user and signed with our address key */
    EncryptedKeyForAddress: string;
};

export type EncryptedKeyWithRotation = {
    /* Key rotation */
    KeyRotation: number;
    /* Encrypted key encoded in base64 */
    EncryptedKey: string;
};

export type AliasSuffixResponse = {
    /* Alias ending including the domain */
    Suffix?: string;
    /* Signed suffix to ensure users cannot generate their own */
    SignedSuffix?: string;
    /* Whether this is a user domain or a public SL domain */
    IsCustom?: boolean;
    /* Domain that this suffix uses */
    Domain?: string;
};

export type AliasMailboxResponse = {
    /* ID of the mailbox in SimpleLogin */
    ID: number;
    /* Email of the mailbox */
    Email: string;
};

export type AliasMailboxResponse2 = {
    /* ID of the mailbox in SimpleLogin */
    ID: number;
    /* Email of the mailbox */
    Email: string;
};

export type InviteDataForUser = {
    /* InviteID */
    InviteID: string;
    /* Number of reminders sent */
    RemindersSent: number;
    /* Type of target for this invite */
    TargetType: number;
    /* TargetID for this invite */
    TargetID: string;
    /* Email of the inviter */
    InviterEmail: string;
    /* Invited email */
    InvitedEmail?: string;
    /* Keys for the invite */
    Keys: KeyRotationKeyPair[];
    /* Creation time for the invite */
    CreateTime: number;
};

export type ItemRevisionResponse = {
    /* ID of the item */
    ItemID: number;
    /* Latest item revision */
    Revision: number;
    /* Revision state. Values: 1 = Active, 2 = Trashed */
    State: number;
    /* Time of the latest modification of the item */
    ModifyTime: number;
    /* Creation time of this revision */
    RevisionTime: number;
};

export type ItemKeyResponse = {
    /* Rotation for this key */
    KeyRotation: number;
    /* Base64 encoded key */
    Key: string;
};

export type PendingShareKeyGetResponse = {
    /* Pending share key ID */
    PendingShareKeyID: string;
    /* AddressID for this pending share key */
    AddressID: string;
    /* AddressID that did the key rotation. Should be signing this key. */
    RotatorAddressID?: string;
    /* Key rotation for this pending share key */
    KeyRotation: number;
    /* Base64 encoded encrypted shake key for this address */
    EncryptedKey: string;
};

export type ItemIDLastUseTime = {
    /* Item ID */
    ItemID: string;
    /* Last use time for this item */
    LastUseTime: number;
};

export type VaultInviteData = {
    /* InviteID */
    InviteID: string;
    /* Email of the invited user */
    InvitedEmail: string;
    /* Email of the user who created the invite */
    InviterEmail: string;
    /* Target type for the invite */
    TargetType: number;
    /* Target ID for the invite */
    TargetID: string;
    /* Number of reminders sent to the invited user */
    RemindersSent: number;
    /* Creation time for the invite */
    CreateTime: number;
    /* Modify time for the invite */
    ModifyTime: number;
};

export type MissingAliasDto = {
    /* Email of the alias */
    Email?: string;
    /* Email note as stored in SL */
    Note?: string;
};

export type ApiMethod = string;

export type ApiResponse<Path extends string, Method extends ApiMethod> = Path extends `pass/v1/vault/${string}/primary`
    ? Method extends `put`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/vault/${string}`
    ? Method extends `put`
        ? { Code?: ResponseCodeSuccess; Share?: ShareGetResponse }
        : Method extends `delete`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/vault`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Share?: ShareGetResponse }
        : never
    : Path extends `pass/v1/user/session/lock/unlock`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; LockData?: SessionLockStorageTokenResponse }
        : never
    : Path extends `pass/v1/user/session/lock/force_lock`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/user/session/lock/check`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; LockInfo?: SessionLockCheckExistsResponse }
        : never
    : Path extends `pass/v1/user/session/lock`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; LockData?: SessionLockStorageTokenResponse }
        : Method extends `delete`
        ? { Code?: ResponseCodeSuccess; LockData?: SessionLockStorageTokenResponse }
        : never
    : Path extends `pass/v1/user/missing_alias`
    ? Method extends `get`
        ? GetMissingAliasResponse & { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/user/access`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/user/${string}`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Share?: ActiveShareGetResponse }
        : Method extends `put`
        ? { Code?: ResponseCodeSuccess }
        : Method extends `delete`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/user`
    ? Method extends `get`
        ? ActiveSharesInVaultGetResponse & { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/key/pending`
    ? Method extends `get`
        ? {
              Code?: ResponseCodeSuccess;
              PendingShareKeys?: PendingShareKeysListResponse;
          }
        : Method extends `post`
        ? { Code?: ResponseCodeSuccess; ShareKeys?: ShareKeysResponse }
        : never
    : Path extends `pass/v1/share/${string}/key`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; ShareKeys?: ShareKeysResponse }
        : Method extends `post`
        ? { Code?: ResponseCodeSuccess; ShareKey?: ShareKeyResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/with_alias`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Bundle?: AliasAndItemResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/untrash`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Items?: ItemTrashResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/trash`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Items?: ItemTrashResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/import/batch`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Revisions?: ItemRevisionListResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/share`
    ? Method extends `put`
        ? { Code?: ResponseCodeSuccess; Item?: ItemRevisionContentsResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/revision`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Revisions?: ItemRevisionListResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/lastuse`
    ? Method extends `put`
        ? { Code?: ResponseCodeSuccess; Revision?: ItemRevisionContentsResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/key/latest`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Key?: ItemLatestKeyResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/key`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Keys?: ItemGetKeysResponse }
        : never
    : Path extends `pass/v1/share/${string}/item/${string}`
    ? Method extends `put`
        ? { Code?: ResponseCodeSuccess; Item?: ItemRevisionContentsResponse }
        : never
    : Path extends `pass/v1/share/${string}/item`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Items?: ItemRevisionListResponse }
        : Method extends `post`
        ? { Code?: ResponseCodeSuccess; Item?: ItemRevisionContentsResponse }
        : Method extends `delete`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/invite/${string}/reminder`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/invite/${string}`
    ? Method extends `delete`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/invite`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Shares?: InvitesForVaultGetResponse }
        : Method extends `post`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/event/${string}`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Events?: PassEventListResponse }
        : never
    : Path extends `pass/v1/share/${string}/event`
    ? Method extends `get`
        ? EventIDGetResponse & { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/share/${string}/alias/random`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Item?: ItemRevisionContentsResponse }
        : never
    : Path extends `pass/v1/share/${string}/alias/options`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Options?: AliasOptionsResponse }
        : never
    : Path extends `pass/v1/share/${string}/alias/custom`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Item?: ItemRevisionContentsResponse }
        : never
    : Path extends `pass/v1/share/${string}/alias/${string}/mailbox`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess; Item?: AliasDetailsResponse }
        : never
    : Path extends `pass/v1/share/${string}/alias/${string}`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Item?: AliasDetailsResponse }
        : never
    : Path extends `pass/v1/share/${string}`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; Share?: ShareGetResponse }
        : never
    : Path extends `pass/v1/share`
    ? Method extends `get`
        ? SharesGetResponse & { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/invite/${string}`
    ? Method extends `post`
        ? { Code?: ResponseCodeSuccess }
        : never
    : Path extends `pass/v1/invite`
    ? Method extends `get`
        ? { Code?: ResponseCodeSuccess; ''?: InvitesGetResponse }
        : never
    : any;

export type ApiRequest<Path extends string, Method extends ApiMethod> = Path extends `pass/v1/vault/${string}/primary`
    ? Method extends `put`
        ? never
        : never
    : Path extends `pass/v1/vault/${string}`
    ? Method extends `put`
        ? VaultUpdateRequest
        : Method extends `delete`
        ? never
        : never
    : Path extends `pass/v1/vault`
    ? Method extends `post`
        ? VaultCreateRequest
        : never
    : Path extends `pass/v1/user/session/lock/unlock`
    ? Method extends `post`
        ? UserSessionUnlockRequest
        : never
    : Path extends `pass/v1/user/session/lock/force_lock`
    ? Method extends `post`
        ? never
        : never
    : Path extends `pass/v1/user/session/lock/check`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/user/session/lock`
    ? Method extends `post`
        ? UserSessionLockRequest
        : Method extends `delete`
        ? UserSessionUnlockRequest
        : never
    : Path extends `pass/v1/user/missing_alias`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/user/access`
    ? Method extends `post`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/user/${string}`
    ? Method extends `get`
        ? never
        : Method extends `put`
        ? ShareUpdateRequest
        : Method extends `delete`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/user`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/key/pending`
    ? Method extends `get`
        ? never
        : Method extends `post`
        ? PendingShareKeyPromoteRequest
        : never
    : Path extends `pass/v1/share/${string}/key`
    ? Method extends `get`
        ? never
        : Method extends `post`
        ? KeyRotationRequest
        : never
    : Path extends `pass/v1/share/${string}/item/with_alias`
    ? Method extends `post`
        ? AliasAndItemCreateRequest
        : never
    : Path extends `pass/v1/share/${string}/item/untrash`
    ? Method extends `post`
        ? ItemsToTrashRequest
        : never
    : Path extends `pass/v1/share/${string}/item/trash`
    ? Method extends `post`
        ? { ''?: ItemsToTrashRequest }
        : never
    : Path extends `pass/v1/share/${string}/item/import/batch`
    ? Method extends `post`
        ? ImportItemBatchRequest
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/share`
    ? Method extends `put`
        ? ItemMoveToShareRequest
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/revision`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/lastuse`
    ? Method extends `put`
        ? UpdateItemLastUseTimeRequest
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/key/latest`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/item/${string}/key`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/item/${string}`
    ? Method extends `put`
        ? ItemUpdateRequest
        : never
    : Path extends `pass/v1/share/${string}/item`
    ? Method extends `get`
        ? never
        : Method extends `post`
        ? ItemCreateRequest
        : Method extends `delete`
        ? ItemsToSoftDeleteRequest
        : never
    : Path extends `pass/v1/share/${string}/invite/${string}/reminder`
    ? Method extends `post`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/invite/${string}`
    ? Method extends `delete`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/invite`
    ? Method extends `get`
        ? never
        : Method extends `post`
        ? InviteCreateRequest
        : never
    : Path extends `pass/v1/share/${string}/event/${string}`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/event`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/alias/random`
    ? Method extends `post`
        ? ItemCreateRequest
        : never
    : Path extends `pass/v1/share/${string}/alias/options`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}/alias/custom`
    ? Method extends `post`
        ? CustomAliasCreateRequest
        : never
    : Path extends `pass/v1/share/${string}/alias/${string}/mailbox`
    ? Method extends `post`
        ? SetAliasMailboxesRequest
        : never
    : Path extends `pass/v1/share/${string}/alias/${string}`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share/${string}`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/share`
    ? Method extends `get`
        ? never
        : never
    : Path extends `pass/v1/invite/${string}`
    ? Method extends `post`
        ? InviteAcceptRequest
        : never
    : Path extends `pass/v1/invite`
    ? Method extends `get`
        ? never
        : never
    : any;
