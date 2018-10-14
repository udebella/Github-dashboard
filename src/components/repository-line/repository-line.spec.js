import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryLine from './repository-line.vue'

describe(`RepositoryLine component`, () => {
	let repositoryLine

	beforeEach(() => {
		repositoryLine = shallowMount(RepositoryLine, {
			propsData: {
				repository: {
					name: `repository`,
					owner: `user`,
					repositoryUrl: `http://repository-url`,
					branchStatus: `SUCCESS`,
					defaultBranch: `master`,
					statusesList: [{
						jobStatus: `SUCCESS`,
						description: `build description`,
						jobUrl: `http://build-target-url`,
					}],
				},
			},
		})
	})

	describe(`Initialization`, () => {
		it(`should have repository-line name`, () => {
			expect(repositoryLine.name()).to.equals(`repository-line`)
		})

		it(`should display with the default branch status`, () => {
			expect(repositoryLine.classes()).to.deep.equal([`line`, `SUCCESS`])
		})

		it(`should display a way to remove the repository from watched repositories`, () => {
			expect(repositoryLine.find(`[data-test=trash]`).exists()).to.be.true
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
			expect(repositoryLink.props().name).to.equal(`repository`)
		})

		it(`should give a repository url to the component`, () => {
			expect(repositoryLink.props().url).to.equal(`http://repository-url`)
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
			expect(branchStatus.props().name).to.equal(`repository`)
		})

		it(`should give a repository owner to the component`, () => {
			expect(branchStatus.props().owner).to.equal(`user`)
		})

		it(`should give a repository branch to the component`, () => {
			expect(branchStatus.props().branch).to.equal(`master`)
		})
	})
})
