export type Constructor<T> = new (...args: any[]) => T;


function mix( baseClass: Constructor<any>, mixinClasses: Constructor<any>[], deepMix?:boolean) {
  if( deepMix == undefined ) deepMix = false;
 
  // We don't want to override the constructor
  // We also don't want to override methods or properties that are explicitly defined in the derived constructor.
  const baseMethodNames: string[] = Object.getOwnPropertyNames( baseClass.prototype )

  mixinClasses.forEach( mixinClass => {
      
    // By default mixins shouldn't have a constructor but since a TypeScript mixin is just a class
    // a default constructor is created for you. So we remove that.
    const mixinMethodNames = Object.getOwnPropertyNames( mixinClass.prototype );
    const mixinPropertyMinusConstructor = mixinMethodNames.slice( 1, mixinMethodNames.length );

    const keys = Object.keys( mixinClass.prototype );

    const mixinClassObject = Object.create( baseClass.prototype );


    mixinPropertyMinusConstructor.forEach( baseName => {
      if( baseMethodNames.indexOf( baseName ) > - 1 ) return
      baseClass.prototype[ baseName ] = mixinClass.prototype[ baseName ];
    })

  });
}

// Decorators
export default function use(...options:Constructor<{}>[] ) {
  return function ( target:any, propertyKey:string ) {
    mix( target.constructor, options );
  }
}