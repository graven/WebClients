import { SharedURLFlags } from '@proton/shared/lib/interfaces/drive/sharing';

import { hasCustomPassword, hasGeneratedPasswordIncluded, splitGeneratedAndCustomPassword } from './shareUrl';

describe('Password flags checks', () => {
    describe('Missing data check', () => {
        it('returns false if flags are undefined', () => {
            expect(hasCustomPassword({})).toEqual(false);
            expect(hasGeneratedPasswordIncluded({})).toEqual(false);
        });
        it('returns false if SharedURLInfo is abscent', () => {
            expect(hasCustomPassword()).toEqual(false);
            expect(hasGeneratedPasswordIncluded()).toEqual(false);
        });
    });

    describe('hasCustomPassword', () => {
        it('returns true is CustomPassword flag is present', () => {
            expect(hasCustomPassword({ Flags: 0 | SharedURLFlags.CustomPassword })).toEqual(true);
            expect(
                hasCustomPassword({ Flags: SharedURLFlags.GeneratedPasswordIncluded | SharedURLFlags.CustomPassword })
            ).toEqual(true);
            expect(hasCustomPassword({ Flags: 0 })).toEqual(false);
        });
    });

    describe('hasGeneratedPasswordIncluded', () => {
        it('returns true is CustomPassword flag is present', () => {
            expect(hasGeneratedPasswordIncluded({ Flags: 0 | SharedURLFlags.GeneratedPasswordIncluded })).toEqual(true);
            expect(
                hasGeneratedPasswordIncluded({
                    Flags: SharedURLFlags.GeneratedPasswordIncluded | SharedURLFlags.CustomPassword,
                })
            ).toEqual(true);
            expect(hasGeneratedPasswordIncluded({ Flags: 0 })).toEqual(false);
        });
    });
});

describe('splitGeneratedAndCustomPassword', () => {
    it('no custom password returns only generated password', () => {
        expect(splitGeneratedAndCustomPassword('1234567890ab', { Flags: 0 })).toEqual(['1234567890ab', '']);
    });

    it('legacy custom password returns only custom password', () => {
        expect(splitGeneratedAndCustomPassword('abc', { Flags: SharedURLFlags.CustomPassword })).toEqual(['', 'abc']);
    });

    it('new custom password returns both generated and custom password', () => {
        expect(
            splitGeneratedAndCustomPassword('1234567890ababc', {
                Flags: SharedURLFlags.CustomPassword | SharedURLFlags.GeneratedPasswordIncluded,
            })
        ).toEqual(['1234567890ab', 'abc']);
    });
});
