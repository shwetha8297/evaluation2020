import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "myfilter",
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return list
      ? list.filter(
          item => item.siteName.search(new RegExp(filterText, "i")) > -1
        )
      : [];
  }
}
