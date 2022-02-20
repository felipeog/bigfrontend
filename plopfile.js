module.exports = function (plop) {
  plop.setGenerator('problem', {
    description: "Creates problem's template files",
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Problem name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/problem/index.ts',
      },
      {
        type: 'add',
        path: 'src/{{dashCase name}}/index.spec.ts',
        templateFile: 'plop-templates/problem/index.spec.ts',
      },
      {
        type: 'add',
        path: 'src/{{dashCase name}}/readme.md',
        templateFile: 'plop-templates/problem/readme.md',
      },
    ],
  })
}
