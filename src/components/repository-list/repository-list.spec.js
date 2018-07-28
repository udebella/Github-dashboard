import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryList from './repository-list.vue'

describe(`RepositoryList component`, () => {
    let repositoryList

    beforeEach(() => {
        repositoryList = shallowMount(RepositoryList, {
            propsData: {
                repositories: [{}],
            },
        })
    })

    describe(`Initialisation`, () => {
        it(`should display a list of repositories`, () => {
            expect(repositoryList.contains({name: `repository-line`})).to.be.true
        })

        it(`should not display anything if the list is empty`, () => {
            repositoryList.setProps({repositories: []})

            expect(repositoryList.contains(`ul`)).to.be.false
        })
    })
})