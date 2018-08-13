import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryLine from './repository-line.vue'

describe(`RepositoryLine component`, () => {
	let repositoryLine

	beforeEach(() => {
		repositoryLine = shallowMount(RepositoryLine, {
			propsData: {
				repository: {
					name: `repository name`,
					defaultBranch: `branch`,
					owner: `owner`,
					url: `http://repository`,
				},
			},
		})
	})

	describe(`Initialization`, () => {
		it(`should have repository-line name`, () => {
			expect(repositoryLine.name()).to.equals(`repository-line`)
		})

		it(`should initiate with a no_status`, () => {
			expect(repositoryLine.vm.$data.branchStatus).to.equal(`NO_STATUS`)
		})

		it(`should display with the default branch status`, () => {
			expect(repositoryLine.classes()).to.deep.equal([`line`, `NO_STATUS`])
		})
	})

	describe(`Repository link`, () => {
		let repositoryLink

		beforeEach(() => {
			repositoryLink = repositoryLine.find({name: `repository-link`})
		})

		it(`should display a repository link`, () => {
			expect(repositoryLink.exists()).to.be.true
		})

		it(`should give a repository name to the component`, () => {
			expect(repositoryLink.props().name).to.equal(`repository name`)
		})

		it(`should give a repository url to the component`, () => {
			expect(repositoryLink.props().url).to.equal(`http://repository`)
		})
	})

	describe(`Branch status`, () => {
		let branchStatus

		beforeEach(() => {
			branchStatus = repositoryLine.find({name: `branch-status`})
		})

		it(`should display a branch status`, () => {
			expect(branchStatus.exists()).to.be.true
		})

		it(`should give a repository name to the component`, () => {
			expect(branchStatus.props().name).to.equal(`repository name`)
		})

		it(`should give a repository owner to the component`, () => {
			expect(branchStatus.props().owner).to.equal(`owner`)
		})

		it(`should give a repository branch to the component`, () => {
			expect(branchStatus.props().branch).to.equal(`branch`)
		})
	})

	describe(`Method: updateBuildStatus`, () => {
		it(`should update build status`, () => {
			repositoryLine.vm.updateBuildStatus(`FAILURE`)

			expect(repositoryLine.vm.$data.branchStatus).to.equal(`FAILURE`)
		})

		it(`should reset build status when nothing is given`, () => {
			repositoryLine.vm.updateBuildStatus()

			expect(repositoryLine.vm.$data.branchStatus).to.equal(`NO_STATUS`)
		})
	})
})
