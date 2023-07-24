import {expect} from "vitest";
import { describe, it, beforeEach } from "vitest";
import {useRepositoryStore} from "@/stores/repositories";
import {createPinia, setActivePinia} from "pinia";

describe('Repositories store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	});

	it('does not watch any repository by default', () => {
		const store = useRepositoryStore()

		expect(store.watched).toEqual([])
	});
});
