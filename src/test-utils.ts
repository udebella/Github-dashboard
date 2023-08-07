import type { Mock } from 'vitest'

export type Mocks<Type> = {
	[key in keyof Type]: MockFunction<Type[key]>
}

type MockFunction<Type> = Type extends (...arg: infer Params) => infer ReturnType
	? Mock<Params, ReturnType>
	: Type extends object
	? Mocks<Type>
	: Type
