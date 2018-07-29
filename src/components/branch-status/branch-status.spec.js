import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import BranchStatus from './branch-status.vue'
import {stub} from 'sinon'

describe(`BranchStatus component`, () => {
    let branchStatus, stubRequest

    beforeEach(() => {
        stubRequest = stub().returns({
            repository: {
                ref: {
                    target: {
                        status: {
                            state: `SUCCESS`, contexts: [{}],
                        },
                    },
                },
            },
        })

        branchStatus = shallowMount(BranchStatus, {
            propsData: {
                name: `repository name`,
                branch: `branch`,
                owner: `owner`,
                request: stubRequest,
            },
        })
    })

    describe(`Initialisation`, () => {
        it(`should have an empty state by default`, () => {
            expect(branchStatus.vm.$data.state).to.equal(``)
        })

        it(`should have an empty statuses list by default`, () => {
            expect(branchStatus.vm.$data.statusesList).to.deep.equal([])
        })
    })

    describe(`On creation`, () => {
        it(`should make a request to the github api to retrieve data`, (done) => {
            branchStatus.vm.$nextTick(() => {
                expect(stubRequest).to.have.been.called
                expect(branchStatus.vm.$data.state).to.equals(`SUCCESS`)
                expect(branchStatus.vm.$data.statusesList).to.deep.equals([{}])
                done()
            })
        })

        it(`should notify parent component of the build status`, (done) => {
            branchStatus.vm.$nextTick(() => {
                expect(branchStatus.emitted()[`build-status`]).to.deep.equals([[`SUCCESS`]])
                done()
            })
        })

        it(`should reset default value when github api don't returns values`, (done) => {
            stubRequest.returns({
                repository: {
                    ref: {
                        target: {},
                    },
                },
            })

            branchStatus = shallowMount(BranchStatus, {
                propsData: {
                    name: `repository name`,
                    branch: `branch`,
                    owner: `owner`,
                    request: stubRequest,
                },
            })

            branchStatus.vm.$nextTick(() => {
                expect(branchStatus.vm.$data.state).to.equals(``)
                expect(branchStatus.vm.$data.statusesList).to.deep.equals([])
                done()
            })
        })
    })

    describe(`Branch statuses`, () => {
        let buildStatuses

        beforeEach(() => {
            buildStatuses = branchStatus.find({name: `build-statuses`})
        })

        it(`should display a list of build statuses`, () => {
            expect(buildStatuses.exists()).to.be.true
        })

        it(`should have an empty list of statuses to display by default`, () => {
            expect(buildStatuses.props().statuses).to.deep.equals([])
        })
    })
})
