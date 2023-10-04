import { TemplateRef } from '@angular/core';

export interface SimpleConfirmDialogDataModel {
  title: string;
  description?: string;
  primaryBtnLabel?: string;
  primaryBtnDisabled: boolean;
  secondaryBtnLabel?: string;
  template?: {
    ref: TemplateRef<HTMLElement>;
    data?: unknown;
  };

  primaryAction: () => void;
  secondaryAction?: () => void;
}

export enum SimpleConfirmDialogAction {
  PRIMARY,
  SECONDARY,
  CANCEL,
}
