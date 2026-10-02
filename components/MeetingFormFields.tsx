'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import type {
  MeetingFormField,
  MeetingFormValues,
  SpeakerFormValues,
  State,
} from '@/lib/meeting-form';
import { meetingTypeLabels } from '@/lib/ward';

const inputClass =
  'border-line bg-surface focus:border-accent aria-invalid:border-danger w-full rounded-md border px-3 py-2';

interface MeetingFormFieldsProps {
  state: State;
  defaults: MeetingFormValues;
}

function errorId(name: MeetingFormField) {
  return `${name}-error`;
}

function FieldErrors({ name, errors }: { name: MeetingFormField; errors?: string[] }) {
  return (
    <div id={errorId(name)} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="text-danger mt-1 text-base">
          {error}
        </p>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-line grid gap-4 border-t pt-5 first:border-t-0 first:pt-0">
      <legend className="heading float-left mb-1 w-full font-serif">{title}</legend>
      {children}
    </fieldset>
  );
}

interface FieldProps {
  name: MeetingFormField;
  label: string;
  state: State;
  hint?: string;
  children: (props: {
    id: MeetingFormField;
    name: MeetingFormField;
    'aria-describedby': string;
    'aria-invalid': boolean;
    className: string;
  }) => ReactNode;
}

function Field({ name, label, state, hint, children }: FieldProps) {
  const errors = state.errors[name];
  const hintId = `${name}-hint`;

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-base font-semibold">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-muted mb-1 text-base">
          {hint}
        </p>
      )}
      {children({
        id: name,
        name,
        'aria-describedby': hint ? `${hintId} ${errorId(name)}` : errorId(name),
        'aria-invalid': Boolean(errors?.length),
        className: inputClass,
      })}
      <FieldErrors name={name} errors={errors} />
    </div>
  );
}

function HymnFields({
  prefix,
  label,
  state,
  values,
}: {
  prefix: 'openingHymn' | 'sacramentHymn' | 'closingHymn';
  label: string;
  state: State;
  values: MeetingFormValues;
}) {
  const numberName = `${prefix}Number` as const;
  const titleName = `${prefix}Title` as const;

  return (
    <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
      <Field name={numberName} label={`${label} number`} state={state}>
        {(props) => (
          <input
            {...props}
            type="number"
            inputMode="numeric"
            min={1}
            required
            defaultValue={values[numberName]}
          />
        )}
      </Field>
      <Field name={titleName} label={`${label} title`} state={state}>
        {(props) => <input {...props} type="text" required defaultValue={values[titleName]} />}
      </Field>
    </div>
  );
}

interface SpeakerRow extends SpeakerFormValues {
  key: number;
}

