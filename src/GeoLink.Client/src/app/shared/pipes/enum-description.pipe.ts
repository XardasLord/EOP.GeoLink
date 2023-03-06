import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'EnumDescriptionPipe' })
export class EnumDescriptionPipePipe implements PipeTransform {
  transform(value: number, enumType: any): any {
    return Object.values(enumType)[value];
  }
}
