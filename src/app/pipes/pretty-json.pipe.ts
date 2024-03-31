import { Pipe, PipeTransform } from '@angular/core'; 
  
@Pipe({ 
    name: 'prettyJson',
    standalone:true
}) 
  
export class PrettyJson implements PipeTransform { 
  
    transform(val: any) { 
        return JSON.stringify(val, undefined, 4) 
            .replace(/ /g, ' ') 
            .replace(/\n/g, '<br/>'); 
    } 
}