Cypress.Commands.add('login', (credentials) => {
  const loginUser = () => {
    return cy.request('POST', `${Cypress.env('BACKEND')}/login`, credentials)
  }
  const storeUserData = (response) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
  }

  loginUser().then(storeUserData)
  cy.visit('/')
})

Cypress.Commands.add('addBlog', (blogData) => {
  const postBlog = () => {
    const token = JSON.parse(localStorage.getItem('loggedBlogUser')).token
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('BACKEND')}/blogs`,
      body: blogData,
      headers: { 'Authorization': `Bearer ${token}` }
    })
  }

  postBlog()
  cy.visit('http://localhost:5173')
})
