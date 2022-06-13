import { memo } from 'react';
import * as React from 'react';
import { c } from 'ttag';
import { Location } from 'history';
import { Vr } from '@proton/atoms';
import { Icon, useMailSettings, ToolbarButton } from '@proton/components';
import { MailSettings } from '@proton/shared/lib/interfaces';
import { Label } from '@proton/shared/lib/interfaces/Label';
import { Folder } from '@proton/shared/lib/interfaces/Folder';

import ReadUnreadButtons from './ReadUnreadButtons';
import ToolbarDropdown from './ToolbarDropdown';
import MoveButtons from './MoveButtons';
import MoreDropdown from './MoreDropdown';
import SelectAll from './SelectAll';
import MoveDropdown from '../dropdown/MoveDropdown';
import LabelDropdown from '../dropdown/LabelDropdown';
import PagingControls from './PagingControls';
import { Breakpoints } from '../../models/utils';
import NavigationControls from './NavigationControls';
import { MARK_AS_STATUS } from '../../hooks/useMarkAs';

const defaultSelectedIDs: string[] = [];

interface Props {
    loading?: boolean;
    onCheck: (IDs: string[], checked: boolean, replace: boolean) => void;
    labelID: string;
    elementID?: string;
    messageID?: string;
    selectedIDs: string[];
    checkedIDs: string[];
    elementIDs: string[];
    mailSettings: MailSettings;
    columnMode: boolean;
    conversationMode: boolean;
    breakpoints: Breakpoints;
    page: number;
    total: number | undefined;
    onPage: (page: number) => void;
    onBack: () => void;
    onElement: (elementID: string | undefined) => void;
    labelDropdownToggleRef: React.MutableRefObject<() => void>;
    moveDropdownToggleRef: React.MutableRefObject<() => void>;
    location: Location;
    labels?: Label[];
    folders?: Folder[];
    onMarkAs: (status: MARK_AS_STATUS) => Promise<void>;
    onMove: (labelID: string) => Promise<void>;
    onDelete: () => Promise<void>;
}

const Toolbar = ({
    labelID = '',
    messageID,
    elementID,
    onCheck,
    mailSettings,
    columnMode,
    conversationMode,
    breakpoints,
    selectedIDs = defaultSelectedIDs,
    checkedIDs,
    elementIDs,
    loading = false,
    onBack,
    page,
    total,
    onPage,
    onElement,
    labelDropdownToggleRef,
    moveDropdownToggleRef,
    location,
    labels,
    folders,
    onMarkAs,
    onMove,
    onDelete,
}: Props) => {
    const listInView = columnMode || !elementID;

    const [{ Shortcuts = 0 } = {}] = useMailSettings();

    const titleMove = Shortcuts ? (
        <>
            {c('Title').t`Move to`}
            <br />
            <kbd className="border-none">M</kbd>
        </>
    ) : (
        c('Title').t`Move to`
    );

    const titleLabel = Shortcuts ? (
        <>
            {c('Title').t`Label as`}
            <br />
            <kbd className="border-none">L</kbd>
        </>
    ) : (
        c('Title').t`Label as`
    );

    return (
        <nav className="toolbar toolbar--heavy flex flex-item-noshrink no-print flex-justify-space-between">
            <div className="flex">
                {listInView ? (
                    <SelectAll
                        labelID={labelID}
                        elementIDs={elementIDs}
                        checkedIDs={checkedIDs}
                        onCheck={onCheck}
                        loading={loading}
                    />
                ) : (
                    <ToolbarButton
                        icon={<Icon name="arrow-left" alt={c('Action').t`Back`} />}
                        onClick={onBack}
                        data-testid="toolbar:back-button"
                    />
                )}
                <Vr />
                <ReadUnreadButtons mailSettings={mailSettings} selectedIDs={selectedIDs} onMarkAs={onMarkAs} />
                <Vr />
                <MoveButtons
                    labelID={labelID}
                    labels={labels}
                    folders={folders}
                    breakpoints={breakpoints}
                    selectedIDs={selectedIDs}
                    onMove={onMove}
                    onDelete={onDelete}
                    mailSettings={mailSettings}
                />
                <Vr />
                <ToolbarDropdown
                    autoClose={false}
                    noMaxSize
                    disabled={!selectedIDs || !selectedIDs.length}
                    content={<Icon className="toolbar-icon" name="folder" />}
                    dropDownClassName="move-dropdown"
                    className="move-dropdown-button"
                    title={titleMove}
                    data-testid="toolbar:moveto"
                    externalToggleRef={moveDropdownToggleRef}
                >
                    {({ onClose, onLock }) => (
                        <MoveDropdown
                            labelID={labelID}
                            selectedIDs={selectedIDs}
                            conversationMode={conversationMode}
                            onClose={onClose}
                            onLock={onLock}
                            onBack={onBack}
                            breakpoints={breakpoints}
                        />
                    )}
                </ToolbarDropdown>
                <ToolbarDropdown
                    autoClose={false}
                    noMaxSize
                    disabled={!selectedIDs || !selectedIDs.length}
                    content={<Icon className="toolbar-icon" name="tag" />}
                    dropDownClassName="label-dropdown"
                    className="label-dropdown-button"
                    title={titleLabel}
                    data-testid="toolbar:labelas"
                    externalToggleRef={labelDropdownToggleRef}
                >
                    {({ onClose, onLock }) => (
                        <LabelDropdown
                            labelID={labelID}
                            labels={labels}
                            selectedIDs={selectedIDs}
                            onClose={onClose}
                            onLock={onLock}
                            breakpoints={breakpoints}
                        />
                    )}
                </ToolbarDropdown>
            </div>
            <div className="flex">
                {breakpoints.isDesktop && (
                    <MoreDropdown labelID={labelID} elementIDs={elementIDs} selectedIDs={selectedIDs} />
                )}
                {listInView ? (
                    <PagingControls loading={loading} page={page} total={total} onPage={onPage} />
                ) : (
                    <NavigationControls
                        loading={loading}
                        conversationMode={conversationMode}
                        elementID={elementID}
                        messageID={messageID}
                        elementIDs={elementIDs}
                        onElement={onElement}
                        labelID={labelID}
                        mailSettings={mailSettings}
                        location={location}
                    />
                )}
            </div>
        </nav>
    );
};

export default memo(Toolbar);
