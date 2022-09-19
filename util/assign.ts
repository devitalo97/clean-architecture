import { transform } from "./transform"


export function assign(dataThis:any, props:any){
    return Object.assign(dataThis, transform(props, 'entity'))
}