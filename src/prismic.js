import * as prismic from '@prismicio/client'

// Fill in your repository name
export const repositoryName = 'game2guess'

export const client = prismic.createClient(repositoryName, {
  // If your repo is private, add an access token
  accessToken: 'MC5ZazNvcHhNQUFDTUEtbnB1.ShRIO1s-77-9NE8B77-977-9ASnvv71l77-9Rjvvv73vv70_77-977-977-977-9Tu-_ve-_ve-_vT7vv70',
})