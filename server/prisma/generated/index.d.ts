
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Rooms
 * 
 */
export type Rooms = $Result.DefaultSelection<Prisma.$RoomsPayload>
/**
 * Model Participants
 * 
 */
export type Participants = $Result.DefaultSelection<Prisma.$ParticipantsPayload>
/**
 * Model Invitations
 * 
 */
export type Invitations = $Result.DefaultSelection<Prisma.$InvitationsPayload>
/**
 * Model Restaurants
 * 
 */
export type Restaurants = $Result.DefaultSelection<Prisma.$RestaurantsPayload>
/**
 * Model Votes
 * 
 */
export type Votes = $Result.DefaultSelection<Prisma.$VotesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ROOM_STATUS: {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
};

export type ROOM_STATUS = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS]


export const PARTICIPANT_ROLE: {
  HOST: 'HOST',
  GUEST: 'GUEST'
};

export type PARTICIPANT_ROLE = (typeof PARTICIPANT_ROLE)[keyof typeof PARTICIPANT_ROLE]

}

export type ROOM_STATUS = $Enums.ROOM_STATUS

export const ROOM_STATUS: typeof $Enums.ROOM_STATUS

export type PARTICIPANT_ROLE = $Enums.PARTICIPANT_ROLE

export const PARTICIPANT_ROLE: typeof $Enums.PARTICIPANT_ROLE

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Rooms
 * const rooms = await prisma.rooms.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Rooms
   * const rooms = await prisma.rooms.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.rooms`: Exposes CRUD operations for the **Rooms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.rooms.findMany()
    * ```
    */
  get rooms(): Prisma.RoomsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participants`: Exposes CRUD operations for the **Participants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participants
    * const participants = await prisma.participants.findMany()
    * ```
    */
  get participants(): Prisma.ParticipantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitations`: Exposes CRUD operations for the **Invitations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitations.findMany()
    * ```
    */
  get invitations(): Prisma.InvitationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.restaurants`: Exposes CRUD operations for the **Restaurants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurants
    * const restaurants = await prisma.restaurants.findMany()
    * ```
    */
  get restaurants(): Prisma.RestaurantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.votes`: Exposes CRUD operations for the **Votes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.votes.findMany()
    * ```
    */
  get votes(): Prisma.VotesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Rooms: 'Rooms',
    Participants: 'Participants',
    Invitations: 'Invitations',
    Restaurants: 'Restaurants',
    Votes: 'Votes'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "rooms" | "participants" | "invitations" | "restaurants" | "votes"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Rooms: {
        payload: Prisma.$RoomsPayload<ExtArgs>
        fields: Prisma.RoomsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>
          }
          findFirst: {
            args: Prisma.RoomsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>
          }
          findMany: {
            args: Prisma.RoomsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>[]
          }
          create: {
            args: Prisma.RoomsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>
          }
          createMany: {
            args: Prisma.RoomsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>[]
          }
          delete: {
            args: Prisma.RoomsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>
          }
          update: {
            args: Prisma.RoomsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>
          }
          deleteMany: {
            args: Prisma.RoomsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>[]
          }
          upsert: {
            args: Prisma.RoomsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomsPayload>
          }
          aggregate: {
            args: Prisma.RoomsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRooms>
          }
          groupBy: {
            args: Prisma.RoomsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomsCountArgs<ExtArgs>
            result: $Utils.Optional<RoomsCountAggregateOutputType> | number
          }
        }
      }
      Participants: {
        payload: Prisma.$ParticipantsPayload<ExtArgs>
        fields: Prisma.ParticipantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParticipantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParticipantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>
          }
          findFirst: {
            args: Prisma.ParticipantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParticipantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>
          }
          findMany: {
            args: Prisma.ParticipantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>[]
          }
          create: {
            args: Prisma.ParticipantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>
          }
          createMany: {
            args: Prisma.ParticipantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParticipantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>[]
          }
          delete: {
            args: Prisma.ParticipantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>
          }
          update: {
            args: Prisma.ParticipantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>
          }
          deleteMany: {
            args: Prisma.ParticipantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParticipantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParticipantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>[]
          }
          upsert: {
            args: Prisma.ParticipantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantsPayload>
          }
          aggregate: {
            args: Prisma.ParticipantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipants>
          }
          groupBy: {
            args: Prisma.ParticipantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParticipantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParticipantsCountArgs<ExtArgs>
            result: $Utils.Optional<ParticipantsCountAggregateOutputType> | number
          }
        }
      }
      Invitations: {
        payload: Prisma.$InvitationsPayload<ExtArgs>
        fields: Prisma.InvitationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>
          }
          findFirst: {
            args: Prisma.InvitationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>
          }
          findMany: {
            args: Prisma.InvitationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>[]
          }
          create: {
            args: Prisma.InvitationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>
          }
          createMany: {
            args: Prisma.InvitationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>[]
          }
          delete: {
            args: Prisma.InvitationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>
          }
          update: {
            args: Prisma.InvitationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>
          }
          deleteMany: {
            args: Prisma.InvitationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvitationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>[]
          }
          upsert: {
            args: Prisma.InvitationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationsPayload>
          }
          aggregate: {
            args: Prisma.InvitationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitations>
          }
          groupBy: {
            args: Prisma.InvitationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationsCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationsCountAggregateOutputType> | number
          }
        }
      }
      Restaurants: {
        payload: Prisma.$RestaurantsPayload<ExtArgs>
        fields: Prisma.RestaurantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestaurantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestaurantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          findFirst: {
            args: Prisma.RestaurantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestaurantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          findMany: {
            args: Prisma.RestaurantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>[]
          }
          create: {
            args: Prisma.RestaurantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          createMany: {
            args: Prisma.RestaurantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestaurantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>[]
          }
          delete: {
            args: Prisma.RestaurantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          update: {
            args: Prisma.RestaurantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          deleteMany: {
            args: Prisma.RestaurantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestaurantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RestaurantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>[]
          }
          upsert: {
            args: Prisma.RestaurantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantsPayload>
          }
          aggregate: {
            args: Prisma.RestaurantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestaurants>
          }
          groupBy: {
            args: Prisma.RestaurantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestaurantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestaurantsCountArgs<ExtArgs>
            result: $Utils.Optional<RestaurantsCountAggregateOutputType> | number
          }
        }
      }
      Votes: {
        payload: Prisma.$VotesPayload<ExtArgs>
        fields: Prisma.VotesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VotesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VotesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          findFirst: {
            args: Prisma.VotesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VotesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          findMany: {
            args: Prisma.VotesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>[]
          }
          create: {
            args: Prisma.VotesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          createMany: {
            args: Prisma.VotesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VotesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>[]
          }
          delete: {
            args: Prisma.VotesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          update: {
            args: Prisma.VotesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          deleteMany: {
            args: Prisma.VotesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VotesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VotesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>[]
          }
          upsert: {
            args: Prisma.VotesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          aggregate: {
            args: Prisma.VotesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVotes>
          }
          groupBy: {
            args: Prisma.VotesGroupByArgs<ExtArgs>
            result: $Utils.Optional<VotesGroupByOutputType>[]
          }
          count: {
            args: Prisma.VotesCountArgs<ExtArgs>
            result: $Utils.Optional<VotesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    rooms?: RoomsOmit
    participants?: ParticipantsOmit
    invitations?: InvitationsOmit
    restaurants?: RestaurantsOmit
    votes?: VotesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RoomsCountOutputType
   */

  export type RoomsCountOutputType = {
    participants: number
    invitations: number
    votes: number
  }

  export type RoomsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | RoomsCountOutputTypeCountParticipantsArgs
    invitations?: boolean | RoomsCountOutputTypeCountInvitationsArgs
    votes?: boolean | RoomsCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomsCountOutputType
     */
    select?: RoomsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantsWhereInput
  }

  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationsWhereInput
  }

  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VotesWhereInput
  }


  /**
   * Count Type ParticipantsCountOutputType
   */

  export type ParticipantsCountOutputType = {
    votes: number
  }

  export type ParticipantsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | ParticipantsCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * ParticipantsCountOutputType without action
   */
  export type ParticipantsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsCountOutputType
     */
    select?: ParticipantsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParticipantsCountOutputType without action
   */
  export type ParticipantsCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VotesWhereInput
  }


  /**
   * Count Type RestaurantsCountOutputType
   */

  export type RestaurantsCountOutputType = {
    votes: number
    winner_rooms: number
  }

  export type RestaurantsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | RestaurantsCountOutputTypeCountVotesArgs
    winner_rooms?: boolean | RestaurantsCountOutputTypeCountWinner_roomsArgs
  }

  // Custom InputTypes
  /**
   * RestaurantsCountOutputType without action
   */
  export type RestaurantsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantsCountOutputType
     */
    select?: RestaurantsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RestaurantsCountOutputType without action
   */
  export type RestaurantsCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VotesWhereInput
  }

  /**
   * RestaurantsCountOutputType without action
   */
  export type RestaurantsCountOutputTypeCountWinner_roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Rooms
   */

  export type AggregateRooms = {
    _count: RoomsCountAggregateOutputType | null
    _min: RoomsMinAggregateOutputType | null
    _max: RoomsMaxAggregateOutputType | null
  }

  export type RoomsMinAggregateOutputType = {
    id: string | null
    room_name: string | null
    start_at: Date | null
    end_at: Date | null
    status: $Enums.ROOM_STATUS | null
    owner_id: string | null
    owner_token: string | null
    winner_restaurant_id: string | null
    created_at: Date | null
  }

  export type RoomsMaxAggregateOutputType = {
    id: string | null
    room_name: string | null
    start_at: Date | null
    end_at: Date | null
    status: $Enums.ROOM_STATUS | null
    owner_id: string | null
    owner_token: string | null
    winner_restaurant_id: string | null
    created_at: Date | null
  }

  export type RoomsCountAggregateOutputType = {
    id: number
    room_name: number
    start_at: number
    end_at: number
    status: number
    owner_id: number
    owner_token: number
    winner_restaurant_id: number
    created_at: number
    _all: number
  }


  export type RoomsMinAggregateInputType = {
    id?: true
    room_name?: true
    start_at?: true
    end_at?: true
    status?: true
    owner_id?: true
    owner_token?: true
    winner_restaurant_id?: true
    created_at?: true
  }

  export type RoomsMaxAggregateInputType = {
    id?: true
    room_name?: true
    start_at?: true
    end_at?: true
    status?: true
    owner_id?: true
    owner_token?: true
    winner_restaurant_id?: true
    created_at?: true
  }

  export type RoomsCountAggregateInputType = {
    id?: true
    room_name?: true
    start_at?: true
    end_at?: true
    status?: true
    owner_id?: true
    owner_token?: true
    winner_restaurant_id?: true
    created_at?: true
    _all?: true
  }

  export type RoomsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to aggregate.
     */
    where?: RoomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomsOrderByWithRelationInput | RoomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomsMaxAggregateInputType
  }

  export type GetRoomsAggregateType<T extends RoomsAggregateArgs> = {
        [P in keyof T & keyof AggregateRooms]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRooms[P]>
      : GetScalarType<T[P], AggregateRooms[P]>
  }




  export type RoomsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomsWhereInput
    orderBy?: RoomsOrderByWithAggregationInput | RoomsOrderByWithAggregationInput[]
    by: RoomsScalarFieldEnum[] | RoomsScalarFieldEnum
    having?: RoomsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomsCountAggregateInputType | true
    _min?: RoomsMinAggregateInputType
    _max?: RoomsMaxAggregateInputType
  }

  export type RoomsGroupByOutputType = {
    id: string
    room_name: string
    start_at: Date
    end_at: Date
    status: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    winner_restaurant_id: string | null
    created_at: Date
    _count: RoomsCountAggregateOutputType | null
    _min: RoomsMinAggregateOutputType | null
    _max: RoomsMaxAggregateOutputType | null
  }

  type GetRoomsGroupByPayload<T extends RoomsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomsGroupByOutputType[P]>
            : GetScalarType<T[P], RoomsGroupByOutputType[P]>
        }
      >
    >


  export type RoomsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_name?: boolean
    start_at?: boolean
    end_at?: boolean
    status?: boolean
    owner_id?: boolean
    owner_token?: boolean
    winner_restaurant_id?: boolean
    created_at?: boolean
    participants?: boolean | Rooms$participantsArgs<ExtArgs>
    invitations?: boolean | Rooms$invitationsArgs<ExtArgs>
    votes?: boolean | Rooms$votesArgs<ExtArgs>
    winner?: boolean | Rooms$winnerArgs<ExtArgs>
    _count?: boolean | RoomsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rooms"]>

  export type RoomsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_name?: boolean
    start_at?: boolean
    end_at?: boolean
    status?: boolean
    owner_id?: boolean
    owner_token?: boolean
    winner_restaurant_id?: boolean
    created_at?: boolean
    winner?: boolean | Rooms$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["rooms"]>

  export type RoomsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_name?: boolean
    start_at?: boolean
    end_at?: boolean
    status?: boolean
    owner_id?: boolean
    owner_token?: boolean
    winner_restaurant_id?: boolean
    created_at?: boolean
    winner?: boolean | Rooms$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["rooms"]>

  export type RoomsSelectScalar = {
    id?: boolean
    room_name?: boolean
    start_at?: boolean
    end_at?: boolean
    status?: boolean
    owner_id?: boolean
    owner_token?: boolean
    winner_restaurant_id?: boolean
    created_at?: boolean
  }

  export type RoomsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_name" | "start_at" | "end_at" | "status" | "owner_id" | "owner_token" | "winner_restaurant_id" | "created_at", ExtArgs["result"]["rooms"]>
  export type RoomsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | Rooms$participantsArgs<ExtArgs>
    invitations?: boolean | Rooms$invitationsArgs<ExtArgs>
    votes?: boolean | Rooms$votesArgs<ExtArgs>
    winner?: boolean | Rooms$winnerArgs<ExtArgs>
    _count?: boolean | RoomsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winner?: boolean | Rooms$winnerArgs<ExtArgs>
  }
  export type RoomsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winner?: boolean | Rooms$winnerArgs<ExtArgs>
  }

  export type $RoomsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rooms"
    objects: {
      participants: Prisma.$ParticipantsPayload<ExtArgs>[]
      invitations: Prisma.$InvitationsPayload<ExtArgs>[]
      votes: Prisma.$VotesPayload<ExtArgs>[]
      winner: Prisma.$RestaurantsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_name: string
      start_at: Date
      end_at: Date
      status: $Enums.ROOM_STATUS
      owner_id: string
      owner_token: string
      winner_restaurant_id: string | null
      created_at: Date
    }, ExtArgs["result"]["rooms"]>
    composites: {}
  }

  type RoomsGetPayload<S extends boolean | null | undefined | RoomsDefaultArgs> = $Result.GetResult<Prisma.$RoomsPayload, S>

  type RoomsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomsCountAggregateInputType | true
    }

  export interface RoomsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rooms'], meta: { name: 'Rooms' } }
    /**
     * Find zero or one Rooms that matches the filter.
     * @param {RoomsFindUniqueArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomsFindUniqueArgs>(args: SelectSubset<T, RoomsFindUniqueArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rooms that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomsFindUniqueOrThrowArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomsFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsFindFirstArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomsFindFirstArgs>(args?: SelectSubset<T, RoomsFindFirstArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rooms that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsFindFirstOrThrowArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomsFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.rooms.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.rooms.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomsWithIdOnly = await prisma.rooms.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomsFindManyArgs>(args?: SelectSubset<T, RoomsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rooms.
     * @param {RoomsCreateArgs} args - Arguments to create a Rooms.
     * @example
     * // Create one Rooms
     * const Rooms = await prisma.rooms.create({
     *   data: {
     *     // ... data to create a Rooms
     *   }
     * })
     * 
     */
    create<T extends RoomsCreateArgs>(args: SelectSubset<T, RoomsCreateArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomsCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const rooms = await prisma.rooms.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomsCreateManyArgs>(args?: SelectSubset<T, RoomsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomsCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const rooms = await prisma.rooms.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomsWithIdOnly = await prisma.rooms.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomsCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rooms.
     * @param {RoomsDeleteArgs} args - Arguments to delete one Rooms.
     * @example
     * // Delete one Rooms
     * const Rooms = await prisma.rooms.delete({
     *   where: {
     *     // ... filter to delete one Rooms
     *   }
     * })
     * 
     */
    delete<T extends RoomsDeleteArgs>(args: SelectSubset<T, RoomsDeleteArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rooms.
     * @param {RoomsUpdateArgs} args - Arguments to update one Rooms.
     * @example
     * // Update one Rooms
     * const rooms = await prisma.rooms.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomsUpdateArgs>(args: SelectSubset<T, RoomsUpdateArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomsDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.rooms.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomsDeleteManyArgs>(args?: SelectSubset<T, RoomsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const rooms = await prisma.rooms.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomsUpdateManyArgs>(args: SelectSubset<T, RoomsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomsUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const rooms = await prisma.rooms.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomsWithIdOnly = await prisma.rooms.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomsUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rooms.
     * @param {RoomsUpsertArgs} args - Arguments to update or create a Rooms.
     * @example
     * // Update or create a Rooms
     * const rooms = await prisma.rooms.upsert({
     *   create: {
     *     // ... data to create a Rooms
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rooms we want to update
     *   }
     * })
     */
    upsert<T extends RoomsUpsertArgs>(args: SelectSubset<T, RoomsUpsertArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.rooms.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomsCountArgs>(
      args?: Subset<T, RoomsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomsAggregateArgs>(args: Subset<T, RoomsAggregateArgs>): Prisma.PrismaPromise<GetRoomsAggregateType<T>>

    /**
     * Group by Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomsGroupByArgs['orderBy'] }
        : { orderBy?: RoomsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rooms model
   */
  readonly fields: RoomsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rooms.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participants<T extends Rooms$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Rooms$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Rooms$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Rooms$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes<T extends Rooms$votesArgs<ExtArgs> = {}>(args?: Subset<T, Rooms$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    winner<T extends Rooms$winnerArgs<ExtArgs> = {}>(args?: Subset<T, Rooms$winnerArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rooms model
   */
  interface RoomsFieldRefs {
    readonly id: FieldRef<"Rooms", 'String'>
    readonly room_name: FieldRef<"Rooms", 'String'>
    readonly start_at: FieldRef<"Rooms", 'DateTime'>
    readonly end_at: FieldRef<"Rooms", 'DateTime'>
    readonly status: FieldRef<"Rooms", 'ROOM_STATUS'>
    readonly owner_id: FieldRef<"Rooms", 'String'>
    readonly owner_token: FieldRef<"Rooms", 'String'>
    readonly winner_restaurant_id: FieldRef<"Rooms", 'String'>
    readonly created_at: FieldRef<"Rooms", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rooms findUnique
   */
  export type RoomsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where: RoomsWhereUniqueInput
  }

  /**
   * Rooms findUniqueOrThrow
   */
  export type RoomsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where: RoomsWhereUniqueInput
  }

  /**
   * Rooms findFirst
   */
  export type RoomsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomsOrderByWithRelationInput | RoomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * Rooms findFirstOrThrow
   */
  export type RoomsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomsOrderByWithRelationInput | RoomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * Rooms findMany
   */
  export type RoomsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomsOrderByWithRelationInput | RoomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * Rooms create
   */
  export type RoomsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * The data needed to create a Rooms.
     */
    data: XOR<RoomsCreateInput, RoomsUncheckedCreateInput>
  }

  /**
   * Rooms createMany
   */
  export type RoomsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomsCreateManyInput | RoomsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rooms createManyAndReturn
   */
  export type RoomsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomsCreateManyInput | RoomsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rooms update
   */
  export type RoomsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * The data needed to update a Rooms.
     */
    data: XOR<RoomsUpdateInput, RoomsUncheckedUpdateInput>
    /**
     * Choose, which Rooms to update.
     */
    where: RoomsWhereUniqueInput
  }

  /**
   * Rooms updateMany
   */
  export type RoomsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomsUpdateManyMutationInput, RoomsUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomsWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Rooms updateManyAndReturn
   */
  export type RoomsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomsUpdateManyMutationInput, RoomsUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomsWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rooms upsert
   */
  export type RoomsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * The filter to search for the Rooms to update in case it exists.
     */
    where: RoomsWhereUniqueInput
    /**
     * In case the Rooms found by the `where` argument doesn't exist, create a new Rooms with this data.
     */
    create: XOR<RoomsCreateInput, RoomsUncheckedCreateInput>
    /**
     * In case the Rooms was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomsUpdateInput, RoomsUncheckedUpdateInput>
  }

  /**
   * Rooms delete
   */
  export type RoomsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    /**
     * Filter which Rooms to delete.
     */
    where: RoomsWhereUniqueInput
  }

  /**
   * Rooms deleteMany
   */
  export type RoomsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomsWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Rooms.participants
   */
  export type Rooms$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    where?: ParticipantsWhereInput
    orderBy?: ParticipantsOrderByWithRelationInput | ParticipantsOrderByWithRelationInput[]
    cursor?: ParticipantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipantsScalarFieldEnum | ParticipantsScalarFieldEnum[]
  }

  /**
   * Rooms.invitations
   */
  export type Rooms$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    where?: InvitationsWhereInput
    orderBy?: InvitationsOrderByWithRelationInput | InvitationsOrderByWithRelationInput[]
    cursor?: InvitationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationsScalarFieldEnum | InvitationsScalarFieldEnum[]
  }

  /**
   * Rooms.votes
   */
  export type Rooms$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    where?: VotesWhereInput
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    cursor?: VotesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Rooms.winner
   */
  export type Rooms$winnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    where?: RestaurantsWhereInput
  }

  /**
   * Rooms without action
   */
  export type RoomsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
  }


  /**
   * Model Participants
   */

  export type AggregateParticipants = {
    _count: ParticipantsCountAggregateOutputType | null
    _min: ParticipantsMinAggregateOutputType | null
    _max: ParticipantsMaxAggregateOutputType | null
  }

  export type ParticipantsMinAggregateOutputType = {
    id: string | null
    room_id: string | null
    email: string | null
    participant_name: string | null
    role: $Enums.PARTICIPANT_ROLE | null
    joined_at: Date | null
  }

  export type ParticipantsMaxAggregateOutputType = {
    id: string | null
    room_id: string | null
    email: string | null
    participant_name: string | null
    role: $Enums.PARTICIPANT_ROLE | null
    joined_at: Date | null
  }

  export type ParticipantsCountAggregateOutputType = {
    id: number
    room_id: number
    email: number
    participant_name: number
    role: number
    joined_at: number
    _all: number
  }


  export type ParticipantsMinAggregateInputType = {
    id?: true
    room_id?: true
    email?: true
    participant_name?: true
    role?: true
    joined_at?: true
  }

  export type ParticipantsMaxAggregateInputType = {
    id?: true
    room_id?: true
    email?: true
    participant_name?: true
    role?: true
    joined_at?: true
  }

  export type ParticipantsCountAggregateInputType = {
    id?: true
    room_id?: true
    email?: true
    participant_name?: true
    role?: true
    joined_at?: true
    _all?: true
  }

  export type ParticipantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participants to aggregate.
     */
    where?: ParticipantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantsOrderByWithRelationInput | ParticipantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParticipantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Participants
    **/
    _count?: true | ParticipantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipantsMaxAggregateInputType
  }

  export type GetParticipantsAggregateType<T extends ParticipantsAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipants[P]>
      : GetScalarType<T[P], AggregateParticipants[P]>
  }




  export type ParticipantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantsWhereInput
    orderBy?: ParticipantsOrderByWithAggregationInput | ParticipantsOrderByWithAggregationInput[]
    by: ParticipantsScalarFieldEnum[] | ParticipantsScalarFieldEnum
    having?: ParticipantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipantsCountAggregateInputType | true
    _min?: ParticipantsMinAggregateInputType
    _max?: ParticipantsMaxAggregateInputType
  }

  export type ParticipantsGroupByOutputType = {
    id: string
    room_id: string
    email: string
    participant_name: string
    role: $Enums.PARTICIPANT_ROLE
    joined_at: Date
    _count: ParticipantsCountAggregateOutputType | null
    _min: ParticipantsMinAggregateOutputType | null
    _max: ParticipantsMaxAggregateOutputType | null
  }

  type GetParticipantsGroupByPayload<T extends ParticipantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantsGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantsGroupByOutputType[P]>
        }
      >
    >


  export type ParticipantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    email?: boolean
    participant_name?: boolean
    role?: boolean
    joined_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    votes?: boolean | Participants$votesArgs<ExtArgs>
    _count?: boolean | ParticipantsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participants"]>

  export type ParticipantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    email?: boolean
    participant_name?: boolean
    role?: boolean
    joined_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participants"]>

  export type ParticipantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    email?: boolean
    participant_name?: boolean
    role?: boolean
    joined_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participants"]>

  export type ParticipantsSelectScalar = {
    id?: boolean
    room_id?: boolean
    email?: boolean
    participant_name?: boolean
    role?: boolean
    joined_at?: boolean
  }

  export type ParticipantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "email" | "participant_name" | "role" | "joined_at", ExtArgs["result"]["participants"]>
  export type ParticipantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    votes?: boolean | Participants$votesArgs<ExtArgs>
    _count?: boolean | ParticipantsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParticipantsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }
  export type ParticipantsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }

  export type $ParticipantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Participants"
    objects: {
      room: Prisma.$RoomsPayload<ExtArgs>
      votes: Prisma.$VotesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_id: string
      email: string
      participant_name: string
      role: $Enums.PARTICIPANT_ROLE
      joined_at: Date
    }, ExtArgs["result"]["participants"]>
    composites: {}
  }

  type ParticipantsGetPayload<S extends boolean | null | undefined | ParticipantsDefaultArgs> = $Result.GetResult<Prisma.$ParticipantsPayload, S>

  type ParticipantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParticipantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParticipantsCountAggregateInputType | true
    }

  export interface ParticipantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Participants'], meta: { name: 'Participants' } }
    /**
     * Find zero or one Participants that matches the filter.
     * @param {ParticipantsFindUniqueArgs} args - Arguments to find a Participants
     * @example
     * // Get one Participants
     * const participants = await prisma.participants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParticipantsFindUniqueArgs>(args: SelectSubset<T, ParticipantsFindUniqueArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Participants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParticipantsFindUniqueOrThrowArgs} args - Arguments to find a Participants
     * @example
     * // Get one Participants
     * const participants = await prisma.participants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParticipantsFindUniqueOrThrowArgs>(args: SelectSubset<T, ParticipantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsFindFirstArgs} args - Arguments to find a Participants
     * @example
     * // Get one Participants
     * const participants = await prisma.participants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParticipantsFindFirstArgs>(args?: SelectSubset<T, ParticipantsFindFirstArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsFindFirstOrThrowArgs} args - Arguments to find a Participants
     * @example
     * // Get one Participants
     * const participants = await prisma.participants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParticipantsFindFirstOrThrowArgs>(args?: SelectSubset<T, ParticipantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participants
     * const participants = await prisma.participants.findMany()
     * 
     * // Get first 10 Participants
     * const participants = await prisma.participants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const participantsWithIdOnly = await prisma.participants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParticipantsFindManyArgs>(args?: SelectSubset<T, ParticipantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Participants.
     * @param {ParticipantsCreateArgs} args - Arguments to create a Participants.
     * @example
     * // Create one Participants
     * const Participants = await prisma.participants.create({
     *   data: {
     *     // ... data to create a Participants
     *   }
     * })
     * 
     */
    create<T extends ParticipantsCreateArgs>(args: SelectSubset<T, ParticipantsCreateArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Participants.
     * @param {ParticipantsCreateManyArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participants = await prisma.participants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParticipantsCreateManyArgs>(args?: SelectSubset<T, ParticipantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Participants and returns the data saved in the database.
     * @param {ParticipantsCreateManyAndReturnArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participants = await prisma.participants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Participants and only return the `id`
     * const participantsWithIdOnly = await prisma.participants.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParticipantsCreateManyAndReturnArgs>(args?: SelectSubset<T, ParticipantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Participants.
     * @param {ParticipantsDeleteArgs} args - Arguments to delete one Participants.
     * @example
     * // Delete one Participants
     * const Participants = await prisma.participants.delete({
     *   where: {
     *     // ... filter to delete one Participants
     *   }
     * })
     * 
     */
    delete<T extends ParticipantsDeleteArgs>(args: SelectSubset<T, ParticipantsDeleteArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Participants.
     * @param {ParticipantsUpdateArgs} args - Arguments to update one Participants.
     * @example
     * // Update one Participants
     * const participants = await prisma.participants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParticipantsUpdateArgs>(args: SelectSubset<T, ParticipantsUpdateArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Participants.
     * @param {ParticipantsDeleteManyArgs} args - Arguments to filter Participants to delete.
     * @example
     * // Delete a few Participants
     * const { count } = await prisma.participants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParticipantsDeleteManyArgs>(args?: SelectSubset<T, ParticipantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participants
     * const participants = await prisma.participants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParticipantsUpdateManyArgs>(args: SelectSubset<T, ParticipantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants and returns the data updated in the database.
     * @param {ParticipantsUpdateManyAndReturnArgs} args - Arguments to update many Participants.
     * @example
     * // Update many Participants
     * const participants = await prisma.participants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Participants and only return the `id`
     * const participantsWithIdOnly = await prisma.participants.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParticipantsUpdateManyAndReturnArgs>(args: SelectSubset<T, ParticipantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Participants.
     * @param {ParticipantsUpsertArgs} args - Arguments to update or create a Participants.
     * @example
     * // Update or create a Participants
     * const participants = await prisma.participants.upsert({
     *   create: {
     *     // ... data to create a Participants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participants we want to update
     *   }
     * })
     */
    upsert<T extends ParticipantsUpsertArgs>(args: SelectSubset<T, ParticipantsUpsertArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsCountArgs} args - Arguments to filter Participants to count.
     * @example
     * // Count the number of Participants
     * const count = await prisma.participants.count({
     *   where: {
     *     // ... the filter for the Participants we want to count
     *   }
     * })
    **/
    count<T extends ParticipantsCountArgs>(
      args?: Subset<T, ParticipantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipantsAggregateArgs>(args: Subset<T, ParticipantsAggregateArgs>): Prisma.PrismaPromise<GetParticipantsAggregateType<T>>

    /**
     * Group by Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParticipantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParticipantsGroupByArgs['orderBy'] }
        : { orderBy?: ParticipantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParticipantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Participants model
   */
  readonly fields: ParticipantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Participants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParticipantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomsDefaultArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    votes<T extends Participants$votesArgs<ExtArgs> = {}>(args?: Subset<T, Participants$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Participants model
   */
  interface ParticipantsFieldRefs {
    readonly id: FieldRef<"Participants", 'String'>
    readonly room_id: FieldRef<"Participants", 'String'>
    readonly email: FieldRef<"Participants", 'String'>
    readonly participant_name: FieldRef<"Participants", 'String'>
    readonly role: FieldRef<"Participants", 'PARTICIPANT_ROLE'>
    readonly joined_at: FieldRef<"Participants", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Participants findUnique
   */
  export type ParticipantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * Filter, which Participants to fetch.
     */
    where: ParticipantsWhereUniqueInput
  }

  /**
   * Participants findUniqueOrThrow
   */
  export type ParticipantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * Filter, which Participants to fetch.
     */
    where: ParticipantsWhereUniqueInput
  }

  /**
   * Participants findFirst
   */
  export type ParticipantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * Filter, which Participants to fetch.
     */
    where?: ParticipantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantsOrderByWithRelationInput | ParticipantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participants.
     */
    cursor?: ParticipantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participants.
     */
    distinct?: ParticipantsScalarFieldEnum | ParticipantsScalarFieldEnum[]
  }

  /**
   * Participants findFirstOrThrow
   */
  export type ParticipantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * Filter, which Participants to fetch.
     */
    where?: ParticipantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantsOrderByWithRelationInput | ParticipantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participants.
     */
    cursor?: ParticipantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participants.
     */
    distinct?: ParticipantsScalarFieldEnum | ParticipantsScalarFieldEnum[]
  }

  /**
   * Participants findMany
   */
  export type ParticipantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * Filter, which Participants to fetch.
     */
    where?: ParticipantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantsOrderByWithRelationInput | ParticipantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Participants.
     */
    cursor?: ParticipantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    distinct?: ParticipantsScalarFieldEnum | ParticipantsScalarFieldEnum[]
  }

  /**
   * Participants create
   */
  export type ParticipantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * The data needed to create a Participants.
     */
    data: XOR<ParticipantsCreateInput, ParticipantsUncheckedCreateInput>
  }

  /**
   * Participants createMany
   */
  export type ParticipantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Participants.
     */
    data: ParticipantsCreateManyInput | ParticipantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Participants createManyAndReturn
   */
  export type ParticipantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * The data used to create many Participants.
     */
    data: ParticipantsCreateManyInput | ParticipantsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Participants update
   */
  export type ParticipantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * The data needed to update a Participants.
     */
    data: XOR<ParticipantsUpdateInput, ParticipantsUncheckedUpdateInput>
    /**
     * Choose, which Participants to update.
     */
    where: ParticipantsWhereUniqueInput
  }

  /**
   * Participants updateMany
   */
  export type ParticipantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Participants.
     */
    data: XOR<ParticipantsUpdateManyMutationInput, ParticipantsUncheckedUpdateManyInput>
    /**
     * Filter which Participants to update
     */
    where?: ParticipantsWhereInput
    /**
     * Limit how many Participants to update.
     */
    limit?: number
  }

  /**
   * Participants updateManyAndReturn
   */
  export type ParticipantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * The data used to update Participants.
     */
    data: XOR<ParticipantsUpdateManyMutationInput, ParticipantsUncheckedUpdateManyInput>
    /**
     * Filter which Participants to update
     */
    where?: ParticipantsWhereInput
    /**
     * Limit how many Participants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Participants upsert
   */
  export type ParticipantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * The filter to search for the Participants to update in case it exists.
     */
    where: ParticipantsWhereUniqueInput
    /**
     * In case the Participants found by the `where` argument doesn't exist, create a new Participants with this data.
     */
    create: XOR<ParticipantsCreateInput, ParticipantsUncheckedCreateInput>
    /**
     * In case the Participants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParticipantsUpdateInput, ParticipantsUncheckedUpdateInput>
  }

  /**
   * Participants delete
   */
  export type ParticipantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
    /**
     * Filter which Participants to delete.
     */
    where: ParticipantsWhereUniqueInput
  }

  /**
   * Participants deleteMany
   */
  export type ParticipantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participants to delete
     */
    where?: ParticipantsWhereInput
    /**
     * Limit how many Participants to delete.
     */
    limit?: number
  }

  /**
   * Participants.votes
   */
  export type Participants$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    where?: VotesWhereInput
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    cursor?: VotesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Participants without action
   */
  export type ParticipantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participants
     */
    select?: ParticipantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participants
     */
    omit?: ParticipantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantsInclude<ExtArgs> | null
  }


  /**
   * Model Invitations
   */

  export type AggregateInvitations = {
    _count: InvitationsCountAggregateOutputType | null
    _min: InvitationsMinAggregateOutputType | null
    _max: InvitationsMaxAggregateOutputType | null
  }

  export type InvitationsMinAggregateOutputType = {
    id: string | null
    room_id: string | null
    email: string | null
    token: string | null
    expires_at: Date | null
    used_at: Date | null
    created_at: Date | null
  }

  export type InvitationsMaxAggregateOutputType = {
    id: string | null
    room_id: string | null
    email: string | null
    token: string | null
    expires_at: Date | null
    used_at: Date | null
    created_at: Date | null
  }

  export type InvitationsCountAggregateOutputType = {
    id: number
    room_id: number
    email: number
    token: number
    expires_at: number
    used_at: number
    created_at: number
    _all: number
  }


  export type InvitationsMinAggregateInputType = {
    id?: true
    room_id?: true
    email?: true
    token?: true
    expires_at?: true
    used_at?: true
    created_at?: true
  }

  export type InvitationsMaxAggregateInputType = {
    id?: true
    room_id?: true
    email?: true
    token?: true
    expires_at?: true
    used_at?: true
    created_at?: true
  }

  export type InvitationsCountAggregateInputType = {
    id?: true
    room_id?: true
    email?: true
    token?: true
    expires_at?: true
    used_at?: true
    created_at?: true
    _all?: true
  }

  export type InvitationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to aggregate.
     */
    where?: InvitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationsOrderByWithRelationInput | InvitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationsMaxAggregateInputType
  }

  export type GetInvitationsAggregateType<T extends InvitationsAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitations[P]>
      : GetScalarType<T[P], AggregateInvitations[P]>
  }




  export type InvitationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationsWhereInput
    orderBy?: InvitationsOrderByWithAggregationInput | InvitationsOrderByWithAggregationInput[]
    by: InvitationsScalarFieldEnum[] | InvitationsScalarFieldEnum
    having?: InvitationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationsCountAggregateInputType | true
    _min?: InvitationsMinAggregateInputType
    _max?: InvitationsMaxAggregateInputType
  }

  export type InvitationsGroupByOutputType = {
    id: string
    room_id: string
    email: string
    token: string
    expires_at: Date
    used_at: Date | null
    created_at: Date
    _count: InvitationsCountAggregateOutputType | null
    _min: InvitationsMinAggregateOutputType | null
    _max: InvitationsMaxAggregateOutputType | null
  }

  type GetInvitationsGroupByPayload<T extends InvitationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationsGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationsGroupByOutputType[P]>
        }
      >
    >


  export type InvitationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    email?: boolean
    token?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitations"]>

  export type InvitationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    email?: boolean
    token?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitations"]>

  export type InvitationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    email?: boolean
    token?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitations"]>

  export type InvitationsSelectScalar = {
    id?: boolean
    room_id?: boolean
    email?: boolean
    token?: boolean
    expires_at?: boolean
    used_at?: boolean
    created_at?: boolean
  }

  export type InvitationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "email" | "token" | "expires_at" | "used_at" | "created_at", ExtArgs["result"]["invitations"]>
  export type InvitationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }
  export type InvitationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }
  export type InvitationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
  }

  export type $InvitationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitations"
    objects: {
      room: Prisma.$RoomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_id: string
      email: string
      token: string
      expires_at: Date
      used_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["invitations"]>
    composites: {}
  }

  type InvitationsGetPayload<S extends boolean | null | undefined | InvitationsDefaultArgs> = $Result.GetResult<Prisma.$InvitationsPayload, S>

  type InvitationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationsCountAggregateInputType | true
    }

  export interface InvitationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitations'], meta: { name: 'Invitations' } }
    /**
     * Find zero or one Invitations that matches the filter.
     * @param {InvitationsFindUniqueArgs} args - Arguments to find a Invitations
     * @example
     * // Get one Invitations
     * const invitations = await prisma.invitations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationsFindUniqueArgs>(args: SelectSubset<T, InvitationsFindUniqueArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invitations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationsFindUniqueOrThrowArgs} args - Arguments to find a Invitations
     * @example
     * // Get one Invitations
     * const invitations = await prisma.invitations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationsFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationsFindFirstArgs} args - Arguments to find a Invitations
     * @example
     * // Get one Invitations
     * const invitations = await prisma.invitations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationsFindFirstArgs>(args?: SelectSubset<T, InvitationsFindFirstArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationsFindFirstOrThrowArgs} args - Arguments to find a Invitations
     * @example
     * // Get one Invitations
     * const invitations = await prisma.invitations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationsFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitations.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationsWithIdOnly = await prisma.invitations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationsFindManyArgs>(args?: SelectSubset<T, InvitationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invitations.
     * @param {InvitationsCreateArgs} args - Arguments to create a Invitations.
     * @example
     * // Create one Invitations
     * const Invitations = await prisma.invitations.create({
     *   data: {
     *     // ... data to create a Invitations
     *   }
     * })
     * 
     */
    create<T extends InvitationsCreateArgs>(args: SelectSubset<T, InvitationsCreateArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invitations.
     * @param {InvitationsCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitations = await prisma.invitations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationsCreateManyArgs>(args?: SelectSubset<T, InvitationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {InvitationsCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitations = await prisma.invitations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationsWithIdOnly = await prisma.invitations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationsCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invitations.
     * @param {InvitationsDeleteArgs} args - Arguments to delete one Invitations.
     * @example
     * // Delete one Invitations
     * const Invitations = await prisma.invitations.delete({
     *   where: {
     *     // ... filter to delete one Invitations
     *   }
     * })
     * 
     */
    delete<T extends InvitationsDeleteArgs>(args: SelectSubset<T, InvitationsDeleteArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invitations.
     * @param {InvitationsUpdateArgs} args - Arguments to update one Invitations.
     * @example
     * // Update one Invitations
     * const invitations = await prisma.invitations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationsUpdateArgs>(args: SelectSubset<T, InvitationsUpdateArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationsDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationsDeleteManyArgs>(args?: SelectSubset<T, InvitationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitations = await prisma.invitations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationsUpdateManyArgs>(args: SelectSubset<T, InvitationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations and returns the data updated in the database.
     * @param {InvitationsUpdateManyAndReturnArgs} args - Arguments to update many Invitations.
     * @example
     * // Update many Invitations
     * const invitations = await prisma.invitations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invitations and only return the `id`
     * const invitationsWithIdOnly = await prisma.invitations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvitationsUpdateManyAndReturnArgs>(args: SelectSubset<T, InvitationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invitations.
     * @param {InvitationsUpsertArgs} args - Arguments to update or create a Invitations.
     * @example
     * // Update or create a Invitations
     * const invitations = await prisma.invitations.upsert({
     *   create: {
     *     // ... data to create a Invitations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitations we want to update
     *   }
     * })
     */
    upsert<T extends InvitationsUpsertArgs>(args: SelectSubset<T, InvitationsUpsertArgs<ExtArgs>>): Prisma__InvitationsClient<$Result.GetResult<Prisma.$InvitationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationsCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitations.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationsCountArgs>(
      args?: Subset<T, InvitationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationsAggregateArgs>(args: Subset<T, InvitationsAggregateArgs>): Prisma.PrismaPromise<GetInvitationsAggregateType<T>>

    /**
     * Group by Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationsGroupByArgs['orderBy'] }
        : { orderBy?: InvitationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitations model
   */
  readonly fields: InvitationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomsDefaultArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitations model
   */
  interface InvitationsFieldRefs {
    readonly id: FieldRef<"Invitations", 'String'>
    readonly room_id: FieldRef<"Invitations", 'String'>
    readonly email: FieldRef<"Invitations", 'String'>
    readonly token: FieldRef<"Invitations", 'String'>
    readonly expires_at: FieldRef<"Invitations", 'DateTime'>
    readonly used_at: FieldRef<"Invitations", 'DateTime'>
    readonly created_at: FieldRef<"Invitations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invitations findUnique
   */
  export type InvitationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where: InvitationsWhereUniqueInput
  }

  /**
   * Invitations findUniqueOrThrow
   */
  export type InvitationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where: InvitationsWhereUniqueInput
  }

  /**
   * Invitations findFirst
   */
  export type InvitationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationsOrderByWithRelationInput | InvitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationsScalarFieldEnum | InvitationsScalarFieldEnum[]
  }

  /**
   * Invitations findFirstOrThrow
   */
  export type InvitationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationsOrderByWithRelationInput | InvitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationsScalarFieldEnum | InvitationsScalarFieldEnum[]
  }

  /**
   * Invitations findMany
   */
  export type InvitationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationsOrderByWithRelationInput | InvitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationsScalarFieldEnum | InvitationsScalarFieldEnum[]
  }

  /**
   * Invitations create
   */
  export type InvitationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitations.
     */
    data: XOR<InvitationsCreateInput, InvitationsUncheckedCreateInput>
  }

  /**
   * Invitations createMany
   */
  export type InvitationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationsCreateManyInput | InvitationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invitations createManyAndReturn
   */
  export type InvitationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * The data used to create many Invitations.
     */
    data: InvitationsCreateManyInput | InvitationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitations update
   */
  export type InvitationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitations.
     */
    data: XOR<InvitationsUpdateInput, InvitationsUncheckedUpdateInput>
    /**
     * Choose, which Invitations to update.
     */
    where: InvitationsWhereUniqueInput
  }

  /**
   * Invitations updateMany
   */
  export type InvitationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationsUpdateManyMutationInput, InvitationsUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationsWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
  }

  /**
   * Invitations updateManyAndReturn
   */
  export type InvitationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationsUpdateManyMutationInput, InvitationsUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationsWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitations upsert
   */
  export type InvitationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitations to update in case it exists.
     */
    where: InvitationsWhereUniqueInput
    /**
     * In case the Invitations found by the `where` argument doesn't exist, create a new Invitations with this data.
     */
    create: XOR<InvitationsCreateInput, InvitationsUncheckedCreateInput>
    /**
     * In case the Invitations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationsUpdateInput, InvitationsUncheckedUpdateInput>
  }

  /**
   * Invitations delete
   */
  export type InvitationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
    /**
     * Filter which Invitations to delete.
     */
    where: InvitationsWhereUniqueInput
  }

  /**
   * Invitations deleteMany
   */
  export type InvitationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationsWhereInput
    /**
     * Limit how many Invitations to delete.
     */
    limit?: number
  }

  /**
   * Invitations without action
   */
  export type InvitationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitations
     */
    select?: InvitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitations
     */
    omit?: InvitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationsInclude<ExtArgs> | null
  }


  /**
   * Model Restaurants
   */

  export type AggregateRestaurants = {
    _count: RestaurantsCountAggregateOutputType | null
    _min: RestaurantsMinAggregateOutputType | null
    _max: RestaurantsMaxAggregateOutputType | null
  }

  export type RestaurantsMinAggregateOutputType = {
    id: string | null
    name: string | null
    menu_image_url: string | null
    created_at: Date | null
  }

  export type RestaurantsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    menu_image_url: string | null
    created_at: Date | null
  }

  export type RestaurantsCountAggregateOutputType = {
    id: number
    name: number
    menu_image_url: number
    created_at: number
    _all: number
  }


  export type RestaurantsMinAggregateInputType = {
    id?: true
    name?: true
    menu_image_url?: true
    created_at?: true
  }

  export type RestaurantsMaxAggregateInputType = {
    id?: true
    name?: true
    menu_image_url?: true
    created_at?: true
  }

  export type RestaurantsCountAggregateInputType = {
    id?: true
    name?: true
    menu_image_url?: true
    created_at?: true
    _all?: true
  }

  export type RestaurantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurants to aggregate.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Restaurants
    **/
    _count?: true | RestaurantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantsMaxAggregateInputType
  }

  export type GetRestaurantsAggregateType<T extends RestaurantsAggregateArgs> = {
        [P in keyof T & keyof AggregateRestaurants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestaurants[P]>
      : GetScalarType<T[P], AggregateRestaurants[P]>
  }




  export type RestaurantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantsWhereInput
    orderBy?: RestaurantsOrderByWithAggregationInput | RestaurantsOrderByWithAggregationInput[]
    by: RestaurantsScalarFieldEnum[] | RestaurantsScalarFieldEnum
    having?: RestaurantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestaurantsCountAggregateInputType | true
    _min?: RestaurantsMinAggregateInputType
    _max?: RestaurantsMaxAggregateInputType
  }

  export type RestaurantsGroupByOutputType = {
    id: string
    name: string
    menu_image_url: string | null
    created_at: Date
    _count: RestaurantsCountAggregateOutputType | null
    _min: RestaurantsMinAggregateOutputType | null
    _max: RestaurantsMaxAggregateOutputType | null
  }

  type GetRestaurantsGroupByPayload<T extends RestaurantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestaurantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestaurantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestaurantsGroupByOutputType[P]>
            : GetScalarType<T[P], RestaurantsGroupByOutputType[P]>
        }
      >
    >


  export type RestaurantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    menu_image_url?: boolean
    created_at?: boolean
    votes?: boolean | Restaurants$votesArgs<ExtArgs>
    winner_rooms?: boolean | Restaurants$winner_roomsArgs<ExtArgs>
    _count?: boolean | RestaurantsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurants"]>

  export type RestaurantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    menu_image_url?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["restaurants"]>

  export type RestaurantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    menu_image_url?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["restaurants"]>

  export type RestaurantsSelectScalar = {
    id?: boolean
    name?: boolean
    menu_image_url?: boolean
    created_at?: boolean
  }

  export type RestaurantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "menu_image_url" | "created_at", ExtArgs["result"]["restaurants"]>
  export type RestaurantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | Restaurants$votesArgs<ExtArgs>
    winner_rooms?: boolean | Restaurants$winner_roomsArgs<ExtArgs>
    _count?: boolean | RestaurantsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RestaurantsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RestaurantsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RestaurantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Restaurants"
    objects: {
      votes: Prisma.$VotesPayload<ExtArgs>[]
      winner_rooms: Prisma.$RoomsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      menu_image_url: string | null
      created_at: Date
    }, ExtArgs["result"]["restaurants"]>
    composites: {}
  }

  type RestaurantsGetPayload<S extends boolean | null | undefined | RestaurantsDefaultArgs> = $Result.GetResult<Prisma.$RestaurantsPayload, S>

  type RestaurantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RestaurantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RestaurantsCountAggregateInputType | true
    }

  export interface RestaurantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Restaurants'], meta: { name: 'Restaurants' } }
    /**
     * Find zero or one Restaurants that matches the filter.
     * @param {RestaurantsFindUniqueArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantsFindUniqueArgs>(args: SelectSubset<T, RestaurantsFindUniqueArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Restaurants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestaurantsFindUniqueOrThrowArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantsFindUniqueOrThrowArgs>(args: SelectSubset<T, RestaurantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsFindFirstArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantsFindFirstArgs>(args?: SelectSubset<T, RestaurantsFindFirstArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsFindFirstOrThrowArgs} args - Arguments to find a Restaurants
     * @example
     * // Get one Restaurants
     * const restaurants = await prisma.restaurants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantsFindFirstOrThrowArgs>(args?: SelectSubset<T, RestaurantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Restaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Restaurants
     * const restaurants = await prisma.restaurants.findMany()
     * 
     * // Get first 10 Restaurants
     * const restaurants = await prisma.restaurants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const restaurantsWithIdOnly = await prisma.restaurants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RestaurantsFindManyArgs>(args?: SelectSubset<T, RestaurantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Restaurants.
     * @param {RestaurantsCreateArgs} args - Arguments to create a Restaurants.
     * @example
     * // Create one Restaurants
     * const Restaurants = await prisma.restaurants.create({
     *   data: {
     *     // ... data to create a Restaurants
     *   }
     * })
     * 
     */
    create<T extends RestaurantsCreateArgs>(args: SelectSubset<T, RestaurantsCreateArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Restaurants.
     * @param {RestaurantsCreateManyArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurants = await prisma.restaurants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestaurantsCreateManyArgs>(args?: SelectSubset<T, RestaurantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Restaurants and returns the data saved in the database.
     * @param {RestaurantsCreateManyAndReturnArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurants = await prisma.restaurants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Restaurants and only return the `id`
     * const restaurantsWithIdOnly = await prisma.restaurants.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestaurantsCreateManyAndReturnArgs>(args?: SelectSubset<T, RestaurantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Restaurants.
     * @param {RestaurantsDeleteArgs} args - Arguments to delete one Restaurants.
     * @example
     * // Delete one Restaurants
     * const Restaurants = await prisma.restaurants.delete({
     *   where: {
     *     // ... filter to delete one Restaurants
     *   }
     * })
     * 
     */
    delete<T extends RestaurantsDeleteArgs>(args: SelectSubset<T, RestaurantsDeleteArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Restaurants.
     * @param {RestaurantsUpdateArgs} args - Arguments to update one Restaurants.
     * @example
     * // Update one Restaurants
     * const restaurants = await prisma.restaurants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestaurantsUpdateArgs>(args: SelectSubset<T, RestaurantsUpdateArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Restaurants.
     * @param {RestaurantsDeleteManyArgs} args - Arguments to filter Restaurants to delete.
     * @example
     * // Delete a few Restaurants
     * const { count } = await prisma.restaurants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestaurantsDeleteManyArgs>(args?: SelectSubset<T, RestaurantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Restaurants
     * const restaurants = await prisma.restaurants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestaurantsUpdateManyArgs>(args: SelectSubset<T, RestaurantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants and returns the data updated in the database.
     * @param {RestaurantsUpdateManyAndReturnArgs} args - Arguments to update many Restaurants.
     * @example
     * // Update many Restaurants
     * const restaurants = await prisma.restaurants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Restaurants and only return the `id`
     * const restaurantsWithIdOnly = await prisma.restaurants.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RestaurantsUpdateManyAndReturnArgs>(args: SelectSubset<T, RestaurantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Restaurants.
     * @param {RestaurantsUpsertArgs} args - Arguments to update or create a Restaurants.
     * @example
     * // Update or create a Restaurants
     * const restaurants = await prisma.restaurants.upsert({
     *   create: {
     *     // ... data to create a Restaurants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Restaurants we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantsUpsertArgs>(args: SelectSubset<T, RestaurantsUpsertArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsCountArgs} args - Arguments to filter Restaurants to count.
     * @example
     * // Count the number of Restaurants
     * const count = await prisma.restaurants.count({
     *   where: {
     *     // ... the filter for the Restaurants we want to count
     *   }
     * })
    **/
    count<T extends RestaurantsCountArgs>(
      args?: Subset<T, RestaurantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestaurantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantsAggregateArgs>(args: Subset<T, RestaurantsAggregateArgs>): Prisma.PrismaPromise<GetRestaurantsAggregateType<T>>

    /**
     * Group by Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RestaurantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestaurantsGroupByArgs['orderBy'] }
        : { orderBy?: RestaurantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RestaurantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Restaurants model
   */
  readonly fields: RestaurantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Restaurants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestaurantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    votes<T extends Restaurants$votesArgs<ExtArgs> = {}>(args?: Subset<T, Restaurants$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    winner_rooms<T extends Restaurants$winner_roomsArgs<ExtArgs> = {}>(args?: Subset<T, Restaurants$winner_roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Restaurants model
   */
  interface RestaurantsFieldRefs {
    readonly id: FieldRef<"Restaurants", 'String'>
    readonly name: FieldRef<"Restaurants", 'String'>
    readonly menu_image_url: FieldRef<"Restaurants", 'String'>
    readonly created_at: FieldRef<"Restaurants", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Restaurants findUnique
   */
  export type RestaurantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants findUniqueOrThrow
   */
  export type RestaurantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants findFirst
   */
  export type RestaurantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantsScalarFieldEnum | RestaurantsScalarFieldEnum[]
  }

  /**
   * Restaurants findFirstOrThrow
   */
  export type RestaurantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantsScalarFieldEnum | RestaurantsScalarFieldEnum[]
  }

  /**
   * Restaurants findMany
   */
  export type RestaurantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantsOrderByWithRelationInput | RestaurantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Restaurants.
     */
    cursor?: RestaurantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    distinct?: RestaurantsScalarFieldEnum | RestaurantsScalarFieldEnum[]
  }

  /**
   * Restaurants create
   */
  export type RestaurantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * The data needed to create a Restaurants.
     */
    data: XOR<RestaurantsCreateInput, RestaurantsUncheckedCreateInput>
  }

  /**
   * Restaurants createMany
   */
  export type RestaurantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantsCreateManyInput | RestaurantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurants createManyAndReturn
   */
  export type RestaurantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantsCreateManyInput | RestaurantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurants update
   */
  export type RestaurantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * The data needed to update a Restaurants.
     */
    data: XOR<RestaurantsUpdateInput, RestaurantsUncheckedUpdateInput>
    /**
     * Choose, which Restaurants to update.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants updateMany
   */
  export type RestaurantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantsUpdateManyMutationInput, RestaurantsUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantsWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurants updateManyAndReturn
   */
  export type RestaurantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantsUpdateManyMutationInput, RestaurantsUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantsWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurants upsert
   */
  export type RestaurantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * The filter to search for the Restaurants to update in case it exists.
     */
    where: RestaurantsWhereUniqueInput
    /**
     * In case the Restaurants found by the `where` argument doesn't exist, create a new Restaurants with this data.
     */
    create: XOR<RestaurantsCreateInput, RestaurantsUncheckedCreateInput>
    /**
     * In case the Restaurants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestaurantsUpdateInput, RestaurantsUncheckedUpdateInput>
  }

  /**
   * Restaurants delete
   */
  export type RestaurantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
    /**
     * Filter which Restaurants to delete.
     */
    where: RestaurantsWhereUniqueInput
  }

  /**
   * Restaurants deleteMany
   */
  export type RestaurantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurants to delete
     */
    where?: RestaurantsWhereInput
    /**
     * Limit how many Restaurants to delete.
     */
    limit?: number
  }

  /**
   * Restaurants.votes
   */
  export type Restaurants$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    where?: VotesWhereInput
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    cursor?: VotesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Restaurants.winner_rooms
   */
  export type Restaurants$winner_roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rooms
     */
    select?: RoomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rooms
     */
    omit?: RoomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomsInclude<ExtArgs> | null
    where?: RoomsWhereInput
    orderBy?: RoomsOrderByWithRelationInput | RoomsOrderByWithRelationInput[]
    cursor?: RoomsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * Restaurants without action
   */
  export type RestaurantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurants
     */
    select?: RestaurantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurants
     */
    omit?: RestaurantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantsInclude<ExtArgs> | null
  }


  /**
   * Model Votes
   */

  export type AggregateVotes = {
    _count: VotesCountAggregateOutputType | null
    _min: VotesMinAggregateOutputType | null
    _max: VotesMaxAggregateOutputType | null
  }

  export type VotesMinAggregateOutputType = {
    id: string | null
    room_id: string | null
    participant_id: string | null
    participant_email: string | null
    restaurant_id: string | null
    voted_at: Date | null
  }

  export type VotesMaxAggregateOutputType = {
    id: string | null
    room_id: string | null
    participant_id: string | null
    participant_email: string | null
    restaurant_id: string | null
    voted_at: Date | null
  }

  export type VotesCountAggregateOutputType = {
    id: number
    room_id: number
    participant_id: number
    participant_email: number
    restaurant_id: number
    voted_at: number
    _all: number
  }


  export type VotesMinAggregateInputType = {
    id?: true
    room_id?: true
    participant_id?: true
    participant_email?: true
    restaurant_id?: true
    voted_at?: true
  }

  export type VotesMaxAggregateInputType = {
    id?: true
    room_id?: true
    participant_id?: true
    participant_email?: true
    restaurant_id?: true
    voted_at?: true
  }

  export type VotesCountAggregateInputType = {
    id?: true
    room_id?: true
    participant_id?: true
    participant_email?: true
    restaurant_id?: true
    voted_at?: true
    _all?: true
  }

  export type VotesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to aggregate.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VotesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VotesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VotesMaxAggregateInputType
  }

  export type GetVotesAggregateType<T extends VotesAggregateArgs> = {
        [P in keyof T & keyof AggregateVotes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVotes[P]>
      : GetScalarType<T[P], AggregateVotes[P]>
  }




  export type VotesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VotesWhereInput
    orderBy?: VotesOrderByWithAggregationInput | VotesOrderByWithAggregationInput[]
    by: VotesScalarFieldEnum[] | VotesScalarFieldEnum
    having?: VotesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VotesCountAggregateInputType | true
    _min?: VotesMinAggregateInputType
    _max?: VotesMaxAggregateInputType
  }

  export type VotesGroupByOutputType = {
    id: string
    room_id: string
    participant_id: string
    participant_email: string
    restaurant_id: string
    voted_at: Date
    _count: VotesCountAggregateOutputType | null
    _min: VotesMinAggregateOutputType | null
    _max: VotesMaxAggregateOutputType | null
  }

  type GetVotesGroupByPayload<T extends VotesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VotesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VotesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VotesGroupByOutputType[P]>
            : GetScalarType<T[P], VotesGroupByOutputType[P]>
        }
      >
    >


  export type VotesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    participant_id?: boolean
    participant_email?: boolean
    restaurant_id?: boolean
    voted_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    participant?: boolean | ParticipantsDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["votes"]>

  export type VotesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    participant_id?: boolean
    participant_email?: boolean
    restaurant_id?: boolean
    voted_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    participant?: boolean | ParticipantsDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["votes"]>

  export type VotesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    participant_id?: boolean
    participant_email?: boolean
    restaurant_id?: boolean
    voted_at?: boolean
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    participant?: boolean | ParticipantsDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["votes"]>

  export type VotesSelectScalar = {
    id?: boolean
    room_id?: boolean
    participant_id?: boolean
    participant_email?: boolean
    restaurant_id?: boolean
    voted_at?: boolean
  }

  export type VotesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "participant_id" | "participant_email" | "restaurant_id" | "voted_at", ExtArgs["result"]["votes"]>
  export type VotesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    participant?: boolean | ParticipantsDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantsDefaultArgs<ExtArgs>
  }
  export type VotesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    participant?: boolean | ParticipantsDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantsDefaultArgs<ExtArgs>
  }
  export type VotesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomsDefaultArgs<ExtArgs>
    participant?: boolean | ParticipantsDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantsDefaultArgs<ExtArgs>
  }

  export type $VotesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Votes"
    objects: {
      room: Prisma.$RoomsPayload<ExtArgs>
      participant: Prisma.$ParticipantsPayload<ExtArgs>
      restaurant: Prisma.$RestaurantsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_id: string
      participant_id: string
      participant_email: string
      restaurant_id: string
      voted_at: Date
    }, ExtArgs["result"]["votes"]>
    composites: {}
  }

  type VotesGetPayload<S extends boolean | null | undefined | VotesDefaultArgs> = $Result.GetResult<Prisma.$VotesPayload, S>

  type VotesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VotesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VotesCountAggregateInputType | true
    }

  export interface VotesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Votes'], meta: { name: 'Votes' } }
    /**
     * Find zero or one Votes that matches the filter.
     * @param {VotesFindUniqueArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VotesFindUniqueArgs>(args: SelectSubset<T, VotesFindUniqueArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Votes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VotesFindUniqueOrThrowArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VotesFindUniqueOrThrowArgs>(args: SelectSubset<T, VotesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesFindFirstArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VotesFindFirstArgs>(args?: SelectSubset<T, VotesFindFirstArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Votes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesFindFirstOrThrowArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VotesFindFirstOrThrowArgs>(args?: SelectSubset<T, VotesFindFirstOrThrowArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.votes.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.votes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const votesWithIdOnly = await prisma.votes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VotesFindManyArgs>(args?: SelectSubset<T, VotesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Votes.
     * @param {VotesCreateArgs} args - Arguments to create a Votes.
     * @example
     * // Create one Votes
     * const Votes = await prisma.votes.create({
     *   data: {
     *     // ... data to create a Votes
     *   }
     * })
     * 
     */
    create<T extends VotesCreateArgs>(args: SelectSubset<T, VotesCreateArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Votes.
     * @param {VotesCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const votes = await prisma.votes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VotesCreateManyArgs>(args?: SelectSubset<T, VotesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Votes and returns the data saved in the database.
     * @param {VotesCreateManyAndReturnArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const votes = await prisma.votes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Votes and only return the `id`
     * const votesWithIdOnly = await prisma.votes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VotesCreateManyAndReturnArgs>(args?: SelectSubset<T, VotesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Votes.
     * @param {VotesDeleteArgs} args - Arguments to delete one Votes.
     * @example
     * // Delete one Votes
     * const Votes = await prisma.votes.delete({
     *   where: {
     *     // ... filter to delete one Votes
     *   }
     * })
     * 
     */
    delete<T extends VotesDeleteArgs>(args: SelectSubset<T, VotesDeleteArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Votes.
     * @param {VotesUpdateArgs} args - Arguments to update one Votes.
     * @example
     * // Update one Votes
     * const votes = await prisma.votes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VotesUpdateArgs>(args: SelectSubset<T, VotesUpdateArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Votes.
     * @param {VotesDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.votes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VotesDeleteManyArgs>(args?: SelectSubset<T, VotesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const votes = await prisma.votes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VotesUpdateManyArgs>(args: SelectSubset<T, VotesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes and returns the data updated in the database.
     * @param {VotesUpdateManyAndReturnArgs} args - Arguments to update many Votes.
     * @example
     * // Update many Votes
     * const votes = await prisma.votes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Votes and only return the `id`
     * const votesWithIdOnly = await prisma.votes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VotesUpdateManyAndReturnArgs>(args: SelectSubset<T, VotesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Votes.
     * @param {VotesUpsertArgs} args - Arguments to update or create a Votes.
     * @example
     * // Update or create a Votes
     * const votes = await prisma.votes.upsert({
     *   create: {
     *     // ... data to create a Votes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Votes we want to update
     *   }
     * })
     */
    upsert<T extends VotesUpsertArgs>(args: SelectSubset<T, VotesUpsertArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.votes.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VotesCountArgs>(
      args?: Subset<T, VotesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VotesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VotesAggregateArgs>(args: Subset<T, VotesAggregateArgs>): Prisma.PrismaPromise<GetVotesAggregateType<T>>

    /**
     * Group by Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VotesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VotesGroupByArgs['orderBy'] }
        : { orderBy?: VotesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VotesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVotesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Votes model
   */
  readonly fields: VotesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Votes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VotesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomsDefaultArgs<ExtArgs>>): Prisma__RoomsClient<$Result.GetResult<Prisma.$RoomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participant<T extends ParticipantsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParticipantsDefaultArgs<ExtArgs>>): Prisma__ParticipantsClient<$Result.GetResult<Prisma.$ParticipantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    restaurant<T extends RestaurantsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantsDefaultArgs<ExtArgs>>): Prisma__RestaurantsClient<$Result.GetResult<Prisma.$RestaurantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Votes model
   */
  interface VotesFieldRefs {
    readonly id: FieldRef<"Votes", 'String'>
    readonly room_id: FieldRef<"Votes", 'String'>
    readonly participant_id: FieldRef<"Votes", 'String'>
    readonly participant_email: FieldRef<"Votes", 'String'>
    readonly restaurant_id: FieldRef<"Votes", 'String'>
    readonly voted_at: FieldRef<"Votes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Votes findUnique
   */
  export type VotesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes findUniqueOrThrow
   */
  export type VotesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes findFirst
   */
  export type VotesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Votes findFirstOrThrow
   */
  export type VotesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Votes findMany
   */
  export type VotesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Votes create
   */
  export type VotesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * The data needed to create a Votes.
     */
    data: XOR<VotesCreateInput, VotesUncheckedCreateInput>
  }

  /**
   * Votes createMany
   */
  export type VotesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VotesCreateManyInput | VotesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Votes createManyAndReturn
   */
  export type VotesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * The data used to create many Votes.
     */
    data: VotesCreateManyInput | VotesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Votes update
   */
  export type VotesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * The data needed to update a Votes.
     */
    data: XOR<VotesUpdateInput, VotesUncheckedUpdateInput>
    /**
     * Choose, which Votes to update.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes updateMany
   */
  export type VotesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VotesUpdateManyMutationInput, VotesUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VotesWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
  }

  /**
   * Votes updateManyAndReturn
   */
  export type VotesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * The data used to update Votes.
     */
    data: XOR<VotesUpdateManyMutationInput, VotesUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VotesWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Votes upsert
   */
  export type VotesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * The filter to search for the Votes to update in case it exists.
     */
    where: VotesWhereUniqueInput
    /**
     * In case the Votes found by the `where` argument doesn't exist, create a new Votes with this data.
     */
    create: XOR<VotesCreateInput, VotesUncheckedCreateInput>
    /**
     * In case the Votes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VotesUpdateInput, VotesUncheckedUpdateInput>
  }

  /**
   * Votes delete
   */
  export type VotesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter which Votes to delete.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes deleteMany
   */
  export type VotesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VotesWhereInput
    /**
     * Limit how many Votes to delete.
     */
    limit?: number
  }

  /**
   * Votes without action
   */
  export type VotesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoomsScalarFieldEnum: {
    id: 'id',
    room_name: 'room_name',
    start_at: 'start_at',
    end_at: 'end_at',
    status: 'status',
    owner_id: 'owner_id',
    owner_token: 'owner_token',
    winner_restaurant_id: 'winner_restaurant_id',
    created_at: 'created_at'
  };

  export type RoomsScalarFieldEnum = (typeof RoomsScalarFieldEnum)[keyof typeof RoomsScalarFieldEnum]


  export const ParticipantsScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    email: 'email',
    participant_name: 'participant_name',
    role: 'role',
    joined_at: 'joined_at'
  };

  export type ParticipantsScalarFieldEnum = (typeof ParticipantsScalarFieldEnum)[keyof typeof ParticipantsScalarFieldEnum]


  export const InvitationsScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    email: 'email',
    token: 'token',
    expires_at: 'expires_at',
    used_at: 'used_at',
    created_at: 'created_at'
  };

  export type InvitationsScalarFieldEnum = (typeof InvitationsScalarFieldEnum)[keyof typeof InvitationsScalarFieldEnum]


  export const RestaurantsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    menu_image_url: 'menu_image_url',
    created_at: 'created_at'
  };

  export type RestaurantsScalarFieldEnum = (typeof RestaurantsScalarFieldEnum)[keyof typeof RestaurantsScalarFieldEnum]


  export const VotesScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    participant_id: 'participant_id',
    participant_email: 'participant_email',
    restaurant_id: 'restaurant_id',
    voted_at: 'voted_at'
  };

  export type VotesScalarFieldEnum = (typeof VotesScalarFieldEnum)[keyof typeof VotesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ROOM_STATUS'
   */
  export type EnumROOM_STATUSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ROOM_STATUS'>
    


  /**
   * Reference to a field of type 'ROOM_STATUS[]'
   */
  export type ListEnumROOM_STATUSFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ROOM_STATUS[]'>
    


  /**
   * Reference to a field of type 'PARTICIPANT_ROLE'
   */
  export type EnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PARTICIPANT_ROLE'>
    


  /**
   * Reference to a field of type 'PARTICIPANT_ROLE[]'
   */
  export type ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PARTICIPANT_ROLE[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type RoomsWhereInput = {
    AND?: RoomsWhereInput | RoomsWhereInput[]
    OR?: RoomsWhereInput[]
    NOT?: RoomsWhereInput | RoomsWhereInput[]
    id?: StringFilter<"Rooms"> | string
    room_name?: StringFilter<"Rooms"> | string
    start_at?: DateTimeFilter<"Rooms"> | Date | string
    end_at?: DateTimeFilter<"Rooms"> | Date | string
    status?: EnumROOM_STATUSFilter<"Rooms"> | $Enums.ROOM_STATUS
    owner_id?: StringFilter<"Rooms"> | string
    owner_token?: StringFilter<"Rooms"> | string
    winner_restaurant_id?: StringNullableFilter<"Rooms"> | string | null
    created_at?: DateTimeFilter<"Rooms"> | Date | string
    participants?: ParticipantsListRelationFilter
    invitations?: InvitationsListRelationFilter
    votes?: VotesListRelationFilter
    winner?: XOR<RestaurantsNullableScalarRelationFilter, RestaurantsWhereInput> | null
  }

  export type RoomsOrderByWithRelationInput = {
    id?: SortOrder
    room_name?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    owner_token?: SortOrder
    winner_restaurant_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    participants?: ParticipantsOrderByRelationAggregateInput
    invitations?: InvitationsOrderByRelationAggregateInput
    votes?: VotesOrderByRelationAggregateInput
    winner?: RestaurantsOrderByWithRelationInput
  }

  export type RoomsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    owner_token?: string
    AND?: RoomsWhereInput | RoomsWhereInput[]
    OR?: RoomsWhereInput[]
    NOT?: RoomsWhereInput | RoomsWhereInput[]
    room_name?: StringFilter<"Rooms"> | string
    start_at?: DateTimeFilter<"Rooms"> | Date | string
    end_at?: DateTimeFilter<"Rooms"> | Date | string
    status?: EnumROOM_STATUSFilter<"Rooms"> | $Enums.ROOM_STATUS
    owner_id?: StringFilter<"Rooms"> | string
    winner_restaurant_id?: StringNullableFilter<"Rooms"> | string | null
    created_at?: DateTimeFilter<"Rooms"> | Date | string
    participants?: ParticipantsListRelationFilter
    invitations?: InvitationsListRelationFilter
    votes?: VotesListRelationFilter
    winner?: XOR<RestaurantsNullableScalarRelationFilter, RestaurantsWhereInput> | null
  }, "id" | "owner_token">

  export type RoomsOrderByWithAggregationInput = {
    id?: SortOrder
    room_name?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    owner_token?: SortOrder
    winner_restaurant_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: RoomsCountOrderByAggregateInput
    _max?: RoomsMaxOrderByAggregateInput
    _min?: RoomsMinOrderByAggregateInput
  }

  export type RoomsScalarWhereWithAggregatesInput = {
    AND?: RoomsScalarWhereWithAggregatesInput | RoomsScalarWhereWithAggregatesInput[]
    OR?: RoomsScalarWhereWithAggregatesInput[]
    NOT?: RoomsScalarWhereWithAggregatesInput | RoomsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rooms"> | string
    room_name?: StringWithAggregatesFilter<"Rooms"> | string
    start_at?: DateTimeWithAggregatesFilter<"Rooms"> | Date | string
    end_at?: DateTimeWithAggregatesFilter<"Rooms"> | Date | string
    status?: EnumROOM_STATUSWithAggregatesFilter<"Rooms"> | $Enums.ROOM_STATUS
    owner_id?: StringWithAggregatesFilter<"Rooms"> | string
    owner_token?: StringWithAggregatesFilter<"Rooms"> | string
    winner_restaurant_id?: StringNullableWithAggregatesFilter<"Rooms"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Rooms"> | Date | string
  }

  export type ParticipantsWhereInput = {
    AND?: ParticipantsWhereInput | ParticipantsWhereInput[]
    OR?: ParticipantsWhereInput[]
    NOT?: ParticipantsWhereInput | ParticipantsWhereInput[]
    id?: StringFilter<"Participants"> | string
    room_id?: StringFilter<"Participants"> | string
    email?: StringFilter<"Participants"> | string
    participant_name?: StringFilter<"Participants"> | string
    role?: EnumPARTICIPANT_ROLEFilter<"Participants"> | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFilter<"Participants"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, RoomsWhereInput>
    votes?: VotesListRelationFilter
  }

  export type ParticipantsOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    participant_name?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
    room?: RoomsOrderByWithRelationInput
    votes?: VotesOrderByRelationAggregateInput
  }

  export type ParticipantsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    room_id_email?: ParticipantsRoom_idEmailCompoundUniqueInput
    AND?: ParticipantsWhereInput | ParticipantsWhereInput[]
    OR?: ParticipantsWhereInput[]
    NOT?: ParticipantsWhereInput | ParticipantsWhereInput[]
    room_id?: StringFilter<"Participants"> | string
    email?: StringFilter<"Participants"> | string
    participant_name?: StringFilter<"Participants"> | string
    role?: EnumPARTICIPANT_ROLEFilter<"Participants"> | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFilter<"Participants"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, RoomsWhereInput>
    votes?: VotesListRelationFilter
  }, "id" | "room_id_email">

  export type ParticipantsOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    participant_name?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
    _count?: ParticipantsCountOrderByAggregateInput
    _max?: ParticipantsMaxOrderByAggregateInput
    _min?: ParticipantsMinOrderByAggregateInput
  }

  export type ParticipantsScalarWhereWithAggregatesInput = {
    AND?: ParticipantsScalarWhereWithAggregatesInput | ParticipantsScalarWhereWithAggregatesInput[]
    OR?: ParticipantsScalarWhereWithAggregatesInput[]
    NOT?: ParticipantsScalarWhereWithAggregatesInput | ParticipantsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Participants"> | string
    room_id?: StringWithAggregatesFilter<"Participants"> | string
    email?: StringWithAggregatesFilter<"Participants"> | string
    participant_name?: StringWithAggregatesFilter<"Participants"> | string
    role?: EnumPARTICIPANT_ROLEWithAggregatesFilter<"Participants"> | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeWithAggregatesFilter<"Participants"> | Date | string
  }

  export type InvitationsWhereInput = {
    AND?: InvitationsWhereInput | InvitationsWhereInput[]
    OR?: InvitationsWhereInput[]
    NOT?: InvitationsWhereInput | InvitationsWhereInput[]
    id?: StringFilter<"Invitations"> | string
    room_id?: StringFilter<"Invitations"> | string
    email?: StringFilter<"Invitations"> | string
    token?: StringFilter<"Invitations"> | string
    expires_at?: DateTimeFilter<"Invitations"> | Date | string
    used_at?: DateTimeNullableFilter<"Invitations"> | Date | string | null
    created_at?: DateTimeFilter<"Invitations"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, RoomsWhereInput>
  }

  export type InvitationsOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    room?: RoomsOrderByWithRelationInput
  }

  export type InvitationsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    room_id_email?: InvitationsRoom_idEmailCompoundUniqueInput
    AND?: InvitationsWhereInput | InvitationsWhereInput[]
    OR?: InvitationsWhereInput[]
    NOT?: InvitationsWhereInput | InvitationsWhereInput[]
    room_id?: StringFilter<"Invitations"> | string
    email?: StringFilter<"Invitations"> | string
    expires_at?: DateTimeFilter<"Invitations"> | Date | string
    used_at?: DateTimeNullableFilter<"Invitations"> | Date | string | null
    created_at?: DateTimeFilter<"Invitations"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, RoomsWhereInput>
  }, "id" | "token" | "room_id_email">

  export type InvitationsOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: InvitationsCountOrderByAggregateInput
    _max?: InvitationsMaxOrderByAggregateInput
    _min?: InvitationsMinOrderByAggregateInput
  }

  export type InvitationsScalarWhereWithAggregatesInput = {
    AND?: InvitationsScalarWhereWithAggregatesInput | InvitationsScalarWhereWithAggregatesInput[]
    OR?: InvitationsScalarWhereWithAggregatesInput[]
    NOT?: InvitationsScalarWhereWithAggregatesInput | InvitationsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invitations"> | string
    room_id?: StringWithAggregatesFilter<"Invitations"> | string
    email?: StringWithAggregatesFilter<"Invitations"> | string
    token?: StringWithAggregatesFilter<"Invitations"> | string
    expires_at?: DateTimeWithAggregatesFilter<"Invitations"> | Date | string
    used_at?: DateTimeNullableWithAggregatesFilter<"Invitations"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Invitations"> | Date | string
  }

  export type RestaurantsWhereInput = {
    AND?: RestaurantsWhereInput | RestaurantsWhereInput[]
    OR?: RestaurantsWhereInput[]
    NOT?: RestaurantsWhereInput | RestaurantsWhereInput[]
    id?: StringFilter<"Restaurants"> | string
    name?: StringFilter<"Restaurants"> | string
    menu_image_url?: StringNullableFilter<"Restaurants"> | string | null
    created_at?: DateTimeFilter<"Restaurants"> | Date | string
    votes?: VotesListRelationFilter
    winner_rooms?: RoomsListRelationFilter
  }

  export type RestaurantsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    menu_image_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    votes?: VotesOrderByRelationAggregateInput
    winner_rooms?: RoomsOrderByRelationAggregateInput
  }

  export type RestaurantsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RestaurantsWhereInput | RestaurantsWhereInput[]
    OR?: RestaurantsWhereInput[]
    NOT?: RestaurantsWhereInput | RestaurantsWhereInput[]
    menu_image_url?: StringNullableFilter<"Restaurants"> | string | null
    created_at?: DateTimeFilter<"Restaurants"> | Date | string
    votes?: VotesListRelationFilter
    winner_rooms?: RoomsListRelationFilter
  }, "id" | "name">

  export type RestaurantsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    menu_image_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: RestaurantsCountOrderByAggregateInput
    _max?: RestaurantsMaxOrderByAggregateInput
    _min?: RestaurantsMinOrderByAggregateInput
  }

  export type RestaurantsScalarWhereWithAggregatesInput = {
    AND?: RestaurantsScalarWhereWithAggregatesInput | RestaurantsScalarWhereWithAggregatesInput[]
    OR?: RestaurantsScalarWhereWithAggregatesInput[]
    NOT?: RestaurantsScalarWhereWithAggregatesInput | RestaurantsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Restaurants"> | string
    name?: StringWithAggregatesFilter<"Restaurants"> | string
    menu_image_url?: StringNullableWithAggregatesFilter<"Restaurants"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Restaurants"> | Date | string
  }

  export type VotesWhereInput = {
    AND?: VotesWhereInput | VotesWhereInput[]
    OR?: VotesWhereInput[]
    NOT?: VotesWhereInput | VotesWhereInput[]
    id?: StringFilter<"Votes"> | string
    room_id?: StringFilter<"Votes"> | string
    participant_id?: StringFilter<"Votes"> | string
    participant_email?: StringFilter<"Votes"> | string
    restaurant_id?: StringFilter<"Votes"> | string
    voted_at?: DateTimeFilter<"Votes"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, RoomsWhereInput>
    participant?: XOR<ParticipantsScalarRelationFilter, ParticipantsWhereInput>
    restaurant?: XOR<RestaurantsScalarRelationFilter, RestaurantsWhereInput>
  }

  export type VotesOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_id?: SortOrder
    participant_email?: SortOrder
    restaurant_id?: SortOrder
    voted_at?: SortOrder
    room?: RoomsOrderByWithRelationInput
    participant?: ParticipantsOrderByWithRelationInput
    restaurant?: RestaurantsOrderByWithRelationInput
  }

  export type VotesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    room_id_participant_id?: VotesRoom_idParticipant_idCompoundUniqueInput
    AND?: VotesWhereInput | VotesWhereInput[]
    OR?: VotesWhereInput[]
    NOT?: VotesWhereInput | VotesWhereInput[]
    room_id?: StringFilter<"Votes"> | string
    participant_id?: StringFilter<"Votes"> | string
    participant_email?: StringFilter<"Votes"> | string
    restaurant_id?: StringFilter<"Votes"> | string
    voted_at?: DateTimeFilter<"Votes"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, RoomsWhereInput>
    participant?: XOR<ParticipantsScalarRelationFilter, ParticipantsWhereInput>
    restaurant?: XOR<RestaurantsScalarRelationFilter, RestaurantsWhereInput>
  }, "id" | "room_id_participant_id">

  export type VotesOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_id?: SortOrder
    participant_email?: SortOrder
    restaurant_id?: SortOrder
    voted_at?: SortOrder
    _count?: VotesCountOrderByAggregateInput
    _max?: VotesMaxOrderByAggregateInput
    _min?: VotesMinOrderByAggregateInput
  }

  export type VotesScalarWhereWithAggregatesInput = {
    AND?: VotesScalarWhereWithAggregatesInput | VotesScalarWhereWithAggregatesInput[]
    OR?: VotesScalarWhereWithAggregatesInput[]
    NOT?: VotesScalarWhereWithAggregatesInput | VotesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Votes"> | string
    room_id?: StringWithAggregatesFilter<"Votes"> | string
    participant_id?: StringWithAggregatesFilter<"Votes"> | string
    participant_email?: StringWithAggregatesFilter<"Votes"> | string
    restaurant_id?: StringWithAggregatesFilter<"Votes"> | string
    voted_at?: DateTimeWithAggregatesFilter<"Votes"> | Date | string
  }

  export type RoomsCreateInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    created_at?: Date | string
    participants?: ParticipantsCreateNestedManyWithoutRoomInput
    invitations?: InvitationsCreateNestedManyWithoutRoomInput
    votes?: VotesCreateNestedManyWithoutRoomInput
    winner?: RestaurantsCreateNestedOneWithoutWinner_roomsInput
  }

  export type RoomsUncheckedCreateInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    winner_restaurant_id?: string | null
    created_at?: Date | string
    participants?: ParticipantsUncheckedCreateNestedManyWithoutRoomInput
    invitations?: InvitationsUncheckedCreateNestedManyWithoutRoomInput
    votes?: VotesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUpdateManyWithoutRoomNestedInput
    invitations?: InvitationsUpdateManyWithoutRoomNestedInput
    votes?: VotesUpdateManyWithoutRoomNestedInput
    winner?: RestaurantsUpdateOneWithoutWinner_roomsNestedInput
  }

  export type RoomsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    winner_restaurant_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUncheckedUpdateManyWithoutRoomNestedInput
    invitations?: InvitationsUncheckedUpdateManyWithoutRoomNestedInput
    votes?: VotesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomsCreateManyInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    winner_restaurant_id?: string | null
    created_at?: Date | string
  }

  export type RoomsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    winner_restaurant_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipantsCreateInput = {
    id?: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
    room: RoomsCreateNestedOneWithoutParticipantsInput
    votes?: VotesCreateNestedManyWithoutParticipantInput
  }

  export type ParticipantsUncheckedCreateInput = {
    id?: string
    room_id: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
    votes?: VotesUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ParticipantsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomsUpdateOneRequiredWithoutParticipantsNestedInput
    votes?: VotesUpdateManyWithoutParticipantNestedInput
  }

  export type ParticipantsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VotesUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type ParticipantsCreateManyInput = {
    id?: string
    room_id: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
  }

  export type ParticipantsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipantsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationsCreateInput = {
    id?: string
    email: string
    token: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
    room: RoomsCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationsUncheckedCreateInput = {
    id?: string
    room_id: string
    email: string
    token: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type InvitationsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomsUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationsCreateManyInput = {
    id?: string
    room_id: string
    email: string
    token: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type InvitationsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantsCreateInput = {
    id?: string
    name: string
    menu_image_url?: string | null
    created_at?: Date | string
    votes?: VotesCreateNestedManyWithoutRestaurantInput
    winner_rooms?: RoomsCreateNestedManyWithoutWinnerInput
  }

  export type RestaurantsUncheckedCreateInput = {
    id?: string
    name: string
    menu_image_url?: string | null
    created_at?: Date | string
    votes?: VotesUncheckedCreateNestedManyWithoutRestaurantInput
    winner_rooms?: RoomsUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type RestaurantsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VotesUpdateManyWithoutRestaurantNestedInput
    winner_rooms?: RoomsUpdateManyWithoutWinnerNestedInput
  }

  export type RestaurantsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VotesUncheckedUpdateManyWithoutRestaurantNestedInput
    winner_rooms?: RoomsUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type RestaurantsCreateManyInput = {
    id?: string
    name: string
    menu_image_url?: string | null
    created_at?: Date | string
  }

  export type RestaurantsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesCreateInput = {
    id?: string
    participant_email: string
    voted_at?: Date | string
    room: RoomsCreateNestedOneWithoutVotesInput
    participant: ParticipantsCreateNestedOneWithoutVotesInput
    restaurant: RestaurantsCreateNestedOneWithoutVotesInput
  }

  export type VotesUncheckedCreateInput = {
    id?: string
    room_id: string
    participant_id: string
    participant_email: string
    restaurant_id: string
    voted_at?: Date | string
  }

  export type VotesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomsUpdateOneRequiredWithoutVotesNestedInput
    participant?: ParticipantsUpdateOneRequiredWithoutVotesNestedInput
    restaurant?: RestaurantsUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VotesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    participant_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    restaurant_id?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesCreateManyInput = {
    id?: string
    room_id: string
    participant_id: string
    participant_email: string
    restaurant_id: string
    voted_at?: Date | string
  }

  export type VotesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    participant_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    restaurant_id?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumROOM_STATUSFilter<$PrismaModel = never> = {
    equals?: $Enums.ROOM_STATUS | EnumROOM_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumROOM_STATUSFilter<$PrismaModel> | $Enums.ROOM_STATUS
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ParticipantsListRelationFilter = {
    every?: ParticipantsWhereInput
    some?: ParticipantsWhereInput
    none?: ParticipantsWhereInput
  }

  export type InvitationsListRelationFilter = {
    every?: InvitationsWhereInput
    some?: InvitationsWhereInput
    none?: InvitationsWhereInput
  }

  export type VotesListRelationFilter = {
    every?: VotesWhereInput
    some?: VotesWhereInput
    none?: VotesWhereInput
  }

  export type RestaurantsNullableScalarRelationFilter = {
    is?: RestaurantsWhereInput | null
    isNot?: RestaurantsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ParticipantsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VotesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomsCountOrderByAggregateInput = {
    id?: SortOrder
    room_name?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    owner_token?: SortOrder
    winner_restaurant_id?: SortOrder
    created_at?: SortOrder
  }

  export type RoomsMaxOrderByAggregateInput = {
    id?: SortOrder
    room_name?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    owner_token?: SortOrder
    winner_restaurant_id?: SortOrder
    created_at?: SortOrder
  }

  export type RoomsMinOrderByAggregateInput = {
    id?: SortOrder
    room_name?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    owner_token?: SortOrder
    winner_restaurant_id?: SortOrder
    created_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumROOM_STATUSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ROOM_STATUS | EnumROOM_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumROOM_STATUSWithAggregatesFilter<$PrismaModel> | $Enums.ROOM_STATUS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumROOM_STATUSFilter<$PrismaModel>
    _max?: NestedEnumROOM_STATUSFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPARTICIPANT_ROLEFilter<$PrismaModel = never> = {
    equals?: $Enums.PARTICIPANT_ROLE | EnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    in?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumPARTICIPANT_ROLEFilter<$PrismaModel> | $Enums.PARTICIPANT_ROLE
  }

  export type RoomsScalarRelationFilter = {
    is?: RoomsWhereInput
    isNot?: RoomsWhereInput
  }

  export type ParticipantsRoom_idEmailCompoundUniqueInput = {
    room_id: string
    email: string
  }

  export type ParticipantsCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    participant_name?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
  }

  export type ParticipantsMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    participant_name?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
  }

  export type ParticipantsMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    participant_name?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
  }

  export type EnumPARTICIPANT_ROLEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PARTICIPANT_ROLE | EnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    in?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumPARTICIPANT_ROLEWithAggregatesFilter<$PrismaModel> | $Enums.PARTICIPANT_ROLE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPARTICIPANT_ROLEFilter<$PrismaModel>
    _max?: NestedEnumPARTICIPANT_ROLEFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type InvitationsRoom_idEmailCompoundUniqueInput = {
    room_id: string
    email: string
  }

  export type InvitationsCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type InvitationsMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type InvitationsMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used_at?: SortOrder
    created_at?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RoomsListRelationFilter = {
    every?: RoomsWhereInput
    some?: RoomsWhereInput
    none?: RoomsWhereInput
  }

  export type RoomsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RestaurantsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    menu_image_url?: SortOrder
    created_at?: SortOrder
  }

  export type RestaurantsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    menu_image_url?: SortOrder
    created_at?: SortOrder
  }

  export type RestaurantsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    menu_image_url?: SortOrder
    created_at?: SortOrder
  }

  export type ParticipantsScalarRelationFilter = {
    is?: ParticipantsWhereInput
    isNot?: ParticipantsWhereInput
  }

  export type RestaurantsScalarRelationFilter = {
    is?: RestaurantsWhereInput
    isNot?: RestaurantsWhereInput
  }

  export type VotesRoom_idParticipant_idCompoundUniqueInput = {
    room_id: string
    participant_id: string
  }

  export type VotesCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_id?: SortOrder
    participant_email?: SortOrder
    restaurant_id?: SortOrder
    voted_at?: SortOrder
  }

  export type VotesMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_id?: SortOrder
    participant_email?: SortOrder
    restaurant_id?: SortOrder
    voted_at?: SortOrder
  }

  export type VotesMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    participant_id?: SortOrder
    participant_email?: SortOrder
    restaurant_id?: SortOrder
    voted_at?: SortOrder
  }

  export type ParticipantsCreateNestedManyWithoutRoomInput = {
    create?: XOR<ParticipantsCreateWithoutRoomInput, ParticipantsUncheckedCreateWithoutRoomInput> | ParticipantsCreateWithoutRoomInput[] | ParticipantsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantsCreateOrConnectWithoutRoomInput | ParticipantsCreateOrConnectWithoutRoomInput[]
    createMany?: ParticipantsCreateManyRoomInputEnvelope
    connect?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
  }

  export type InvitationsCreateNestedManyWithoutRoomInput = {
    create?: XOR<InvitationsCreateWithoutRoomInput, InvitationsUncheckedCreateWithoutRoomInput> | InvitationsCreateWithoutRoomInput[] | InvitationsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: InvitationsCreateOrConnectWithoutRoomInput | InvitationsCreateOrConnectWithoutRoomInput[]
    createMany?: InvitationsCreateManyRoomInputEnvelope
    connect?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
  }

  export type VotesCreateNestedManyWithoutRoomInput = {
    create?: XOR<VotesCreateWithoutRoomInput, VotesUncheckedCreateWithoutRoomInput> | VotesCreateWithoutRoomInput[] | VotesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRoomInput | VotesCreateOrConnectWithoutRoomInput[]
    createMany?: VotesCreateManyRoomInputEnvelope
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
  }

  export type RestaurantsCreateNestedOneWithoutWinner_roomsInput = {
    create?: XOR<RestaurantsCreateWithoutWinner_roomsInput, RestaurantsUncheckedCreateWithoutWinner_roomsInput>
    connectOrCreate?: RestaurantsCreateOrConnectWithoutWinner_roomsInput
    connect?: RestaurantsWhereUniqueInput
  }

  export type ParticipantsUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ParticipantsCreateWithoutRoomInput, ParticipantsUncheckedCreateWithoutRoomInput> | ParticipantsCreateWithoutRoomInput[] | ParticipantsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantsCreateOrConnectWithoutRoomInput | ParticipantsCreateOrConnectWithoutRoomInput[]
    createMany?: ParticipantsCreateManyRoomInputEnvelope
    connect?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
  }

  export type InvitationsUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<InvitationsCreateWithoutRoomInput, InvitationsUncheckedCreateWithoutRoomInput> | InvitationsCreateWithoutRoomInput[] | InvitationsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: InvitationsCreateOrConnectWithoutRoomInput | InvitationsCreateOrConnectWithoutRoomInput[]
    createMany?: InvitationsCreateManyRoomInputEnvelope
    connect?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
  }

  export type VotesUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<VotesCreateWithoutRoomInput, VotesUncheckedCreateWithoutRoomInput> | VotesCreateWithoutRoomInput[] | VotesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRoomInput | VotesCreateOrConnectWithoutRoomInput[]
    createMany?: VotesCreateManyRoomInputEnvelope
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumROOM_STATUSFieldUpdateOperationsInput = {
    set?: $Enums.ROOM_STATUS
  }

  export type ParticipantsUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ParticipantsCreateWithoutRoomInput, ParticipantsUncheckedCreateWithoutRoomInput> | ParticipantsCreateWithoutRoomInput[] | ParticipantsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantsCreateOrConnectWithoutRoomInput | ParticipantsCreateOrConnectWithoutRoomInput[]
    upsert?: ParticipantsUpsertWithWhereUniqueWithoutRoomInput | ParticipantsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ParticipantsCreateManyRoomInputEnvelope
    set?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    disconnect?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    delete?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    connect?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    update?: ParticipantsUpdateWithWhereUniqueWithoutRoomInput | ParticipantsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ParticipantsUpdateManyWithWhereWithoutRoomInput | ParticipantsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ParticipantsScalarWhereInput | ParticipantsScalarWhereInput[]
  }

  export type InvitationsUpdateManyWithoutRoomNestedInput = {
    create?: XOR<InvitationsCreateWithoutRoomInput, InvitationsUncheckedCreateWithoutRoomInput> | InvitationsCreateWithoutRoomInput[] | InvitationsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: InvitationsCreateOrConnectWithoutRoomInput | InvitationsCreateOrConnectWithoutRoomInput[]
    upsert?: InvitationsUpsertWithWhereUniqueWithoutRoomInput | InvitationsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: InvitationsCreateManyRoomInputEnvelope
    set?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    disconnect?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    delete?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    connect?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    update?: InvitationsUpdateWithWhereUniqueWithoutRoomInput | InvitationsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: InvitationsUpdateManyWithWhereWithoutRoomInput | InvitationsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: InvitationsScalarWhereInput | InvitationsScalarWhereInput[]
  }

  export type VotesUpdateManyWithoutRoomNestedInput = {
    create?: XOR<VotesCreateWithoutRoomInput, VotesUncheckedCreateWithoutRoomInput> | VotesCreateWithoutRoomInput[] | VotesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRoomInput | VotesCreateOrConnectWithoutRoomInput[]
    upsert?: VotesUpsertWithWhereUniqueWithoutRoomInput | VotesUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: VotesCreateManyRoomInputEnvelope
    set?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    disconnect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    delete?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    update?: VotesUpdateWithWhereUniqueWithoutRoomInput | VotesUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: VotesUpdateManyWithWhereWithoutRoomInput | VotesUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: VotesScalarWhereInput | VotesScalarWhereInput[]
  }

  export type RestaurantsUpdateOneWithoutWinner_roomsNestedInput = {
    create?: XOR<RestaurantsCreateWithoutWinner_roomsInput, RestaurantsUncheckedCreateWithoutWinner_roomsInput>
    connectOrCreate?: RestaurantsCreateOrConnectWithoutWinner_roomsInput
    upsert?: RestaurantsUpsertWithoutWinner_roomsInput
    disconnect?: RestaurantsWhereInput | boolean
    delete?: RestaurantsWhereInput | boolean
    connect?: RestaurantsWhereUniqueInput
    update?: XOR<XOR<RestaurantsUpdateToOneWithWhereWithoutWinner_roomsInput, RestaurantsUpdateWithoutWinner_roomsInput>, RestaurantsUncheckedUpdateWithoutWinner_roomsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ParticipantsUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ParticipantsCreateWithoutRoomInput, ParticipantsUncheckedCreateWithoutRoomInput> | ParticipantsCreateWithoutRoomInput[] | ParticipantsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantsCreateOrConnectWithoutRoomInput | ParticipantsCreateOrConnectWithoutRoomInput[]
    upsert?: ParticipantsUpsertWithWhereUniqueWithoutRoomInput | ParticipantsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ParticipantsCreateManyRoomInputEnvelope
    set?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    disconnect?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    delete?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    connect?: ParticipantsWhereUniqueInput | ParticipantsWhereUniqueInput[]
    update?: ParticipantsUpdateWithWhereUniqueWithoutRoomInput | ParticipantsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ParticipantsUpdateManyWithWhereWithoutRoomInput | ParticipantsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ParticipantsScalarWhereInput | ParticipantsScalarWhereInput[]
  }

  export type InvitationsUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<InvitationsCreateWithoutRoomInput, InvitationsUncheckedCreateWithoutRoomInput> | InvitationsCreateWithoutRoomInput[] | InvitationsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: InvitationsCreateOrConnectWithoutRoomInput | InvitationsCreateOrConnectWithoutRoomInput[]
    upsert?: InvitationsUpsertWithWhereUniqueWithoutRoomInput | InvitationsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: InvitationsCreateManyRoomInputEnvelope
    set?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    disconnect?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    delete?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    connect?: InvitationsWhereUniqueInput | InvitationsWhereUniqueInput[]
    update?: InvitationsUpdateWithWhereUniqueWithoutRoomInput | InvitationsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: InvitationsUpdateManyWithWhereWithoutRoomInput | InvitationsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: InvitationsScalarWhereInput | InvitationsScalarWhereInput[]
  }

  export type VotesUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<VotesCreateWithoutRoomInput, VotesUncheckedCreateWithoutRoomInput> | VotesCreateWithoutRoomInput[] | VotesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRoomInput | VotesCreateOrConnectWithoutRoomInput[]
    upsert?: VotesUpsertWithWhereUniqueWithoutRoomInput | VotesUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: VotesCreateManyRoomInputEnvelope
    set?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    disconnect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    delete?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    update?: VotesUpdateWithWhereUniqueWithoutRoomInput | VotesUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: VotesUpdateManyWithWhereWithoutRoomInput | VotesUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: VotesScalarWhereInput | VotesScalarWhereInput[]
  }

  export type RoomsCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<RoomsCreateWithoutParticipantsInput, RoomsUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: RoomsCreateOrConnectWithoutParticipantsInput
    connect?: RoomsWhereUniqueInput
  }

  export type VotesCreateNestedManyWithoutParticipantInput = {
    create?: XOR<VotesCreateWithoutParticipantInput, VotesUncheckedCreateWithoutParticipantInput> | VotesCreateWithoutParticipantInput[] | VotesUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutParticipantInput | VotesCreateOrConnectWithoutParticipantInput[]
    createMany?: VotesCreateManyParticipantInputEnvelope
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
  }

  export type VotesUncheckedCreateNestedManyWithoutParticipantInput = {
    create?: XOR<VotesCreateWithoutParticipantInput, VotesUncheckedCreateWithoutParticipantInput> | VotesCreateWithoutParticipantInput[] | VotesUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutParticipantInput | VotesCreateOrConnectWithoutParticipantInput[]
    createMany?: VotesCreateManyParticipantInputEnvelope
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
  }

  export type EnumPARTICIPANT_ROLEFieldUpdateOperationsInput = {
    set?: $Enums.PARTICIPANT_ROLE
  }

  export type RoomsUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<RoomsCreateWithoutParticipantsInput, RoomsUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: RoomsCreateOrConnectWithoutParticipantsInput
    upsert?: RoomsUpsertWithoutParticipantsInput
    connect?: RoomsWhereUniqueInput
    update?: XOR<XOR<RoomsUpdateToOneWithWhereWithoutParticipantsInput, RoomsUpdateWithoutParticipantsInput>, RoomsUncheckedUpdateWithoutParticipantsInput>
  }

  export type VotesUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<VotesCreateWithoutParticipantInput, VotesUncheckedCreateWithoutParticipantInput> | VotesCreateWithoutParticipantInput[] | VotesUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutParticipantInput | VotesCreateOrConnectWithoutParticipantInput[]
    upsert?: VotesUpsertWithWhereUniqueWithoutParticipantInput | VotesUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: VotesCreateManyParticipantInputEnvelope
    set?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    disconnect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    delete?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    update?: VotesUpdateWithWhereUniqueWithoutParticipantInput | VotesUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: VotesUpdateManyWithWhereWithoutParticipantInput | VotesUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: VotesScalarWhereInput | VotesScalarWhereInput[]
  }

  export type VotesUncheckedUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<VotesCreateWithoutParticipantInput, VotesUncheckedCreateWithoutParticipantInput> | VotesCreateWithoutParticipantInput[] | VotesUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutParticipantInput | VotesCreateOrConnectWithoutParticipantInput[]
    upsert?: VotesUpsertWithWhereUniqueWithoutParticipantInput | VotesUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: VotesCreateManyParticipantInputEnvelope
    set?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    disconnect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    delete?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    update?: VotesUpdateWithWhereUniqueWithoutParticipantInput | VotesUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: VotesUpdateManyWithWhereWithoutParticipantInput | VotesUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: VotesScalarWhereInput | VotesScalarWhereInput[]
  }

  export type RoomsCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<RoomsCreateWithoutInvitationsInput, RoomsUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: RoomsCreateOrConnectWithoutInvitationsInput
    connect?: RoomsWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RoomsUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<RoomsCreateWithoutInvitationsInput, RoomsUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: RoomsCreateOrConnectWithoutInvitationsInput
    upsert?: RoomsUpsertWithoutInvitationsInput
    connect?: RoomsWhereUniqueInput
    update?: XOR<XOR<RoomsUpdateToOneWithWhereWithoutInvitationsInput, RoomsUpdateWithoutInvitationsInput>, RoomsUncheckedUpdateWithoutInvitationsInput>
  }

  export type VotesCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<VotesCreateWithoutRestaurantInput, VotesUncheckedCreateWithoutRestaurantInput> | VotesCreateWithoutRestaurantInput[] | VotesUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRestaurantInput | VotesCreateOrConnectWithoutRestaurantInput[]
    createMany?: VotesCreateManyRestaurantInputEnvelope
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
  }

  export type RoomsCreateNestedManyWithoutWinnerInput = {
    create?: XOR<RoomsCreateWithoutWinnerInput, RoomsUncheckedCreateWithoutWinnerInput> | RoomsCreateWithoutWinnerInput[] | RoomsUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: RoomsCreateOrConnectWithoutWinnerInput | RoomsCreateOrConnectWithoutWinnerInput[]
    createMany?: RoomsCreateManyWinnerInputEnvelope
    connect?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
  }

  export type VotesUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<VotesCreateWithoutRestaurantInput, VotesUncheckedCreateWithoutRestaurantInput> | VotesCreateWithoutRestaurantInput[] | VotesUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRestaurantInput | VotesCreateOrConnectWithoutRestaurantInput[]
    createMany?: VotesCreateManyRestaurantInputEnvelope
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
  }

  export type RoomsUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<RoomsCreateWithoutWinnerInput, RoomsUncheckedCreateWithoutWinnerInput> | RoomsCreateWithoutWinnerInput[] | RoomsUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: RoomsCreateOrConnectWithoutWinnerInput | RoomsCreateOrConnectWithoutWinnerInput[]
    createMany?: RoomsCreateManyWinnerInputEnvelope
    connect?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
  }

  export type VotesUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<VotesCreateWithoutRestaurantInput, VotesUncheckedCreateWithoutRestaurantInput> | VotesCreateWithoutRestaurantInput[] | VotesUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRestaurantInput | VotesCreateOrConnectWithoutRestaurantInput[]
    upsert?: VotesUpsertWithWhereUniqueWithoutRestaurantInput | VotesUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: VotesCreateManyRestaurantInputEnvelope
    set?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    disconnect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    delete?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    update?: VotesUpdateWithWhereUniqueWithoutRestaurantInput | VotesUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: VotesUpdateManyWithWhereWithoutRestaurantInput | VotesUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: VotesScalarWhereInput | VotesScalarWhereInput[]
  }

  export type RoomsUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<RoomsCreateWithoutWinnerInput, RoomsUncheckedCreateWithoutWinnerInput> | RoomsCreateWithoutWinnerInput[] | RoomsUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: RoomsCreateOrConnectWithoutWinnerInput | RoomsCreateOrConnectWithoutWinnerInput[]
    upsert?: RoomsUpsertWithWhereUniqueWithoutWinnerInput | RoomsUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: RoomsCreateManyWinnerInputEnvelope
    set?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    disconnect?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    delete?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    connect?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    update?: RoomsUpdateWithWhereUniqueWithoutWinnerInput | RoomsUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: RoomsUpdateManyWithWhereWithoutWinnerInput | RoomsUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: RoomsScalarWhereInput | RoomsScalarWhereInput[]
  }

  export type VotesUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<VotesCreateWithoutRestaurantInput, VotesUncheckedCreateWithoutRestaurantInput> | VotesCreateWithoutRestaurantInput[] | VotesUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: VotesCreateOrConnectWithoutRestaurantInput | VotesCreateOrConnectWithoutRestaurantInput[]
    upsert?: VotesUpsertWithWhereUniqueWithoutRestaurantInput | VotesUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: VotesCreateManyRestaurantInputEnvelope
    set?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    disconnect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    delete?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    connect?: VotesWhereUniqueInput | VotesWhereUniqueInput[]
    update?: VotesUpdateWithWhereUniqueWithoutRestaurantInput | VotesUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: VotesUpdateManyWithWhereWithoutRestaurantInput | VotesUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: VotesScalarWhereInput | VotesScalarWhereInput[]
  }

  export type RoomsUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<RoomsCreateWithoutWinnerInput, RoomsUncheckedCreateWithoutWinnerInput> | RoomsCreateWithoutWinnerInput[] | RoomsUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: RoomsCreateOrConnectWithoutWinnerInput | RoomsCreateOrConnectWithoutWinnerInput[]
    upsert?: RoomsUpsertWithWhereUniqueWithoutWinnerInput | RoomsUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: RoomsCreateManyWinnerInputEnvelope
    set?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    disconnect?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    delete?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    connect?: RoomsWhereUniqueInput | RoomsWhereUniqueInput[]
    update?: RoomsUpdateWithWhereUniqueWithoutWinnerInput | RoomsUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: RoomsUpdateManyWithWhereWithoutWinnerInput | RoomsUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: RoomsScalarWhereInput | RoomsScalarWhereInput[]
  }

  export type RoomsCreateNestedOneWithoutVotesInput = {
    create?: XOR<RoomsCreateWithoutVotesInput, RoomsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: RoomsCreateOrConnectWithoutVotesInput
    connect?: RoomsWhereUniqueInput
  }

  export type ParticipantsCreateNestedOneWithoutVotesInput = {
    create?: XOR<ParticipantsCreateWithoutVotesInput, ParticipantsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: ParticipantsCreateOrConnectWithoutVotesInput
    connect?: ParticipantsWhereUniqueInput
  }

  export type RestaurantsCreateNestedOneWithoutVotesInput = {
    create?: XOR<RestaurantsCreateWithoutVotesInput, RestaurantsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: RestaurantsCreateOrConnectWithoutVotesInput
    connect?: RestaurantsWhereUniqueInput
  }

  export type RoomsUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<RoomsCreateWithoutVotesInput, RoomsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: RoomsCreateOrConnectWithoutVotesInput
    upsert?: RoomsUpsertWithoutVotesInput
    connect?: RoomsWhereUniqueInput
    update?: XOR<XOR<RoomsUpdateToOneWithWhereWithoutVotesInput, RoomsUpdateWithoutVotesInput>, RoomsUncheckedUpdateWithoutVotesInput>
  }

  export type ParticipantsUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<ParticipantsCreateWithoutVotesInput, ParticipantsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: ParticipantsCreateOrConnectWithoutVotesInput
    upsert?: ParticipantsUpsertWithoutVotesInput
    connect?: ParticipantsWhereUniqueInput
    update?: XOR<XOR<ParticipantsUpdateToOneWithWhereWithoutVotesInput, ParticipantsUpdateWithoutVotesInput>, ParticipantsUncheckedUpdateWithoutVotesInput>
  }

  export type RestaurantsUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<RestaurantsCreateWithoutVotesInput, RestaurantsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: RestaurantsCreateOrConnectWithoutVotesInput
    upsert?: RestaurantsUpsertWithoutVotesInput
    connect?: RestaurantsWhereUniqueInput
    update?: XOR<XOR<RestaurantsUpdateToOneWithWhereWithoutVotesInput, RestaurantsUpdateWithoutVotesInput>, RestaurantsUncheckedUpdateWithoutVotesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumROOM_STATUSFilter<$PrismaModel = never> = {
    equals?: $Enums.ROOM_STATUS | EnumROOM_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumROOM_STATUSFilter<$PrismaModel> | $Enums.ROOM_STATUS
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumROOM_STATUSWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ROOM_STATUS | EnumROOM_STATUSFieldRefInput<$PrismaModel>
    in?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROOM_STATUS[] | ListEnumROOM_STATUSFieldRefInput<$PrismaModel>
    not?: NestedEnumROOM_STATUSWithAggregatesFilter<$PrismaModel> | $Enums.ROOM_STATUS
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumROOM_STATUSFilter<$PrismaModel>
    _max?: NestedEnumROOM_STATUSFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPARTICIPANT_ROLEFilter<$PrismaModel = never> = {
    equals?: $Enums.PARTICIPANT_ROLE | EnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    in?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumPARTICIPANT_ROLEFilter<$PrismaModel> | $Enums.PARTICIPANT_ROLE
  }

  export type NestedEnumPARTICIPANT_ROLEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PARTICIPANT_ROLE | EnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    in?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.PARTICIPANT_ROLE[] | ListEnumPARTICIPANT_ROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumPARTICIPANT_ROLEWithAggregatesFilter<$PrismaModel> | $Enums.PARTICIPANT_ROLE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPARTICIPANT_ROLEFilter<$PrismaModel>
    _max?: NestedEnumPARTICIPANT_ROLEFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ParticipantsCreateWithoutRoomInput = {
    id?: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
    votes?: VotesCreateNestedManyWithoutParticipantInput
  }

  export type ParticipantsUncheckedCreateWithoutRoomInput = {
    id?: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
    votes?: VotesUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ParticipantsCreateOrConnectWithoutRoomInput = {
    where: ParticipantsWhereUniqueInput
    create: XOR<ParticipantsCreateWithoutRoomInput, ParticipantsUncheckedCreateWithoutRoomInput>
  }

  export type ParticipantsCreateManyRoomInputEnvelope = {
    data: ParticipantsCreateManyRoomInput | ParticipantsCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type InvitationsCreateWithoutRoomInput = {
    id?: string
    email: string
    token: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type InvitationsUncheckedCreateWithoutRoomInput = {
    id?: string
    email: string
    token: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type InvitationsCreateOrConnectWithoutRoomInput = {
    where: InvitationsWhereUniqueInput
    create: XOR<InvitationsCreateWithoutRoomInput, InvitationsUncheckedCreateWithoutRoomInput>
  }

  export type InvitationsCreateManyRoomInputEnvelope = {
    data: InvitationsCreateManyRoomInput | InvitationsCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type VotesCreateWithoutRoomInput = {
    id?: string
    participant_email: string
    voted_at?: Date | string
    participant: ParticipantsCreateNestedOneWithoutVotesInput
    restaurant: RestaurantsCreateNestedOneWithoutVotesInput
  }

  export type VotesUncheckedCreateWithoutRoomInput = {
    id?: string
    participant_id: string
    participant_email: string
    restaurant_id: string
    voted_at?: Date | string
  }

  export type VotesCreateOrConnectWithoutRoomInput = {
    where: VotesWhereUniqueInput
    create: XOR<VotesCreateWithoutRoomInput, VotesUncheckedCreateWithoutRoomInput>
  }

  export type VotesCreateManyRoomInputEnvelope = {
    data: VotesCreateManyRoomInput | VotesCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantsCreateWithoutWinner_roomsInput = {
    id?: string
    name: string
    menu_image_url?: string | null
    created_at?: Date | string
    votes?: VotesCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantsUncheckedCreateWithoutWinner_roomsInput = {
    id?: string
    name: string
    menu_image_url?: string | null
    created_at?: Date | string
    votes?: VotesUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantsCreateOrConnectWithoutWinner_roomsInput = {
    where: RestaurantsWhereUniqueInput
    create: XOR<RestaurantsCreateWithoutWinner_roomsInput, RestaurantsUncheckedCreateWithoutWinner_roomsInput>
  }

  export type ParticipantsUpsertWithWhereUniqueWithoutRoomInput = {
    where: ParticipantsWhereUniqueInput
    update: XOR<ParticipantsUpdateWithoutRoomInput, ParticipantsUncheckedUpdateWithoutRoomInput>
    create: XOR<ParticipantsCreateWithoutRoomInput, ParticipantsUncheckedCreateWithoutRoomInput>
  }

  export type ParticipantsUpdateWithWhereUniqueWithoutRoomInput = {
    where: ParticipantsWhereUniqueInput
    data: XOR<ParticipantsUpdateWithoutRoomInput, ParticipantsUncheckedUpdateWithoutRoomInput>
  }

  export type ParticipantsUpdateManyWithWhereWithoutRoomInput = {
    where: ParticipantsScalarWhereInput
    data: XOR<ParticipantsUpdateManyMutationInput, ParticipantsUncheckedUpdateManyWithoutRoomInput>
  }

  export type ParticipantsScalarWhereInput = {
    AND?: ParticipantsScalarWhereInput | ParticipantsScalarWhereInput[]
    OR?: ParticipantsScalarWhereInput[]
    NOT?: ParticipantsScalarWhereInput | ParticipantsScalarWhereInput[]
    id?: StringFilter<"Participants"> | string
    room_id?: StringFilter<"Participants"> | string
    email?: StringFilter<"Participants"> | string
    participant_name?: StringFilter<"Participants"> | string
    role?: EnumPARTICIPANT_ROLEFilter<"Participants"> | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFilter<"Participants"> | Date | string
  }

  export type InvitationsUpsertWithWhereUniqueWithoutRoomInput = {
    where: InvitationsWhereUniqueInput
    update: XOR<InvitationsUpdateWithoutRoomInput, InvitationsUncheckedUpdateWithoutRoomInput>
    create: XOR<InvitationsCreateWithoutRoomInput, InvitationsUncheckedCreateWithoutRoomInput>
  }

  export type InvitationsUpdateWithWhereUniqueWithoutRoomInput = {
    where: InvitationsWhereUniqueInput
    data: XOR<InvitationsUpdateWithoutRoomInput, InvitationsUncheckedUpdateWithoutRoomInput>
  }

  export type InvitationsUpdateManyWithWhereWithoutRoomInput = {
    where: InvitationsScalarWhereInput
    data: XOR<InvitationsUpdateManyMutationInput, InvitationsUncheckedUpdateManyWithoutRoomInput>
  }

  export type InvitationsScalarWhereInput = {
    AND?: InvitationsScalarWhereInput | InvitationsScalarWhereInput[]
    OR?: InvitationsScalarWhereInput[]
    NOT?: InvitationsScalarWhereInput | InvitationsScalarWhereInput[]
    id?: StringFilter<"Invitations"> | string
    room_id?: StringFilter<"Invitations"> | string
    email?: StringFilter<"Invitations"> | string
    token?: StringFilter<"Invitations"> | string
    expires_at?: DateTimeFilter<"Invitations"> | Date | string
    used_at?: DateTimeNullableFilter<"Invitations"> | Date | string | null
    created_at?: DateTimeFilter<"Invitations"> | Date | string
  }

  export type VotesUpsertWithWhereUniqueWithoutRoomInput = {
    where: VotesWhereUniqueInput
    update: XOR<VotesUpdateWithoutRoomInput, VotesUncheckedUpdateWithoutRoomInput>
    create: XOR<VotesCreateWithoutRoomInput, VotesUncheckedCreateWithoutRoomInput>
  }

  export type VotesUpdateWithWhereUniqueWithoutRoomInput = {
    where: VotesWhereUniqueInput
    data: XOR<VotesUpdateWithoutRoomInput, VotesUncheckedUpdateWithoutRoomInput>
  }

  export type VotesUpdateManyWithWhereWithoutRoomInput = {
    where: VotesScalarWhereInput
    data: XOR<VotesUpdateManyMutationInput, VotesUncheckedUpdateManyWithoutRoomInput>
  }

  export type VotesScalarWhereInput = {
    AND?: VotesScalarWhereInput | VotesScalarWhereInput[]
    OR?: VotesScalarWhereInput[]
    NOT?: VotesScalarWhereInput | VotesScalarWhereInput[]
    id?: StringFilter<"Votes"> | string
    room_id?: StringFilter<"Votes"> | string
    participant_id?: StringFilter<"Votes"> | string
    participant_email?: StringFilter<"Votes"> | string
    restaurant_id?: StringFilter<"Votes"> | string
    voted_at?: DateTimeFilter<"Votes"> | Date | string
  }

  export type RestaurantsUpsertWithoutWinner_roomsInput = {
    update: XOR<RestaurantsUpdateWithoutWinner_roomsInput, RestaurantsUncheckedUpdateWithoutWinner_roomsInput>
    create: XOR<RestaurantsCreateWithoutWinner_roomsInput, RestaurantsUncheckedCreateWithoutWinner_roomsInput>
    where?: RestaurantsWhereInput
  }

  export type RestaurantsUpdateToOneWithWhereWithoutWinner_roomsInput = {
    where?: RestaurantsWhereInput
    data: XOR<RestaurantsUpdateWithoutWinner_roomsInput, RestaurantsUncheckedUpdateWithoutWinner_roomsInput>
  }

  export type RestaurantsUpdateWithoutWinner_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VotesUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantsUncheckedUpdateWithoutWinner_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VotesUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type RoomsCreateWithoutParticipantsInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    created_at?: Date | string
    invitations?: InvitationsCreateNestedManyWithoutRoomInput
    votes?: VotesCreateNestedManyWithoutRoomInput
    winner?: RestaurantsCreateNestedOneWithoutWinner_roomsInput
  }

  export type RoomsUncheckedCreateWithoutParticipantsInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    winner_restaurant_id?: string | null
    created_at?: Date | string
    invitations?: InvitationsUncheckedCreateNestedManyWithoutRoomInput
    votes?: VotesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomsCreateOrConnectWithoutParticipantsInput = {
    where: RoomsWhereUniqueInput
    create: XOR<RoomsCreateWithoutParticipantsInput, RoomsUncheckedCreateWithoutParticipantsInput>
  }

  export type VotesCreateWithoutParticipantInput = {
    id?: string
    participant_email: string
    voted_at?: Date | string
    room: RoomsCreateNestedOneWithoutVotesInput
    restaurant: RestaurantsCreateNestedOneWithoutVotesInput
  }

  export type VotesUncheckedCreateWithoutParticipantInput = {
    id?: string
    room_id: string
    participant_email: string
    restaurant_id: string
    voted_at?: Date | string
  }

  export type VotesCreateOrConnectWithoutParticipantInput = {
    where: VotesWhereUniqueInput
    create: XOR<VotesCreateWithoutParticipantInput, VotesUncheckedCreateWithoutParticipantInput>
  }

  export type VotesCreateManyParticipantInputEnvelope = {
    data: VotesCreateManyParticipantInput | VotesCreateManyParticipantInput[]
    skipDuplicates?: boolean
  }

  export type RoomsUpsertWithoutParticipantsInput = {
    update: XOR<RoomsUpdateWithoutParticipantsInput, RoomsUncheckedUpdateWithoutParticipantsInput>
    create: XOR<RoomsCreateWithoutParticipantsInput, RoomsUncheckedCreateWithoutParticipantsInput>
    where?: RoomsWhereInput
  }

  export type RoomsUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: RoomsWhereInput
    data: XOR<RoomsUpdateWithoutParticipantsInput, RoomsUncheckedUpdateWithoutParticipantsInput>
  }

  export type RoomsUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationsUpdateManyWithoutRoomNestedInput
    votes?: VotesUpdateManyWithoutRoomNestedInput
    winner?: RestaurantsUpdateOneWithoutWinner_roomsNestedInput
  }

  export type RoomsUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    winner_restaurant_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationsUncheckedUpdateManyWithoutRoomNestedInput
    votes?: VotesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type VotesUpsertWithWhereUniqueWithoutParticipantInput = {
    where: VotesWhereUniqueInput
    update: XOR<VotesUpdateWithoutParticipantInput, VotesUncheckedUpdateWithoutParticipantInput>
    create: XOR<VotesCreateWithoutParticipantInput, VotesUncheckedCreateWithoutParticipantInput>
  }

  export type VotesUpdateWithWhereUniqueWithoutParticipantInput = {
    where: VotesWhereUniqueInput
    data: XOR<VotesUpdateWithoutParticipantInput, VotesUncheckedUpdateWithoutParticipantInput>
  }

  export type VotesUpdateManyWithWhereWithoutParticipantInput = {
    where: VotesScalarWhereInput
    data: XOR<VotesUpdateManyMutationInput, VotesUncheckedUpdateManyWithoutParticipantInput>
  }

  export type RoomsCreateWithoutInvitationsInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    created_at?: Date | string
    participants?: ParticipantsCreateNestedManyWithoutRoomInput
    votes?: VotesCreateNestedManyWithoutRoomInput
    winner?: RestaurantsCreateNestedOneWithoutWinner_roomsInput
  }

  export type RoomsUncheckedCreateWithoutInvitationsInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    winner_restaurant_id?: string | null
    created_at?: Date | string
    participants?: ParticipantsUncheckedCreateNestedManyWithoutRoomInput
    votes?: VotesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomsCreateOrConnectWithoutInvitationsInput = {
    where: RoomsWhereUniqueInput
    create: XOR<RoomsCreateWithoutInvitationsInput, RoomsUncheckedCreateWithoutInvitationsInput>
  }

  export type RoomsUpsertWithoutInvitationsInput = {
    update: XOR<RoomsUpdateWithoutInvitationsInput, RoomsUncheckedUpdateWithoutInvitationsInput>
    create: XOR<RoomsCreateWithoutInvitationsInput, RoomsUncheckedCreateWithoutInvitationsInput>
    where?: RoomsWhereInput
  }

  export type RoomsUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: RoomsWhereInput
    data: XOR<RoomsUpdateWithoutInvitationsInput, RoomsUncheckedUpdateWithoutInvitationsInput>
  }

  export type RoomsUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUpdateManyWithoutRoomNestedInput
    votes?: VotesUpdateManyWithoutRoomNestedInput
    winner?: RestaurantsUpdateOneWithoutWinner_roomsNestedInput
  }

  export type RoomsUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    winner_restaurant_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUncheckedUpdateManyWithoutRoomNestedInput
    votes?: VotesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type VotesCreateWithoutRestaurantInput = {
    id?: string
    participant_email: string
    voted_at?: Date | string
    room: RoomsCreateNestedOneWithoutVotesInput
    participant: ParticipantsCreateNestedOneWithoutVotesInput
  }

  export type VotesUncheckedCreateWithoutRestaurantInput = {
    id?: string
    room_id: string
    participant_id: string
    participant_email: string
    voted_at?: Date | string
  }

  export type VotesCreateOrConnectWithoutRestaurantInput = {
    where: VotesWhereUniqueInput
    create: XOR<VotesCreateWithoutRestaurantInput, VotesUncheckedCreateWithoutRestaurantInput>
  }

  export type VotesCreateManyRestaurantInputEnvelope = {
    data: VotesCreateManyRestaurantInput | VotesCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type RoomsCreateWithoutWinnerInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    created_at?: Date | string
    participants?: ParticipantsCreateNestedManyWithoutRoomInput
    invitations?: InvitationsCreateNestedManyWithoutRoomInput
    votes?: VotesCreateNestedManyWithoutRoomInput
  }

  export type RoomsUncheckedCreateWithoutWinnerInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    created_at?: Date | string
    participants?: ParticipantsUncheckedCreateNestedManyWithoutRoomInput
    invitations?: InvitationsUncheckedCreateNestedManyWithoutRoomInput
    votes?: VotesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomsCreateOrConnectWithoutWinnerInput = {
    where: RoomsWhereUniqueInput
    create: XOR<RoomsCreateWithoutWinnerInput, RoomsUncheckedCreateWithoutWinnerInput>
  }

  export type RoomsCreateManyWinnerInputEnvelope = {
    data: RoomsCreateManyWinnerInput | RoomsCreateManyWinnerInput[]
    skipDuplicates?: boolean
  }

  export type VotesUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: VotesWhereUniqueInput
    update: XOR<VotesUpdateWithoutRestaurantInput, VotesUncheckedUpdateWithoutRestaurantInput>
    create: XOR<VotesCreateWithoutRestaurantInput, VotesUncheckedCreateWithoutRestaurantInput>
  }

  export type VotesUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: VotesWhereUniqueInput
    data: XOR<VotesUpdateWithoutRestaurantInput, VotesUncheckedUpdateWithoutRestaurantInput>
  }

  export type VotesUpdateManyWithWhereWithoutRestaurantInput = {
    where: VotesScalarWhereInput
    data: XOR<VotesUpdateManyMutationInput, VotesUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type RoomsUpsertWithWhereUniqueWithoutWinnerInput = {
    where: RoomsWhereUniqueInput
    update: XOR<RoomsUpdateWithoutWinnerInput, RoomsUncheckedUpdateWithoutWinnerInput>
    create: XOR<RoomsCreateWithoutWinnerInput, RoomsUncheckedCreateWithoutWinnerInput>
  }

  export type RoomsUpdateWithWhereUniqueWithoutWinnerInput = {
    where: RoomsWhereUniqueInput
    data: XOR<RoomsUpdateWithoutWinnerInput, RoomsUncheckedUpdateWithoutWinnerInput>
  }

  export type RoomsUpdateManyWithWhereWithoutWinnerInput = {
    where: RoomsScalarWhereInput
    data: XOR<RoomsUpdateManyMutationInput, RoomsUncheckedUpdateManyWithoutWinnerInput>
  }

  export type RoomsScalarWhereInput = {
    AND?: RoomsScalarWhereInput | RoomsScalarWhereInput[]
    OR?: RoomsScalarWhereInput[]
    NOT?: RoomsScalarWhereInput | RoomsScalarWhereInput[]
    id?: StringFilter<"Rooms"> | string
    room_name?: StringFilter<"Rooms"> | string
    start_at?: DateTimeFilter<"Rooms"> | Date | string
    end_at?: DateTimeFilter<"Rooms"> | Date | string
    status?: EnumROOM_STATUSFilter<"Rooms"> | $Enums.ROOM_STATUS
    owner_id?: StringFilter<"Rooms"> | string
    owner_token?: StringFilter<"Rooms"> | string
    winner_restaurant_id?: StringNullableFilter<"Rooms"> | string | null
    created_at?: DateTimeFilter<"Rooms"> | Date | string
  }

  export type RoomsCreateWithoutVotesInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    created_at?: Date | string
    participants?: ParticipantsCreateNestedManyWithoutRoomInput
    invitations?: InvitationsCreateNestedManyWithoutRoomInput
    winner?: RestaurantsCreateNestedOneWithoutWinner_roomsInput
  }

  export type RoomsUncheckedCreateWithoutVotesInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    winner_restaurant_id?: string | null
    created_at?: Date | string
    participants?: ParticipantsUncheckedCreateNestedManyWithoutRoomInput
    invitations?: InvitationsUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomsCreateOrConnectWithoutVotesInput = {
    where: RoomsWhereUniqueInput
    create: XOR<RoomsCreateWithoutVotesInput, RoomsUncheckedCreateWithoutVotesInput>
  }

  export type ParticipantsCreateWithoutVotesInput = {
    id?: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
    room: RoomsCreateNestedOneWithoutParticipantsInput
  }

  export type ParticipantsUncheckedCreateWithoutVotesInput = {
    id?: string
    room_id: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
  }

  export type ParticipantsCreateOrConnectWithoutVotesInput = {
    where: ParticipantsWhereUniqueInput
    create: XOR<ParticipantsCreateWithoutVotesInput, ParticipantsUncheckedCreateWithoutVotesInput>
  }

  export type RestaurantsCreateWithoutVotesInput = {
    id?: string
    name: string
    menu_image_url?: string | null
    created_at?: Date | string
    winner_rooms?: RoomsCreateNestedManyWithoutWinnerInput
  }

  export type RestaurantsUncheckedCreateWithoutVotesInput = {
    id?: string
    name: string
    menu_image_url?: string | null
    created_at?: Date | string
    winner_rooms?: RoomsUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type RestaurantsCreateOrConnectWithoutVotesInput = {
    where: RestaurantsWhereUniqueInput
    create: XOR<RestaurantsCreateWithoutVotesInput, RestaurantsUncheckedCreateWithoutVotesInput>
  }

  export type RoomsUpsertWithoutVotesInput = {
    update: XOR<RoomsUpdateWithoutVotesInput, RoomsUncheckedUpdateWithoutVotesInput>
    create: XOR<RoomsCreateWithoutVotesInput, RoomsUncheckedCreateWithoutVotesInput>
    where?: RoomsWhereInput
  }

  export type RoomsUpdateToOneWithWhereWithoutVotesInput = {
    where?: RoomsWhereInput
    data: XOR<RoomsUpdateWithoutVotesInput, RoomsUncheckedUpdateWithoutVotesInput>
  }

  export type RoomsUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUpdateManyWithoutRoomNestedInput
    invitations?: InvitationsUpdateManyWithoutRoomNestedInput
    winner?: RestaurantsUpdateOneWithoutWinner_roomsNestedInput
  }

  export type RoomsUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    winner_restaurant_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUncheckedUpdateManyWithoutRoomNestedInput
    invitations?: InvitationsUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type ParticipantsUpsertWithoutVotesInput = {
    update: XOR<ParticipantsUpdateWithoutVotesInput, ParticipantsUncheckedUpdateWithoutVotesInput>
    create: XOR<ParticipantsCreateWithoutVotesInput, ParticipantsUncheckedCreateWithoutVotesInput>
    where?: ParticipantsWhereInput
  }

  export type ParticipantsUpdateToOneWithWhereWithoutVotesInput = {
    where?: ParticipantsWhereInput
    data: XOR<ParticipantsUpdateWithoutVotesInput, ParticipantsUncheckedUpdateWithoutVotesInput>
  }

  export type ParticipantsUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomsUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ParticipantsUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantsUpsertWithoutVotesInput = {
    update: XOR<RestaurantsUpdateWithoutVotesInput, RestaurantsUncheckedUpdateWithoutVotesInput>
    create: XOR<RestaurantsCreateWithoutVotesInput, RestaurantsUncheckedCreateWithoutVotesInput>
    where?: RestaurantsWhereInput
  }

  export type RestaurantsUpdateToOneWithWhereWithoutVotesInput = {
    where?: RestaurantsWhereInput
    data: XOR<RestaurantsUpdateWithoutVotesInput, RestaurantsUncheckedUpdateWithoutVotesInput>
  }

  export type RestaurantsUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    winner_rooms?: RoomsUpdateManyWithoutWinnerNestedInput
  }

  export type RestaurantsUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menu_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    winner_rooms?: RoomsUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type ParticipantsCreateManyRoomInput = {
    id?: string
    email: string
    participant_name: string
    role?: $Enums.PARTICIPANT_ROLE
    joined_at?: Date | string
  }

  export type InvitationsCreateManyRoomInput = {
    id?: string
    email: string
    token: string
    expires_at: Date | string
    used_at?: Date | string | null
    created_at?: Date | string
  }

  export type VotesCreateManyRoomInput = {
    id?: string
    participant_id: string
    participant_email: string
    restaurant_id: string
    voted_at?: Date | string
  }

  export type ParticipantsUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VotesUpdateManyWithoutParticipantNestedInput
  }

  export type ParticipantsUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VotesUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type ParticipantsUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    participant_name?: StringFieldUpdateOperationsInput | string
    role?: EnumPARTICIPANT_ROLEFieldUpdateOperationsInput | $Enums.PARTICIPANT_ROLE
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationsUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationsUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationsUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ParticipantsUpdateOneRequiredWithoutVotesNestedInput
    restaurant?: RestaurantsUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VotesUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    participant_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    restaurant_id?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    participant_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    restaurant_id?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesCreateManyParticipantInput = {
    id?: string
    room_id: string
    participant_email: string
    restaurant_id: string
    voted_at?: Date | string
  }

  export type VotesUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomsUpdateOneRequiredWithoutVotesNestedInput
    restaurant?: RestaurantsUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VotesUncheckedUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    restaurant_id?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesUncheckedUpdateManyWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    restaurant_id?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesCreateManyRestaurantInput = {
    id?: string
    room_id: string
    participant_id: string
    participant_email: string
    voted_at?: Date | string
  }

  export type RoomsCreateManyWinnerInput = {
    id?: string
    room_name: string
    start_at: Date | string
    end_at: Date | string
    status?: $Enums.ROOM_STATUS
    owner_id: string
    owner_token: string
    created_at?: Date | string
  }

  export type VotesUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomsUpdateOneRequiredWithoutVotesNestedInput
    participant?: ParticipantsUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VotesUncheckedUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    participant_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VotesUncheckedUpdateManyWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    participant_id?: StringFieldUpdateOperationsInput | string
    participant_email?: StringFieldUpdateOperationsInput | string
    voted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomsUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUpdateManyWithoutRoomNestedInput
    invitations?: InvitationsUpdateManyWithoutRoomNestedInput
    votes?: VotesUpdateManyWithoutRoomNestedInput
  }

  export type RoomsUncheckedUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ParticipantsUncheckedUpdateManyWithoutRoomNestedInput
    invitations?: InvitationsUncheckedUpdateManyWithoutRoomNestedInput
    votes?: VotesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomsUncheckedUpdateManyWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_name?: StringFieldUpdateOperationsInput | string
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumROOM_STATUSFieldUpdateOperationsInput | $Enums.ROOM_STATUS
    owner_id?: StringFieldUpdateOperationsInput | string
    owner_token?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}