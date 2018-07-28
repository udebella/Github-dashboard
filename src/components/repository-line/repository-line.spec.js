import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryLine from './repository-line.vue'

describe(`RepositoryLine component`, () => {
    let repositoryLine

    beforeEach(() => {
        repositoryLine = shallowMount(RepositoryLine, {
            propsData: {
                repository: {
                    name: ``,
                    defaultBranch: ``,
                    owner: ``,
                    url: ``,
                },
            },
        })
    })

    describe(`Initialization`, () => {
        it(`should have a link to a repository with its branch status`, () => {
            expect(repositoryLine.find({name: `repository-link`}).exists()).to.be.true
            expect(repositoryLine.find({name: `branch-status`}).exists()).to.be.true
        })

        it(`should initiate with an empty branch status`, () => {
            expect(repositoryLine.vm.$data.branchStatus).to.equal(``)
        })
    })

    describe(`Method: branchStatusClass`, () => {
        it(`should have be NO_STATUS by default`, () => {
            expect(repositoryLine.vm.branchStatusClass()).to.equal(`NO_STATUS`)
        })

        it(`should use the status as class`, () => {
            repositoryLine.setData({
                branchStatus: `FAILURE`,
            })

            expect(repositoryLine.vm.branchStatusClass()).to.equal(`FAILURE`)
        })
    })

    describe(`Method: updateBuildStatus`, () => {
        it(`should update build status`, () => {
            repositoryLine.vm.updateBuildStatus(`FAILURE`)

            expect(repositoryLine.vm.$data.branchStatus).to.equal(`FAILURE`)
        })
    })
})
