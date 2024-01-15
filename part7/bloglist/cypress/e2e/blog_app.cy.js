describe("Blog Application Functional Tests", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
      username: "testUser",
      password: "testPassword",
      name: "Testing User",
    });
    cy.visit("");
  });

  describe("User Authentication", () => {
    it("Displays the login form", function () {
      cy.contains("login").click();
      cy.contains("username");
      cy.contains("password");
      cy.contains("login");
      cy.contains("cancel");
    });

    it("Allows a user to log in successfully", function () {
      cy.contains("login").click();
      cy.get("#username").type("testUser");
      cy.get("#password").type("testPassword");
      cy.get("#login").click();
      cy.contains("logged in");
    });

    it("Prevents login with incorrect credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("testUser");
      cy.get("#password").type("somethingwrong");
      cy.get("#login").click();
      cy.contains("Wrong credentials").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)",
      );
    });
  });

  describe("Blog Management", () => {
    beforeEach(function () {
      cy.login({
        username: "testUser",
        password: "testPassword",
      });
    });

    it("Enables a new blog creation", function () {
      cy.contains("New Note").click();
      cy.get("#title").type("New Title");
      cy.get("#author").type("New Author");
      cy.get("#url").type("http://testing-new.com");
      cy.get("#create").click();
      cy.contains("New Title by New Author added");
      cy.contains("New Title New Author");
      cy.contains("Show Details").click();
      cy.contains("http://testing-new.com");
    });

    describe("Interactions with a Created Blog", () => {
      beforeEach(function () {
        cy.addBlog({
          title: "Test Title",
          author: "Test Author",
          url: "http://testing.com",
        });
      });

      it("Allows liking a blog", function () {
        cy.contains("Show Details").click();
        cy.get("#likes").click();
        cy.contains("likes: 1");
        cy.get("#likes").click();
        cy.contains("likes: 2");
      });

      it("Supports blog removal by the creator", () => {
        cy.contains("Show Details").click();
        cy.get("#remove").click();
        cy.contains("Test Title Test Author").should("not.exist");
      });

      it("Restricts blog removal by a different user", () => {
        cy.contains("logout").click();
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
          username: "newUser",
          password: "newPassword",
          name: "New User",
        });
        cy.login({
          username: "newUser",
          password: "newPassword",
        });
        cy.contains("Show Details").click();
        cy.get("#remove").should("not.exist");
      });

      it("Sorts blogs based on the number of likes", function () {
        cy.get(".blog").eq(0).get("#showDetails").click();
        cy.get(".blog").eq(0).get("#likes").click();
        cy.get(".blog").eq(0).get("#likes").click();
        cy.addBlog({
          title: "Second Title",
          author: "Second Author",
          url: "http://second.com",
        });
        cy.get(".blog").eq(0).should("contain", "Test Title");
        cy.get(".blog").eq(1).should("contain", "Second Title");
        cy.contains("Second Title").parent().contains("Show Details").click();
        cy.contains("like").click();
        cy.contains("like").click();
        cy.contains("like").click();
        cy.get(".blog").eq(0).should("contain", "Second Title");
        cy.get(".blog").eq(1).should("contain", "Test Title");
      });
    });
  });
});
