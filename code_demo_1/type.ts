// type Animal = {
//     name: string;
// }

// type Bear = Animal & {
//     honey: boolean;
// }
// function getBear() {
//     const bear: Bear = {
//         name: 'bear',
//         honey: true
//     };
//     return bear;
// }
// const Bear = getBear()
// console.log(Bear.name)
// console.log(Bear.honey)

// interface IAnimal {
//     name: string;
// }

// interface IBear extends IAnimal {
//     honey: boolean;
// }

// const IBear = getBear()
// console.log(IBear)

// interface Window {
//     title: string
//   }

//   interface Window {
//     ts: TypeScriptAPI
//   }
//   const src = 'const a = "Hello World"';
//   window.ts.transpileModule(src, {});

//   interface IPerson {
//     name: string;
//     age: number;
//     death: boolean;
//   }
//   const haha: Pick<IPerson, 'name'> = {name: number}
//   console.log(haha)

function GenericType <T>(arg: T): T {
    console.log(arg)
    return arg
}

GenericType(123)

function GenericArray<T>(arg: T[]): T[]{
    console.log(arg)
    return arg
}