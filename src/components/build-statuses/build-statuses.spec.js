import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import BuildStatuses from './build-statuses.vue'

describe(`BuildStatuses component`, () => {
    let buildStatuses

    describe(`without status`, () => {
        beforeEach(() => {
            buildStatuses = shallowMount(BuildStatuses, {
                propsData: {
                    statuses: [],
                },
            })
        })

        describe(`Initialisation`, () => {
            it(`should not display when there is no status`, () => {
                expect(buildStatuses.contains(`div`)).to.be.false
            })
        })
    })

    describe(`with statuses`, () => {
        beforeEach(() => {
            buildStatuses = shallowMount(BuildStatuses, {
                propsData: {
                    statuses: [{
                        context: `description`,
                        targetUrl: `http://build-url`,
                        state: `SUCCESS`,
                    }],
                },
            })
        })

        describe(`Initialisation`, () => {
            it(`should display statuses`, () => {
                const buildStatus = buildStatuses.find({name: `build-status`})
                expect(buildStatus.exists()).to.be.true
                expect(buildStatus.props()).to.deep.equals({
                    description: `description`,
                    url: `http://build-url`,
                    state: `SUCCESS`,
                })
            })
        })
    })
})