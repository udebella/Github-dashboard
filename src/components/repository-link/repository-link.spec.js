import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryLine from './repository-link.vue'


describe(`RepositoryLink component`, () => {
    let repositoryLink

    beforeEach(() => {
        repositoryLink = shallowMount(RepositoryLine, {
            propsData: {
                name: `repositoryName`,
                url: `http://repositoryLink`,
            },
        })
    })

    describe(`Initialization`, () => {
        it(`should display the repository name`, () => {
            expect(repositoryLink.text()).to.equal(`repositoryName`)
        })

        it(`should have a link to the repository`, () => {
            expect(repositoryLink.find(`a`).attributes().href).to.equal(`http://repositoryLink`)
        })
    })
})