import { render } from '@testing-library/react';
import { nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday } from 'date-fns';

import { useUser, useUserSettings } from '@proton/components/hooks';
import { MAIL_APP_NAME } from '@proton/shared/lib/constants';

import SnoozeDurationSelection from './SnoozeDurationSelection';

jest.mock('@proton/components/hooks/useUser');
jest.mock('@proton/components/hooks/useUserSettings');

const renderComponent = (canUnsnooze: boolean) => {
    return render(
        <SnoozeDurationSelection
            canUnsnooze={canUnsnooze}
            handleCustomClick={jest.fn}
            handleSnooze={jest.fn}
            handleUnsnoozeClick={jest.fn}
        />
    );
};

describe('SnoozeDurationSelection', () => {
    const useUserMock = useUser as jest.Mock;
    const useUserSettingsMock = useUserSettings as jest.Mock;
    beforeAll(() => {
        useUserMock.mockImplementation(() => [{ hasPaidMail: false }, jest.fn]);
        useUserSettingsMock.mockImplementation(() => [{ WeekStart: 1 }]);
    });
    afterAll(() => {
        useUserMock.mockReset();
        useUserSettingsMock.mockReset();
    });

    it('should render all Monday options', () => {
        const date = nextMonday(new Date());
        jest.useFakeTimers({ now: date.getTime() });

        const { getByTestId } = renderComponent(false);
        expect(getByTestId('snooze-duration-tomorrow'));
        expect(getByTestId('snooze-duration-later'));
        expect(getByTestId('snooze-duration-weekend'));
        expect(getByTestId('snooze-duration-nextweek'));
    });

    it('should render all Tuesday options', () => {
        const date = nextTuesday(new Date());
        jest.useFakeTimers({ now: date.getTime() });

        const { getByTestId } = renderComponent(false);
        expect(getByTestId('snooze-duration-tomorrow'));
        expect(getByTestId('snooze-duration-later'));
        expect(getByTestId('snooze-duration-weekend'));
        expect(getByTestId('snooze-duration-nextweek'));
    });

    it('should render all Wednesday options', () => {
        const date = nextWednesday(new Date());
        jest.useFakeTimers({ now: date.getTime() });

        const screen = renderComponent(false);
        expect(screen.getByTestId('snooze-duration-tomorrow'));
        expect(screen.getByTestId('snooze-duration-later'));
        expect(screen.getByTestId('snooze-duration-weekend'));
        expect(screen.getByTestId('snooze-duration-nextweek'));
        expect(screen.getByTestId('snooze-duration-custom'));
    });

    it('should render all Thursday options', () => {
        const date = nextThursday(new Date());
        jest.useFakeTimers({ now: date.getTime() });

        const { getByTestId } = renderComponent(false);
        expect(getByTestId('snooze-duration-tomorrow'));
        expect(getByTestId('snooze-duration-weekend'));
        expect(getByTestId('snooze-duration-nextweek'));
        expect(getByTestId('snooze-duration-custom'));
    });

    it('should render all Friday options', () => {
        const date = nextFriday(new Date());
        jest.useFakeTimers({ now: date.getTime() });

        const { getByTestId } = renderComponent(false);
        expect(getByTestId('snooze-duration-tomorrow'));
        expect(getByTestId('snooze-duration-later'));
        expect(getByTestId('snooze-duration-nextweek'));
        expect(getByTestId('snooze-duration-custom'));
    });

    it('should render all Saturday options', () => {
        const date = nextSaturday(new Date());
        jest.useFakeTimers({ now: date.getTime() });

        const { getByTestId } = renderComponent(false);
        expect(getByTestId('snooze-duration-tomorrow'));
        expect(getByTestId('snooze-duration-nextweek'));
        expect(getByTestId('snooze-duration-custom'));
    });

    it('should render all Sunday options', () => {
        const date = nextSunday(new Date());
        jest.useFakeTimers({ now: date.getTime() });

        const { getByTestId } = renderComponent(false);
        expect(getByTestId('snooze-duration-tomorrow'));
        expect(getByTestId('snooze-duration-custom'));
    });

    it('should render the unsnooze option', () => {
        const { getByTestId } = renderComponent(true);
        expect(getByTestId('snooze-duration-unsnooze'));
    });

    it('should render the upsell button for free users', () => {
        const { getByAltText } = renderComponent(false);
        expect(getByAltText(`Upgrade to ${MAIL_APP_NAME} Plus to unlock`));
    });

    it('should not render the upsell button for free users', () => {
        useUserMock.mockImplementation(() => [{ hasPaidMail: true }, jest.fn]);

        const { queryByAltText } = renderComponent(false);
        expect(queryByAltText(`Upgrade to ${MAIL_APP_NAME} Plus to unlock`)).toBeNull();
    });
});
