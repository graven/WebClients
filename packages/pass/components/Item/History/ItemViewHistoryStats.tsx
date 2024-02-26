import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { c } from 'ttag';

import { Button } from '@proton/atoms/Button';
import { HistoryItem } from '@proton/pass/components/Item/History/HistoryItem';
import { useFeatureFlag } from '@proton/pass/hooks/useFeatureFlag';
import { isPaidPlan } from '@proton/pass/lib/user/user.predicates';
import { selectPassPlan } from '@proton/pass/store/selectors';
import type { MaybeNull } from '@proton/pass/types';
import { PassFeature } from '@proton/pass/types/api/features';
import { getRelativeDateFromTimestamp } from '@proton/pass/utils/time/format';

type Props = {
    createTime: number;
    modifyTime: number;
    lastUseTime?: MaybeNull<number>;
    handleHistoryClick?: () => void;
};

export const ItemViewHistoryStats: FC<Props> = ({ createTime, modifyTime, lastUseTime, handleHistoryClick }) => {
    const historyEnabled = useFeatureFlag(PassFeature.PassItemHistoryV1);
    const passPlan = useSelector(selectPassPlan);

    return (
        <div className="flex flex-column border rounded-xl px-4 py-3 gap-3">
            {lastUseTime !== undefined && (
                <HistoryItem
                    icon="magic-wand"
                    title={c('Title').t`Last autofill`}
                    subtitle={
                        // translator: when this login was last used
                        lastUseTime ? getRelativeDateFromTimestamp(lastUseTime) : c('Info').t`Never`
                    }
                />
            )}
            <HistoryItem
                icon="pencil"
                title={c('Title').t`Last modified`}
                subtitle={getRelativeDateFromTimestamp(modifyTime)}
            />
            <HistoryItem
                icon="bolt"
                title={c('Title').t`Created`}
                subtitle={getRelativeDateFromTimestamp(createTime)}
            />
            {handleHistoryClick && historyEnabled && isPaidPlan(passPlan) && (
                <Button onClick={handleHistoryClick} className="mt-1" color="weak" shape="solid" fullWidth pill>
                    {c('Action').t`View history`}
                </Button>
            )}
        </div>
    );
};
