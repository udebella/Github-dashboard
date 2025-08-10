import type { Mock } from 'vitest'
import type { shallowMount } from '@vue/test-utils'

export type Mocks<Type> = {
	[key in keyof Type]: MockFunction<Type[key]>
}

type MockFunction<Type> = Type extends (...arg: infer Params) => infer ReturnType
	? Mock<(...args: Params) => ReturnType>
	: Type extends object
		? Mocks<Type>
		: Type

export type Wrapper<Component> = ReturnType<typeof shallowMount<Component>>
