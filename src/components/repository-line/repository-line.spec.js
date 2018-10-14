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

		it(`should use the color on the line according to the branch status`, () => {
			expect(repositoryLine.classes()).to.contains(`SUCCESS`)
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

	describe(`Build statuses`, () => {
		let buildStatuses

		beforeEach(() => {
			buildStatuses = repositoryLine.find({name: `build-statuses`})
		})

		it(`should display build statuses`, () => {
			expect(buildStatuses.exists()).to.be.true
		})

		it(`should give the list of statuses to the component`, () => {
			expect(buildStatuses.props().statuses).to.deep.equal([{
				jobStatus: `SUCCESS`,
				description: `build description`,
				jobUrl: `http://build-target-url`,
			}])
		})
	})
})
