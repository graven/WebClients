import type { VFC } from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { c } from 'ttag';
import uniqid from 'uniqid';

import { getEpoch } from '@proton/pass/utils/time';

import type { ItemNewProps } from '../../../../shared/items';
import { Field } from '../../../components/Field/Field';
import { BaseTextAreaField } from '../../../components/Field/TextareaField';
import { BaseTitleField } from '../../../components/Field/TitleField';
import { VaultSelectField } from '../../../components/Field/VaultSelectField';
import { ItemCreatePanel } from '../../../components/Panel/ItemCreatePanel';
import { MAX_ITEM_NAME_LENGTH, MAX_ITEM_NOTE_LENGTH } from '../Item/Item.validation';
import type { NoteFormValues } from './Note.validation';
import { validateNoteForm } from './Note.validation';

const FORM_ID = 'new-note';

export const NoteNew: VFC<ItemNewProps<'note'>> = ({ shareId, onSubmit, onCancel }) => {
    const initialValues: NoteFormValues = { name: '', note: '', shareId };

    const form = useFormik<NoteFormValues>({
        initialValues,
        initialErrors: validateNoteForm(initialValues),
        onSubmit: ({ shareId, name, note }) => {
            const optimisticId = uniqid();

            onSubmit({
                type: 'note',
                optimisticId,
                shareId: shareId,
                createTime: getEpoch(),
                metadata: { name, note, itemUuid: optimisticId },
                content: {},
                extraFields: [],
            });
        },
        validate: validateNoteForm,
        validateOnChange: true,
    });

    return (
        <ItemCreatePanel
            type="note"
            formId={FORM_ID}
            valid={form.isValid}
            discardable={!form.dirty}
            handleCancelClick={onCancel}
        >
            {({ canFocus }) => (
                <FormikProvider value={form}>
                    <Form id={FORM_ID}>
                        <Field component={VaultSelectField} label={c('Label').t`Vault`} name="shareId" />
                        <Field
                            dense
                            name="name"
                            className="mb-4"
                            component={BaseTitleField}
                            label={c('Label').t`Name`}
                            labelContainerClassName="sr-only"
                            placeholder={c('Placeholder').t`Untitled`}
                            autoFocus={canFocus}
                            key={`note-name-${canFocus}`}
                            maxLength={MAX_ITEM_NAME_LENGTH}
                        />
                        <Field
                            component={BaseTextAreaField}
                            label={c('Label').t`Note`}
                            name="note"
                            placeholder={c('Placeholder').t`Write your note`}
                            maxLength={MAX_ITEM_NOTE_LENGTH}
                            minRows={5}
                            rows={Number.MAX_SAFE_INTEGER}
                        />
                    </Form>
                </FormikProvider>
            )}
        </ItemCreatePanel>
    );
};