function SpeakersFields({ state, initial }: { state: State; initial: SpeakerFormValues[] }) {
  const [source, setSource] = useState(initial);
  const [nextKey, setNextKey] = useState(initial.length);
  const [rows, setRows] = useState<SpeakerRow[]>(() =>
    initial.map((speaker, i) => ({ ...speaker, key: i }))
  );

  if (initial !== source) {
    setSource(initial);
    setRows(initial.map((speaker, i) => ({ ...speaker, key: nextKey + i })));
    setNextKey(nextKey + initial.length);
  }

  function addRow() {
    setRows([...rows, { key: nextKey, name: '', topic: '', type: 'speaker' }]);
    setNextKey(nextKey + 1);
  }

  const errors = state.errors.speakers;

  return (
    <div className="grid gap-4">
      {rows.length === 0 && (
        <p className="text-muted text-base">
          No speakers yet. Leave this empty for a testimony meeting.
        </p>
      )}
      <ol className="grid gap-4">
        {rows.map((row, i) => {
          const base = `speaker-${row.key}`;
          const position = i + 1;
          return (
            <li
              key={row.key}
              className="border-line bg-surface-muted grid gap-3 rounded-md border p-4 sm:grid-cols-[1fr_1fr_11rem_auto] sm:items-end"
            >
              <div>
                <label htmlFor={`${base}-name`} className="mb-1 block text-base font-semibold">
                  Name {position}
                </label>
                <input
                  id={`${base}-name`}
                  name="speakerName"
                  type="text"
                  required
                  defaultValue={row.name}
                  aria-describedby={errorId('speakers')}
                  aria-invalid={Boolean(errors?.length) && !row.name.trim()}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${base}-topic`} className="mb-1 block text-base font-semibold">
                  Topic or song {position}
                </label>
                <input
                  id={`${base}-topic`}
                  name="speakerTopic"
                  type="text"
                  defaultValue={row.topic}
                  aria-describedby={errorId('speakers')}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${base}-type`} className="mb-1 block text-base font-semibold">
                  Type {position}
                </label>
                <select
                  id={`${base}-type`}
                  name="speakerType"
                  defaultValue={row.type}
                  aria-describedby={errorId('speakers')}
                  className={inputClass}
                >
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical number</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setRows(rows.filter((r) => r.key !== row.key))}
                aria-label={`Remove program item ${position}`}
                className="border-line text-muted hover:border-accent hover:text-foreground rounded-md border px-3 py-2 text-base"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ol>
      <FieldErrors name="speakers" errors={errors} />
      <div>
        <button
          type="button"
          onClick={addRow}
          className="border-line hover:border-accent rounded-full border px-4 py-1.5 text-base"
        >
          Add speaker or musical number
        </button>
      </div>
    </div>
  );
}

export default function MeetingFormFields({ state, defaults }: MeetingFormFieldsProps) {
  const values = state.values ?? defaults;

  return (
    <div className="grid gap-8">
      <Section title="Meeting">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="date" label="Date" state={state}>
            {(props) => <input {...props} type="date" required defaultValue={values.date} />}
          </Field>
          <Field name="meetingType" label="Meeting type" state={state}>
            {(props) => (
              <select {...props} required defaultValue={values.meetingType}>
                {Object.entries(meetingTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      </Section>

      <Section title="Leadership">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="presiding" label="Presiding" state={state}>
            {(props) => <input {...props} type="text" required defaultValue={values.presiding} />}
          </Field>
          <Field name="conducting" label="Conducting" state={state}>
            {(props) => <input {...props} type="text" required defaultValue={values.conducting} />}
          </Field>
        </div>
      </Section>

      <Section title="Announcements">
        <Field name="announcements" label="Announcements" hint="One per line." state={state}>
          {(props) => <textarea {...props} rows={3} defaultValue={values.announcements} />}
        </Field>
      </Section>

      <Section title="Opening">
        <HymnFields prefix="openingHymn" label="Opening hymn" state={state} values={values} />
        <Field name="openingPrayer" label="Invocation" state={state}>
          {(props) => <input {...props} type="text" required defaultValue={values.openingPrayer} />}
        </Field>
      </Section>

      <Section title="Business">
        <Field name="wardBusiness" label="Ward business" hint="One item per line." state={state}>
          {(props) => <textarea {...props} rows={3} defaultValue={values.wardBusiness} />}
        </Field>
        <div>
          <div className="flex items-center gap-2">
            <input
              id="stakeBusiness"
              name="stakeBusiness"
              type="checkbox"
              defaultChecked={values.stakeBusiness}
              aria-describedby={errorId('stakeBusiness')}
              className="accent-primary size-4"
            />
            <label htmlFor="stakeBusiness" className="text-base font-semibold">
              Stake business
            </label>
          </div>
          <FieldErrors name="stakeBusiness" errors={state.errors.stakeBusiness} />
        </div>
      </Section>

      <Section title="Sacrament">
        <HymnFields prefix="sacramentHymn" label="Sacrament hymn" state={state} values={values} />
      </Section>

      <Section title="Speakers & Music">
        <SpeakersFields state={state} initial={values.speakers} />
      </Section>

      <Section title="Closing">
        <HymnFields prefix="closingHymn" label="Closing hymn" state={state} values={values} />
        <Field name="closingPrayer" label="Benediction" state={state}>
          {(props) => <input {...props} type="text" required defaultValue={values.closingPrayer} />}
        </Field>
      </Section>
    </div>
  );
}

export function MeetingFormFooter({
  state,
  isPending,
  submitLabel,
}: {
  state: State;
  isPending: boolean;
  submitLabel: string;
}) {
  return (
    <div className="border-line mt-8 grid gap-4 border-t pt-6">
      <div id="form-message" aria-live="polite" aria-atomic="true">
        {state.message && <p className="text-danger text-base">{state.message}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="bg-primary text-primary-contrast rounded-full px-6 py-2 font-semibold disabled:opacity-60"
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>
        <Link href="/meetings" className="text-muted hover:text-foreground text-base">
          Cancel
        </Link>
      </div>
    </div>
  );
}
