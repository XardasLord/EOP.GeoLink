import { TemplateRef } from '@angular/core';
import { FormControlOptions } from '@angular/forms';

export interface SimpleFormModel {
  [key: number | string]: string | number | File | boolean | null;
}

interface BaseInput {
  label: string;
  controlName?: string;
  options?: FormControlOptions | null | undefined;
  class?: string;
}

interface DialogInput extends BaseInput {
  type: 'text' | 'number' | 'textarea';
  initValue?: string | number | null;
}

interface BooleanInput extends BaseInput {
  type: 'boolean';
  initValue: boolean;
}

export interface AttributeDialogInput extends BaseInput {
  type: 'text' | 'number' | 'textarea';
  initValue?: string | number | null;
  idAtrF: number;
  atrFType: number;
}

export interface SimpleInputDialogDataModel {
  title: string;
  description?: string;
  submitLabel?: string;
  cancelLabel?: string;
  validateInstantly?: boolean;
  inputs: (DialogInput | BooleanInput | AttributeDialogInput)[];
  template?: {
    ref: TemplateRef<HTMLElement>;
    data?: unknown;
  };
  submitAction: (formValue: Partial<SimpleFormModel>) => void;
  cancelAction?: () => void;
}

export enum SimpleInputDialogAction {
  PRIMARY,
  SECONDARY,
  CANCEL,
}
