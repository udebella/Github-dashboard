export default (plop) => {
	plop.setGenerator('Component', {
		description: 'Component directory',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'What is the component name?'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{dashCase componentName}}/{{dashCase componentName}}.vue',
				templateFile: 'plop-templates/component/template.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{dashCase componentName}}/{{dashCase componentName}}.spec.ts',
				templateFile: 'plop-templates/component/test.hbs'
			}
		]
	})
}
