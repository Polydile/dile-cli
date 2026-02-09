export default function (plop) {
  plop.setGenerator('hi', {
    description: 'Hello world Plop',
    prompts: [],
    actions: [{
      type: 'add',
      path: 'hi.txt',
      template: 'Hi Plop!!'
    }]
  });
  plop.setGenerator('foo', {
    description: 'This is foo',
    prompts: [],
    actions: [{
      type: 'add',
      path: 'foo.txt',
      template: 'Foo rules!!'
    }]
  });
}
