import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(items: any[], value: string, prop: string): any[] {
  //   if (!items) return [];
  //   if (!value) return items;
  //   return items.filter(singleItem =>
  //     singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
  //   );
  // }

  transform(list: any[], value: [], key: []): any {
    // value.forEach((name, index) => {
    //   if (name) {
    //     list = list.filter((item) => {
    //       return (item[key[index]]
    //         .toString()
    //         .toLowerCase()
    //         .indexOf(name.toString().toLowerCase()) !== -1)
    //     });
    //   }
    // });
    // return list;
  }
}
