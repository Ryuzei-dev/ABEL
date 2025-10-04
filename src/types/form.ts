export type FormFieldBase = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
};

export type TextField = FormFieldBase & {
  type: "text" | "textarea";
};

export type SelectField = FormFieldBase & {
  type: "select";
  options: { label: string; value: string }[];
};

export type HiddenField = FormFieldBase & {
  type: "hidden";
  defaultValue?: string;
};

export type FormField = TextField | SelectField | HiddenField;

export type FormValues = Record<string, string>;
