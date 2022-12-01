export default [
  `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,

  `
{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  - trulala: NONE
  + verbose: true
}`,

  `
{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`,

  `
{
    one: 1
    three: 3
    two: 2
}`,

  `
{
}`,
];
