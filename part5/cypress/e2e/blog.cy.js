describe('Blog App Test', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'testUser',
      password: 'testPass',
      name: 'Test',
    })
    cy.visit('')
  })

  describe('Login and Authentication', () => {
    it('should display login form', () => {
      cy.contains('login').click()
      cy.contains('Username')
      cy.contains('Password')
      cy.contains('Login')
      cy.contains('cancel')
    })

    it('should successfully login', () => {
      cy.contains('login').click()
      cy.get('#username').type('testUser')
      cy.get('#password').type('testPass')
      cy.get('#login').click()
      cy.contains('logged in')
    })

    it('should fail to login with wrong credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('testUser')
      cy.get('#password').type('hahaha')
      cy.get('#login').click()
      cy.contains('Wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('After Successful Login', () => {
    beforeEach(() => {
      cy.login({
        username: 'testUser',
        password: 'testPass',
      })
    })

    it('should create a new blog and display it in the list', () => {
      cy.contains('New Note').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('http://url.com')
      cy.get('#create').click()
      cy.contains('Title by Author added')
      cy.contains('Title Author')
      cy.contains('Show Details').click()
      cy.contains('http://url.com')
    })

    describe('Operations on Listed Blog', () => {
      beforeEach(() => {
        cy.addBlog({
          title: 'Test',
          author: 'Test',
          url: 'http://test.com',
        })
      })

      it('should allow liking a blog', () => {
        cy.contains('Show Details').click()
        cy.get('#likes').click()
        cy.contains('likes: 1')
        cy.get('#likes').click()
        cy.contains('likes: 2')
      })

      it('should allow removing a blog', () => {
        cy.contains('Show Details').click()
        cy.get('#remove').click()

        cy.contains('Test Blog Test Author').should('not.exist')
      })

      it('should prevent a different user from removing another user blog', () => {
        cy.contains('logout').click()
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
          username: 'testUserX',
          password: 'testPassX',
          name: 'Test X',
        })
        cy.login({
          username: 'testUserX',
          password: 'testPassX',
        })
        cy.contains('Show Details').should('not.exist')
      })

      it('should order blogs by the number of likes', () => {
        cy.get('.blog').eq(0).get('#showDetails').click()
        cy.get('.blog').eq(0).get('#likes').click()
        cy.get('.blog').eq(0).get('#likes').click()
        cy.addBlog({
          title: 'Second',
          author: 'Second',
          url: 'http://second.com',
        })
        cy.get('.blog').eq(0).should('contain', 'Test')
        cy.get('.blog').eq(1).should('contain', 'Second')
        cy.contains('Second').parent().contains('Show Details').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.get('.blog').eq(0).should('contain', 'Second')
        cy.get('.blog').eq(1).should('contain', 'Test')
      })
    })
  })
})
