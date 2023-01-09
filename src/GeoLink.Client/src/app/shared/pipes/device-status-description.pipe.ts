import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumToDescriptionPipe' })
export class EnumToDescriptionPipePipe implements PipeTransform {
  transform(value: number, enumType: any): any {
    return Object.values(enumType)[value];
  }
}
